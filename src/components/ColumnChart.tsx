"use client";

import { type FC, useEffect } from "react";

interface ColumnChartProps {
	title: string;
	array: [string, string | number][];
}

const ColumnChart: FC<ColumnChartProps> = ({ title, array }) => {
	useEffect(() => {
		window.google.charts.load("current", { packages: ["bar"] });
		window.google.charts.setOnLoadCallback(drawStuff);

		function drawStuff() {
			const data = new window.google.visualization.arrayToDataTable(array);

			const options = {
				legend: { position: "none" },
				chart: {
					title,
				},
			};

			const chart = new window.google.charts.Bar(document.getElementById("coulmchart"));
			chart.draw(data, window.google.charts.Bar.convertOptions(options));
		}
	}, []);

	return <div className='h-full w-full bg-white overflow-clip' id='coulmchart' />;
};

export default ColumnChart;
