import Link from "next/link";
import Dropdown from "./ui/Dropdown";

export default function Navbar() {
	return (
		<header className='navbar bg-base-100 border-b border-primary sticky top-0 p-0 z-30'>
			<nav className='flex-none container'>
				<div className='flex-1'>
					<Link href='/' className='text-xl font-semibold'>
						Database on Carbohydrate & Protein Mimetic
					</Link>
				</div>

				<div className='dropdown relative group' id='step3'>
					<div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h7'
							/>
						</svg>
					</div>

					<ul
						tabIndex={0}
						className='transition-all origin-top max-lg:scale-y-0 max-lg:group-focus-within:scale-y-100 max-lg:absolute max-lg:rounded-md max-lg:top-full max-lg:right-0 max-lg:bg-background max-lg:z-40 max-lg:menu-sm menu max-lg:shadow lg:menu-horizontal px-1'>
						<li>
							<Link href='/' className='text-nowrap'>
								Home
							</Link>
						</li>

						<li>
							<Dropdown Label='Mimetic'>
								<li>
									<Link href='/carbohydrate' className='text-nowrap'>
										Carbohydrate
									</Link>
								</li>
								<li>
									<Link href='/proteins' className='text-nowrap'>
										Protein / Peptide
									</Link>
								</li>
							</Dropdown>
						</li>

						<li>
							<Dropdown Label='Therapeutics Action'>
								<li>
									<Link href='/diabetes' className='text-nowrap'>
										Diabetes
									</Link>
								</li>
								<li>
									<Link href='/cancer' className='text-nowrap'>
										Cancer
									</Link>
								</li>
							</Dropdown>
						</li>

						<li>
							<Link href='/about' className='text-nowrap'>
								About
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
