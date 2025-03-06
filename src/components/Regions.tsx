"use client";

import { useEffect, type FC } from "react";

interface RegionsProps {
	array: [string, number][];
}

const Regions: FC<RegionsProps> = ({ array }) => {
	useEffect(() => {
		window.google.charts.load("current", {
			packages: ["geochart"],
		});
		window.google.charts.setOnLoadCallback(drawRegionsMap);

		function drawRegionsMap() {
			const data = window.google.visualization.arrayToDataTable([
				["Country", "Count"],
				...array,
			]);

			const options = {};

			const chart = new window.google.visualization.GeoChart(
				document.getElementById("regions")
			);

			chart.draw(data, options);
		}
	}, []);

	return <section id='regions' />;
};

export default Regions;
