import type { DocumentData } from "@/types";
import { readFileSync } from "fs";
import path from "path";
import type { FC } from "react";
import Table, { type Header } from "./Table";

interface CSVReaderProps {
	filePath: string;
	loadData: (page?: number) => Promise<DocumentData[]>;
	getLength: () => Promise<number>;
}

const CSVReader: FC<CSVReaderProps> = ({ filePath, loadData, getLength }) => {
	const absolutePath = path.join(process.cwd(), `src/data/${filePath}`);
	const rawData = readFileSync(absolutePath, "utf-8");
	const rows = rawData.split("\n");

	const headerMap: Record<string, Header> = {};

	rows.forEach((row, i) => {
		row.split(",").forEach((value, j) => {
			headerMap[`${j}`] = { displayName: `${j}`, dataType: "string" };
		});
	});

	return (
		<Table
			filePath={filePath}
			headerMap={headerMap}
			loadData={loadData}
			getLength={getLength}
			showHeaders={false}
			showFilters={false}
		/>
	);
};

export default CSVReader;
