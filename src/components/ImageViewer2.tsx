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
                className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {visibleOffsets.map((offset) => {
                        const virtualIndex = currentIndex + offset;
                        const imageIndex = getModIndex(virtualIndex);
                        const imagePath = pathAndFileNames[imageIndex];

                        // We use the virtualIndex as key to preserve identity during scroll
                        // This allows the "slide" animation to work continuously

                        return (
                            <div
                                key={virtualIndex}
                                className="absolute transition-all duration-500 ease-out h-[90%]" // Adjusted height to be a bit contained
                                style={{
                                    // Width 80% leaves 10% on each side
                                    width: '80%',
                                    // Center is at 50% left. 
                                    // Offset 0: translateX(-50%) puts center of div at center of cont
                                    // Offset 1: translateX(50%) puts center of div at 100% of cont -> left edge at 60%
                                    // WE WANT:
                                    // Center (0): Center
                                    // Right (1): Showing 10% -> Left edge need to be at 90%
                                    // Wait, if width is 80%, center is 40% from left.
                                    // If we use left: 50%, we are positioning the anchor.
                                    // map offset to translateX percentage:
                                    // 0 -> -50%
                                    // 1 -> 50% (moves it entirely to the right of the center spot). 
                                    // If at 50% (center of screen), moving +100% puts it at 150% (off screen).
                                    // Let's refine the transform.

                                    // Standard slider logic:
                                    // left: 50%
                                    // transform: translateX(calc(-50% + 100% * offset))
                                    // 0: -50% -> Centered
                                    // 1: -50% + 100% = 50%. User sees left edge at 50% + (0% relative to element) = 50% screen.
                                    // If element is 80% wide, 50% screen starts it past center. 
                                    // Right edge is at 50% + 80% = 130%.
                                    // Left edge is at 50%.
                                    // Left neighbor (0) right edge is at 50% + 40% = 90%.
                                    // So neighbor is OVERLAPPING the side of the center one?
                                    // Wait, user wants "show on the right and left 10% of the previous and next image".

                                    // If Center takes 80%, there is 10% left on Left and 10% on Right.
                                    // Previous image should be mostly offscreen to the left, but 10% visible.
                                    // If Previous is 80% wide. To show right 10% (relative to container), 
                                    // its Right edge should be at 10%.
                                    // So its Left edge should be at 10% - 80% = -70%.

                                    // Current formula: translateX(calc(-50% + offset * 100%))
                                    // Offset -1: -150%. 
                                    // Anchor at 50% screen. Move -150% element width? Or container width? usually % in translate is element width.
                                    // -150% of 80% width = -120% container width.
                                    // Position: 50% (screen) - 1.2 * 80 (96%) = -46%.
                                    // That is too far left.

                                    // Let's just control 'left' with calc.
                                    left: '50%',
                                    transform: `translateX(calc(-50% + ${offset * 105}%))`, // 105% to add a small gap? Or just 100 to touch.
                                    // Let's stick closer to the request:
                                    // If I use standard carousel logic with gap:
                                    // offset * 100% moves it one full "slide width" over.
                                    // if slide width is 80%.
                                    // 0: centered. Left edge at 10% container. Right at 90%.
                                    // 1: moved 80% right. Left edge at 10+80 = 90%. 
                                    // This matches PERFECTLY. The next slide starts at 90%.
                                    // -1: moved 80% left. Right edge at 90-80 = 10%.
                                    // This also matches PERFECTLY.

                                    // So: width 80%, standard infinite slider logic works mathematically for the "peek".

                                    opacity: offset === 0 ? 1 : 0.5, // 50% opacity for peek
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500/80 hover:bg-orange-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-orange-500/80 hover:bg-orange-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm"
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
                            ? 'bg-orange-500 w-8'
                            : 'bg-gray-400 w-2 hover:bg-gray-300'
                            }`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
