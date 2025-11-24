import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as tools from "../tools";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState } from "react";

const menuItems = [
	{
		idCode: "welcome",
		title: "Welcome",
		description: "",
	},
	{
		idCode: "cards1",
		title: "Cards1",
		description: "Horizontal scrolling cards with finite scroll",
	},
	{
		idCode: "cards2",
		title: "Cards2",
		description: "Horizontal scrolling cards with infinite scroll",
	},
	{
		idCode: "grid",
		title: "Grid",
		description: "Responsive grid with three widths",
	},
	{
		idCode: "cards3",
		title: "Cards3",
		description: "Cards with tilted, fuzzy background effect",
	},
	{
		idCode: "scroller",
		title: "Scroller",
		description: "Thin, styled, horizontal page scroller",
	},
	{
		idCode: "image1",
		title: "Image1",
		description: "Image that remains in place regardless of length of text",
	},
];

export const Nav = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const location = useLocation();
	const pageIdCode = tools.chopLeft(location.pathname, "/");
	const currentMenuItem = menuItems.find((m) => m.idCode === pageIdCode);

	const handleMenuToggle = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	return (
		<>
			{currentMenuItem && (
				<nav>
					<div className="md:hidden bg-slate-500 text-[1.2rem] px-4 py-2 content">
						<div className="flex justify-between">
							<p>
								<NavLink to={currentMenuItem.idCode}>
									{currentMenuItem.title}
								</NavLink>
							</p>
							<p
								className="mt-1 cursor-pointer"
								onClick={handleMenuToggle}
							>
								<GiHamburgerMenu />
							</p>
						</div>
						{showMobileMenu && (
							<div>
								{menuItems.map((menuItem, index) => {
									return (
										<div key={index}>
											{menuItem.idCode !==
												currentMenuItem.idCode && (
												<div className="mt-[.2rem]">
													<NavLink
														to={menuItem.idCode}
														onClick={() =>
															setShowMobileMenu(
																false
															)
														}
													>
														{menuItem.title}
													</NavLink>
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className="hidden md:block bg-slate-500 px-4 py-2 content">
						<ul className="flex gap-4">
							{menuItems.map((menuItem, index) => {
								return (
									<React.Fragment key={index}>
										{
											<li>
												<NavLink to={menuItem.idCode}>
													{menuItem.title}
												</NavLink>
											</li>
										}
									</React.Fragment>
								);
							})}
						</ul>
					</div>
					{currentMenuItem.idCode !== "welcome" && (
						<div className="bg-yellow-100 px-4 py-2 content font-bold text-center">
							{currentMenuItem.description}
						</div>
					)}
				</nav>
			)}
		</>
	);
};
