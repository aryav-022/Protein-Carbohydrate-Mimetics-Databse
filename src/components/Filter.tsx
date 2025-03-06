"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, Plus, Trash2, X } from "lucide-react";
import { type FC, useRef, useState } from "react";

const DefaultCondition: Condition = { relation: "equals", value: "" };

interface FilterProps {
	field: string;
	dataType: "string" | "number";
	updateFilters: (conditions: Condition[]) => void;
}

const Filter: FC<FilterProps> = ({ field, dataType, updateFilters }) => {
	const [conditions, setConditions] = useState<Condition[]>([]);
	const [tempConditions, setTempConditions] = useState<Condition[]>([]);

	function addCondition() {
		setTempConditions((prev) => [...prev, DefaultCondition]);
	}

	function removeCondition(index: number) {
		setConditions((prev) => prev.filter((_, i) => i !== index));
	}

	function removeTempCondition(index: number) {
		setTempConditions((prev) => prev.filter((_, i) => i !== index));
	}

	function removeAllConditions() {
		setConditions([]);
		setTempConditions([]);
	}

	function saveConditions() {
		setConditions((prev) => {
			const newConditions = [...prev, ...tempConditions];
			updateFilters(newConditions);
			return newConditions;
		});
		setTempConditions([]);
	}

	function updateCondition(index: number, condition: Condition) {
		setConditions((prev) => {
			const newConditions = [...prev];
			newConditions[index] = condition;
			return newConditions;
		});
	}

	function updateTempCondition(index: number, condition: Condition) {
		setTempConditions((prev) => {
			const newConditions = [...prev];
			newConditions[index] = condition;
			return newConditions;
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='relative'>
				<ListFilter id='step5' size={15} />
				{conditions.length > 0 && (
					<span className='absolute bottom-0 right-0 w-1 h-1 rounded-full bg-blue-500' />
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent align='start' className='bg-card p-2' id='step6'>
				<DropdownMenuLabel>Conditions on &quot;{field}&quot;</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<ul className='flex flex-col'>
					{conditions.map((condition, index) => (
						<Condition
							key={index}
							dataType={dataType}
							condition={condition}
							updateCondition={(condition: Condition) =>
								updateCondition(index, condition)
							}
							deleteCondition={() => removeCondition(index)}
						/>
					))}

					{tempConditions.map((condition, index) => (
						<Condition
							key={index}
							dataType={dataType}
							condition={condition}
							updateCondition={(condition: Condition) =>
								updateTempCondition(index, condition)
							}
							deleteCondition={() => removeTempCondition(index)}
						/>
					))}
				</ul>

				<div className='flex gap-2'>
					<button
						className='inline-flex items-center gap-2 btn btn-sm'
						onClick={addCondition}>
						<span>Add Condition</span> <Plus size={16} />
					</button>

					<button
						className='inline-flex items-center gap-2 btn btn-sm'
						onClick={removeAllConditions}>
						<span>Clear All</span> <X size={16} />
					</button>

					<button
						className='inline-flex items-center gap-2 btn btn-sm'
						onClick={saveConditions}>
						<span>Apply</span>
					</button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

type StringRelation = "equals" | "contains" | "starts-with" | "ends-with";
type NumberRelation = "equals" | "less-than" | "greater-than";

export interface Condition {
	relation: StringRelation | NumberRelation;
	value: string;
}

interface ConditionProps {
	dataType: "string" | "number";
	condition: Condition;
	deleteCondition: () => void;
	updateCondition: (condition: Condition) => void;
}

const Condition: FC<ConditionProps> = ({
	dataType,
	condition,
	deleteCondition,
	updateCondition,
}) => {
	const relationRef = useRef<HTMLSelectElement>(null);
	const valueRef = useRef<HTMLInputElement>(null);

	function update() {
		const updatedCondition: Condition = {
			relation: relationRef.current!.value as Condition["relation"],
			value: valueRef.current!.value,
		};

		updateCondition(updatedCondition);
	}

	return (
		<li className='p-1 inline-flex gap-4 items-center text-sm my-2'>
			<select
				ref={relationRef}
				name='relation'
				id='relation'
				className='rounded bg-card ring-1 px-1 py-1 h-8 focus:outline-none focus:ring'
				onInput={update}>
				<option value='equals' selected={condition.relation === "equals"}>
					Equals
				</option>

				{dataType === "string" && (
					<>
						<option value='contains' selected={condition.relation === "contains"}>
							Contains
						</option>
						<option value='starts-with' selected={condition.relation === "starts-with"}>
							Starts with
						</option>
						<option value='ends-with' selected={condition.relation === "ends-with"}>
							Ends with
						</option>
					</>
				)}

				{dataType === "number" && (
					<>
						<option value='less-than' selected={condition.relation === "less-than"}>
							Less than
						</option>
						<option
							value='greater-than'
							selected={condition.relation === "greater-than"}>
							Greater than
						</option>
					</>
				)}
			</select>

			<input
				ref={valueRef}
				type='text'
				value={condition.value}
				className='ring-1 rounded px-2 py-1 h-8 bg-card focus:outline-none focus:ring'
				onInput={update}
			/>

			<button className='text-red-500' onClick={deleteCondition}>
				<Trash2 size={16} />
			</button>
		</li>
	);
};

export default Filter;
