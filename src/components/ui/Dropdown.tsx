"use client";

import { useEffect, useRef } from "react";

export default function Dropdown({
	Label,
	children,
}: {
	Label: React.ReactNode;
	children: React.ReactNode;
}) {
	const ref = useRef<HTMLDetailsElement | null>(null);

	useEffect(() => {
		const detailsElement = ref.current;

		function handleClickOutside(event: MouseEvent) {
			if (detailsElement && !detailsElement.contains(event.target as Node)) {
				detailsElement.open = false;
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<details ref={ref}>
			<summary>{Label}</summary>
			<ul className='bg-base-100 rounded-t-none p-2 z-40 relative mt-[0_!important]'>
				{children}
			</ul>
		</details>
	);
}
