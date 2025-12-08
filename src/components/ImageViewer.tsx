import { useState, useEffect, useRef } from 'react';

interface ImageViewerProps {
    pathAndFileNames: string[];
}

export const ImageViewer = ({ pathAndFileNames }: ImageViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoFlipIntervalRef = useRef<number | null>(null);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? pathAndFileNames.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === pathAndFileNames.length - 1 ? 0 : prev + 1));
    };

    // Auto-flip functionality
    useEffect(() => {
        if (!isHovered && pathAndFileNames.length > 1) {
            autoFlipIntervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev === pathAndFileNames.length - 1 ? 0 : prev + 1));
            }, 3000);
        }

        return () => {
            if (autoFlipIntervalRef.current) {
                clearInterval(autoFlipIntervalRef.current);
            }
        };
    }, [isHovered, pathAndFileNames.length]);

    if (!pathAndFileNames || pathAndFileNames.length === 0) {
        return <div className="text-gray-500">No images to display</div>;
    }

    return (
        <div className="space-y-4">
            <div
                className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Display */}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                    aria-label="Previous image"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                    aria-label="Next image"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Dot Indicators - Now outside the image container */}
            <div className="flex justify-center gap-2">
                {pathAndFileNames.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-orange-500 w-8'
                            : 'bg-gray-100 w-2 hover:bg-gray-200'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
