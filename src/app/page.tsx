import ImagePreviewer from "@/components/ui/ImagePreviewer";

export default function Home() {
	return (
		<main className='flex flex-col justify-center lg:flex-row gap-16 lg:justify-between container py-8'>
			<div className='lg:w-[40%] text-justify leading-7 tracking-wider text-secondary'>
				<p>
					Welcome to the Carbohydrate and Protein Mimetic Database, a comprehensive
					resource for researchers and scientists exploring the fascinating world of
					molecular mimicry. Carbohydrate-mimetic peptides (CMPs) and protein mimetics
					represent a cutting-edge approach in drug discovery and vaccine development,
					offering exciting new therapeutic opportunities.
				</p>

				<br />

				<p>
					These mimetics are designed to emulate the bioactive functions of carbohydrates
					and proteins while addressing the limitations of their natural counterparts,
					such as low activity and insufficient drug-like properties. By mimicking the
					three-dimensional interaction schemes of native carbohydrate and protein
					antigens, these compounds can interfere with sugar-protein and sugar-nucleic
					acid interactions, opening up new avenues for targeted therapies.
				</p>

				<br />

				<p>
					Our database serves as a vital tool for those involved in the rational design of
					glycomimetics and protein mimetics, providing detailed information on binding
					characteristics, and potential applications in fields ranging from cancer
					treatment to combating infectious diseases.
				</p>
			</div>

			<div className='lg:w-[60%]'>
				<ImagePreviewer
					src='/Flowchart.png'
					alt='Flowchart'
					width={1200}
					height={1200}
					className='w-full'
				/>
			</div>
		</main>
	);
}
