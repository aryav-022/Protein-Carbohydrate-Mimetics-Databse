import type { Condition } from "@/components/Filter";
import type { DocumentData } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function filterMatch(field: string, row: DocumentData, condition: Condition) {
	switch (condition.relation) {
		case "equals":
			return row[field] === condition.value;
		case "contains":
			return row[field].includes(condition.value);
		case "starts-with":
			return row[field].startsWith(condition.value);
		case "ends-with":
			return row[field].endsWith(condition.value);
		case "greater-than":
			return row[field] > condition.value;
		case "less-than":
			return row[field] < condition.value;
		default:
			return true;
	}
}
