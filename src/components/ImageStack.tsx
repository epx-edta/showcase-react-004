import { useState } from 'react';

interface ImageStackProps {
    pathAndFileNames: string[];
}

export const ImageStack = ({ pathAndFileNames }: ImageStackProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? pathAndFileNames.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === pathAndFileNames.length - 1 ? 0 : prev + 1));
    };

    if (!pathAndFileNames || pathAndFileNames.length === 0) {
        return <div className="text-gray-500">No images to display</div>;
    }

    return (
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl">
            {/* Image Stack */}
            <div className="absolute inset-0">
                {pathAndFileNames.map((imagePath, index) => {
                    const offset = index - currentIndex;
                    const isVisible = Math.abs(offset) <= 2;

                    return (
                        <div
                            key={imagePath}
                            className="absolute inset-0 transition-all duration-500 ease-out"
                            style={{
                                transform: `translateX(${offset * 100}%) scale(${isVisible ? 1 : 0.8})`,
                                opacity: offset === 0 ? 1 : 0.3,
                                zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
                                pointerEvents: offset === 0 ? 'auto' : 'none',
                            }}
                        >
                            <img
                                src={imagePath}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Left Arrow */}
            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Previous image"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Next image"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {pathAndFileNames.length}
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {pathAndFileNames.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
