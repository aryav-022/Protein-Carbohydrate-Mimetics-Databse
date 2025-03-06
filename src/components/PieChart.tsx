"use client";

import { type FC, useEffect } from "react";

interface PieChartProps {
	title: string;
	array: [string, string | number][];
	is3D?: boolean;
}

const PieChart: FC<PieChartProps> = ({ title, array, is3D = false }) => {
	useEffect(() => {
		window.google.charts.load("current", { packages: ["corechart"] });
		window.google.charts.setOnLoadCallback(drawChart);

		function drawChart() {
			const data = window.google.visualization.arrayToDataTable(array);

			const options = {
				title,
				is3D,
			};

			const chart = new window.google.visualization.PieChart(
				document.getElementById("piechart")
			);

			chart.draw(data, options);
		}
	}, []);

	return <div id='piechart' className='h-full w-full bg-white overflow-clip' />;
};

export default PieChart;
