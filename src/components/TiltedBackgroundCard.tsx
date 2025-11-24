import { ReactNode } from "react";

interface TiltedBackgroundCardProps {
	children: ReactNode;
}

export const TiltedBackgroundCard = ({
	children,
}: TiltedBackgroundCardProps) => {
	return (
		<div className="flex justify-center p-6">
			<div className="relative">
				{/* tilted background card */}
				<div className="max-w-[16rem] top-[.5rem] left-[.2rem] absolute inset-0 rounded-xl bg-yellow-600 -rotate-[4deg] scale-105 z-0"></div>

				{/* main card: blurs see-through opacity */}
				<div className="relative max-w-[16.5rem] rounded-xl border border-white backdrop-blur-sm p-6 z-10">
					{children}
				</div>
			</div>
		</div>
	);
};
