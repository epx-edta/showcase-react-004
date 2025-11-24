import { ReactNode } from "react";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";

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
				<div className="max-w-[16rem] top-[.5rem] left-[.2rem] absolute inset-0 rounded-xl bg-green-900 -rotate-[5deg] scale-105 z-0"></div>

				{/* main card: blurs see-through opacity */}
				<div className="relative max-w-[16.5rem] rounded-xl border border-white backdrop-blur-sm text-gray-200 p-6 z-10">
					{children}

                    {/* info icon */}
					<div className="absolute top-[-18px] left-[40%] w-[20px] h-[20px] bg-green-900 rounded bottom-2 right-3 text-xs text-gray-300">
						<BsInfoSquareFill className="text-[2rem]" />
					</div>
				</div>
			</div>
		</div>
	);
};
