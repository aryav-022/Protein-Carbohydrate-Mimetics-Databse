"use server";

import type { Condition } from "@/components/Filter";
import { ROW_PER_PAGE } from "@/config";
import type { DocumentData } from "@/types";
import { filterMatch } from "./utils";

async function applyFilters(data: Object[], filters: Record<string, Condition[]>) {
	for (const field in filters) {
		const conditions = filters[field];
		conditions.forEach((condition) => {
			data = data.filter((row) => {
				return filterMatch(field, row, condition);
			});
		});
	}

	return data;
}

async function paginateData(data: DocumentData[], page: number) {
	const start = (page - 1) * ROW_PER_PAGE;
	const end = start + ROW_PER_PAGE;
	data = data.slice(start, end);
	return data;
}

export async function getProteinData(page: number = 1, filters: Record<string, Condition[]> = {}) {
	const data = (await import("../data/protein.json")).default;
	const filteredData = await applyFilters(data, filters);
	const pageData = await paginateData(filteredData, page);
	return pageData;
}

export async function getProteinDataLength(filters: Record<string, Condition[]> = {}) {
	const data = (await import("../data/protein.json")).default;
	const filteredData = await applyFilters(data, filters);
	return filteredData.length;
}
