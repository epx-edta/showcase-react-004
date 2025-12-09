import { useState, useEffect, useRef } from 'react';

interface ImageViewer2Props {
    pathAndFileNames: string[];
}

export const ImageViewer2 = ({ pathAndFileNames }: ImageViewer2Props) => {
    // Start at a high number to allow swiping "left" effectively infinitely before hitting 0 issues,
    // though the modulo math handles negatives correctly anyway.
    // Starting at 0 is simpler if we trust the modulo helper.
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoFlipIntervalRef = useRef<number | null>(null);

    const length = pathAndFileNames.length;

    // Helper to get positive modulo
    const getModIndex = (index: number) => ((index % length) + length) % length;

    const handlePrevious = () => {
        setCurrentIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const handleDotClick = (targetIndex: number) => {
        // Find the closest virtual index that matches the targetIndex
        const currentMod = getModIndex(currentIndex);
        let diff = targetIndex - currentMod;

        // Optimize direction: if diff is > half length, go the other way
        if (diff > length / 2) diff -= length;
        else if (diff < -length / 2) diff += length;

        setCurrentIndex(currentIndex + diff);
    };

    // Auto-flip functionality
    useEffect(() => {
        if (!isHovered && length > 1) {
            autoFlipIntervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 3000);
        }

        return () => {
            if (autoFlipIntervalRef.current) {
                clearInterval(autoFlipIntervalRef.current);
            }
        };
    }, [isHovered, length]);

    if (!pathAndFileNames || length === 0) {
        return <div className="text-gray-500">No images to display</div>;
    }

    // We render a window of indices around the current one
    // -2 to +2 ensures we have enough buffer for animations
    const visibleOffsets = [-2, -1, 0, 1, 2];

    return (
        <div className="space-y-4">
            <div
                className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {visibleOffsets.map((offset) => {
                        const virtualIndex = currentIndex + offset;
                        const imageIndex = getModIndex(virtualIndex);
                        const imagePath = pathAndFileNames[imageIndex];

                        return (
                            <div
                                key={virtualIndex}
                                className="absolute transition-all duration-500 ease-out h-[90%]"
                                style={{
                                    width: '80%',
                                    left: '50%',
                                    transform: `translateX(calc(-50% + ${offset * 105}%))`,
                                    opacity: offset === 0 ? 1 : 0.5,
                                    zIndex: offset === 0 ? 10 : 5,
                                    scale: offset === 0 ? 1 : 0.85,
                                    pointerEvents: offset === 0 ? 'auto' : 'none',
                                }}
                            >
                                <img
                                    src={imagePath}
                                    alt={`Image ${imageIndex + 1}`}
                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Left Arrow */}
                <button
                    onClick={handlePrevious}
                    className={`absolute left-[17%] top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white/50 hover:text-white p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md border border-white/10 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
                    className={`absolute right-[17%] top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white/50 hover:text-white p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md border border-white/10 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2">
                {pathAndFileNames.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${getModIndex(currentIndex) === index
                            ? 'bg-gray-900 w-8'
                            : 'bg-gray-700 w-2 hover:bg-gray-300'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
