import { ReactNode, useEffect, useState } from "react";
import { BsInfoSquareFill } from "react-icons/bs";

interface TiltedBackgroundCardProps {
	children: ReactNode;
}

export const TiltedBackgroundCard = ({ children }: TiltedBackgroundCardProps) => {
	const [numberOfWords, setNumberOfWords] = useState(0);

	useEffect(() => {
		// Helper to extract text from children recursively
		function extractText(node: unknown): string {
			if (typeof node === 'string' || typeof node === 'number') {
				return node.toString();
			} else if (Array.isArray(node)) {
				return node.map(extractText).join(' ');
			} else if (
				node &&
				typeof node === 'object' &&
				'props' in node &&
				(node as { props?: { children?: unknown } }).props?.children
			) {
				return extractText((node as { props: { children: unknown } }).props.children);
			}
			return '';
		}
		const text = extractText(children);
		const words = text.trim().split(/\s+/).filter(Boolean);
		setNumberOfWords(words.length);
	}, [children]);

	return (
		<div className="flex justify-center p-6">
			<div className="relative">
				{/* tilted background card */}
				<div className="max-w-[16rem] top-[.5rem] left-[.2rem] absolute inset-0 rounded-xl bg-green-900 -rotate-[5deg] scale-105 z-0"></div>

				{/* main card: blurs see-through opacity */}
				<div className="relative max-w-[16.5rem] rounded-xl border border-white backdrop-blur-sm text-gray-200 p-6 z-10">
					{children}

					{/* info icon */}
					<div className="absolute top-[-18px] left-[40%] w-[30px] h-[30px] bg-green-900 rounded text-xs text-gray-300">
						<BsInfoSquareFill className="text-[2rem]" />
					</div>

					{/* word count */}
					<p className="absolute bottom-[-14px] right-[-10px] w-fit h-fit p-1 border border-yellow-300 text-yellow-300 bg-green-900 rounded text-xs">
						{numberOfWords} word{numberOfWords === 1 ? '' : 's'}
					</p>
				</div>
			</div>
		</div>
	);
};
