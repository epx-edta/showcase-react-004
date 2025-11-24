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
				<div className="w-[16rem] h-[22.5rem] top-[.5rem] left-[.2rem] absolute inset-0 rounded-3xl bg-emerald-900 opacity-50 -rotate-[5deg] scale-105"></div>

				{/* main card: blurs see-through opacity */}
				<div className="relative w-[16.5rem] h-[23.5rem] rounded-[1.5rem] border border-white backdrop-blur-sm">
					{children}
				</div>
			</div>
		</div>
	);
};
