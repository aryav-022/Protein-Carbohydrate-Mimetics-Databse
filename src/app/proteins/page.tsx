import Regions from "@/components/Regions";
import ImagePreviewer from "@/components/ui/ImagePreviewer";
import Table, { type Header } from "@/components/ui/Table";
import { getProteinData, getProteinDataLength } from "@/lib/actions";
import type { FC } from "react";
import ProteinData from "@/data/protein.json";

interface pageProps {}

// Functions

const page: FC<pageProps> = ({}) => {
	const headerMap: Record<string, Header> = {
		"Paper publish year": { displayName: "Paper Publish Year", dataType: "number" },
		DOI: { displayName: "DOI", dataType: "string" },
		"Category (Protein Mimetic)": {
			displayName: "Category (Protein Mimetic)",
			dataType: "string",
		},
		"Mimic of which Protein": { displayName: "Mimic of which Protein", dataType: "string" },
		"Name of the Protein mimetic": {
			displayName: "Name of the Protein mimetic",
			dataType: "string",
		},
		Functions: { displayName: "Functions", dataType: "string" },
		Activity: { displayName: "Activity", dataType: "string" },
	};

	return (
		<main className='py-8 container'>
			<article className='space-y-6'>
				<h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
					Protein Data
				</h1>
			</article>

			<Table
				filePath='protein.csv'
				headerMap={headerMap}
				loadData={getProteinData}
				getLength={getProteinDataLength}
			/>
		</main>
	);
};

export default page;
