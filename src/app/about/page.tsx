import type { FC } from "react";

const teamMembers = [
	{
		name: "Akanksha Kulshreshtha",
		title: "Assistant Professor",
		department: "Department of Biological Sciences and Engineering",
		institution: "Netaji Subhas University of Technology (NSUT)",
		location: "New Delhi-110078, India",
		email: "akankshak@nsut.ac.in",
		phone: "+919818896326",
	},
	{
		name: "Avinash Pandey",
		title: "B.Tech (BIOTECHNOLOGY)",
		institution: "Netaji Subhas University of Technology (NSUT)",
		location: "New Delhi-110078, India",
		email: "avinash.pandey.ug21@nsut.ac.in",
	},
	{
		name: "Aditi Gupta",
		title: "B.Tech (BIOTECHNOLOGY)",
		institution: "Netaji Subhas University of Technology (NSUT)",
		location: "New Delhi-110078, India",
		email: "aditigupta.ug21@nsut.ac.in",
	},
	{
		name: "Harsh Mishra",
		title: "B.Tech (BIOTECHNOLOGY)",
		institution: "Netaji Subhas University of Technology (NSUT)",
		location: "New Delhi-110078, India",
		email: "harsh.mishra.ug21@nsut.ac.in",
	},
];

interface pageProps {}

const page: FC<pageProps> = () => {
	return (
		<main className='py-8 container'>
			<h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl mb-8'>
				About Us
			</h1>
			<div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
				{teamMembers.map((member, index) => (
					<div key={index} className='bg-white p-6 rounded-lg shadow-md'>
						<h2 className='text-xl font-semibold text-gray-800 mb-2'>{member.name}</h2>
						<p className='text-gray-700 mb-1'>
							<strong>{member.title}</strong>
						</p>
						{member.department && <p className='text-gray-600'>{member.department}</p>}
						<p className='text-gray-600'>{member.institution}</p>
						<p className='text-gray-600 mb-2'>{member.location}</p>
						<p className='text-blue-600'>
							<a href={`mailto:${member.email}`} className='hover:underline'>
								{member.email}
							</a>
						</p>
						{member.phone && (
							<p className='text-gray-600 mt-2'>Phone: {member.phone}</p>
						)}
					</div>
				))}
			</div>
		</main>
	);
};

export default page;
