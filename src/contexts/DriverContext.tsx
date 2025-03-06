"use client";

import { createContext, use, useEffect } from "react";
import { driver, type DriveStep } from "driver.js";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const DriverContext = createContext(null);

export function useDriver() {
	return use(DriverContext);
}

interface DriverProviderProps {
	children: React.ReactNode;
}

export const DriverProvider = ({ children }: DriverProviderProps) => {
	const [tourCompleted, setTourCompleted] = useLocalStorage<boolean>("tour-completed", false);
	const [currentStep, setCurrentStep] = useLocalStorage<number>("tour-current-step", 0);

	useEffect(() => {
		if (tourCompleted) return;

		const steps: DriveStep[] = [
			{
				popover: {
					title: "Welcome",
					description:
						"This is a quick tour to get you started. Click anywhere outside this box or on the cross icon on upper right corner to skip the tour. Click next to continue.",
					onPopoverRender: () => {
						setCurrentStep(0);
					},
				},
			},
			{
				element: "#step2",
				popover: {
					title: "Interactive Images",
					description:
						"Click on the image to see the full view and zoom in to see the details.",
					onPopoverRender: () => {
						setCurrentStep(1);
					},
				},
			},
			{
				element: "#step3",
				popover: {
					title: "Navigation Menu",
					description:
						"Click on the menu items to navigate to different pages of the application. Click next to go to proteins page.",
					onPopoverRender: () => {
						setCurrentStep(2);
					},
				},
			},
			{
				element: "#tableStart",
				popover: {
					title: "Data Table",
					description: "This is a data table.",
					onPopoverRender: () => {
						setCurrentStep(3);
						window.location.href = "/proteins#tableStart";
					},
				},
			},
			{
				element: "#step5",
				popover: {
					title: "Filter Data",
					description:
						"Use filters to filter the data based on the selected column. Click on the filter icon to open the filter menu.",
					onPopoverRender: () => {
						setCurrentStep(4);
					},
				},
			},
			{
				element: "#step6",
				popover: {
					title: "Download Data",
					description:
						"Click on the download button to download the data in Excel/CSV format.",
					onPopoverRender: () => {
						setCurrentStep(5);
					},
				},
			},
			{
				popover: {
					title: "Tour Completed",
					description:
						"You have completed the tour. Click on the cross icon to close the tour.",
					onPopoverRender: () => {
						setCurrentStep(6);
					},
				},
			},
		];

		const driverObj = driver({
			showProgress: true,
			steps,
			onDestroyed: () => {
				setTourCompleted(true);
			},
		});

		const timeout = setTimeout(() => driverObj.drive(currentStep), 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [currentStep, setCurrentStep]);

	return <DriverContext.Provider value={null}>{children}</DriverContext.Provider>;
};
