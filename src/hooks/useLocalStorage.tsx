"use client";

import { PREFIX } from "@/config";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(id: string, initialValue: T) {
	const [value, setValue] = useState<T>(initialValue);

	const prefixedId = `${PREFIX}-${id}`;

	useEffect(() => {
		const storedValue = localStorage.getItem(prefixedId);
		if (storedValue) {
			setValue(JSON.parse(storedValue));
		}
	}, []);

	function setLocalStorage(value: T) {
		localStorage.setItem(prefixedId, JSON.stringify(value));
		setValue(value);
	}

	return [value, setLocalStorage] as const;
}
