"use client";

import { cn } from "@/lib/utils";
import React, { FC, useEffect, useRef } from "react";

interface TabsProps {
	children: React.ReactNode;
}

const Tabs: FC<TabsProps> = ({ children }) => {
	const tabs = React.Children.map(children, (child) => {
		if (!React.isValidElement(child)) return;

		// get tab label and content
		// Label is in child of type of react component TabHeader
		// Content is in child of type of react component TabContent
		const TabChildren = child.props.children as React.ReactElement[];
		const Label = TabChildren[0];
		const Content = TabChildren[1];

		return { Label, Content };
	});

	const tabHeadersRef = useRef<HTMLDivElement>(null);
	const tabIndicatorRef = useRef<HTMLSpanElement | null>(null);
	const tabContentRef = useRef<HTMLDivElement>(null);
	const sliderRef = useRef<HTMLDivElement>(null);

	let activeIndex = 0;

	const setActiveIndex = (index: number) => {
		activeIndex = index;
		setActiveTabHeader(index);
		setActiveTabContent(index);
	};

	// sets active tab header
	const setActiveTabHeader = (index: number) => {
		// @ts-ignore
		const tabContainer = tabHeadersRef?.current as HTMLDivElement;
		const headers = tabContainer.children as HTMLCollectionOf<HTMLElement>;
		const tabIndicator = tabIndicatorRef.current as HTMLSpanElement;

		// set the width of the tab indicator
		const ActiveTabHeaderWidth = headers[activeIndex].offsetWidth;
		tabIndicator.style.width = `${ActiveTabHeaderWidth}px`;

		// set the new left position
		const left = headers[activeIndex].offsetLeft;
		tabIndicator.style.left = `${left}px`;

		// set position from top of indicator
		const top = headers[activeIndex].offsetTop + headers[activeIndex].offsetHeight - 2;
		tabIndicator.style.top = `${top}px`;
	};

	// sets active tab content
	const setActiveTabContent = (index: number) => {
		const tabContent = tabContentRef.current as HTMLDivElement;
		const slider = sliderRef.current as HTMLDivElement;

		// get the width of the tab
		const TabContentWidth = tabContent.offsetWidth;

		// calculate the new left position
		const left = activeIndex * TabContentWidth;

		// set the new left position
		slider.style.translate = `-${left}px`;
	};

	useEffect(() => {
		// @ts-ignore
		const headers = tabHeadersRef?.current.children as HTMLCollectionOf<HTMLElement>;
		const tabIndicator = tabIndicatorRef.current as HTMLSpanElement;

		const listeners: Array<() => void> = [];

		for (let i = 0; i < headers.length - 1; i++) {
			listeners.push(() => setActiveIndex(i));
			headers[i].addEventListener("click", listeners[i]);
		}

		// set width of the indicator
		const ActiveTabHeaderWidth = headers[activeIndex].offsetWidth;
		tabIndicator.style.width = `${ActiveTabHeaderWidth}px`;

		// set position from top of indicator
		const top = headers[activeIndex].offsetTop + headers[activeIndex].offsetHeight - 2;
		tabIndicator.style.top = `${top}px`;

		return () => {
			for (let i = 0; i < headers.length - 1; i++) {
				headers[i].removeEventListener("click", listeners[i]);
			}
		};
	}, []);

	return (
		<div className='space-y-6 my-6'>
			<div ref={tabHeadersRef} className='flex flex-wrap w-fit mx-auto relative'>
				{tabs?.map(({ Label }) => Label)}

				<span
					ref={tabIndicatorRef}
					role='tab'
					className='absolute left-0 inline-block h-0.5 bg-white transition-all duration-500'
				/>
			</div>

			<div ref={tabContentRef} className='slider-container'>
				<div ref={sliderRef} className='transition-all duration-500 slider'>
					{tabs?.map(({ Content }) => Content)}
				</div>
			</div>
		</div>
	);
};

const Tab: FC<TabsProps> = ({ children }) => {
	return children;
};

const TabHeader: FC<TabsProps> = ({ children }) => {
	return <div className='text-center text-nowrap py-2 px-4 cursor-pointer'>{children}</div>;
};

const TabContent: FC<TabsProps> = ({ children }) => {
	return <div className='slide'>{children}</div>;
};

export { Tabs, Tab, TabHeader, TabContent };
