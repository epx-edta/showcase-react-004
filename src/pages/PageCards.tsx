import React, { useState, useRef, useEffect } from 'react';

interface Card {
  id: number;
  title: string;
  content: string;
  color: string;
}

export const PageCards = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: Card[] = [
    {
      id: 1,
      title: "Jane Doe",
      content: "Switching to modern software has transformed our workflow. Tasks that used to take hours are now completed in minutes, and our team collaborates more efficiently than ever.",
      color: "bg-orange-500"
    },
    {
      id: 2,
      title: "John Smith",
      content: "The new platform is intuitive and powerful. It has streamlined our project management and made communication seamless across departments.",
      color: "bg-teal-700"
    },
    {
      id: 3,
      title: "Emily Johnson",
      content: "Excellent support and regular updates keep our software running smoothly. We appreciate the dedication to user experience and reliability.",
      color: "bg-teal-900"
    },
    {
      id: 4,
      title: "Michael Lee",
      content: "Implementing this software was a game changer for our business. Automation features have saved us countless hours and reduced errors.",
      color: "bg-blue-600"
    },
    {
      id: 5,
      title: "Sophia Brown",
      content: "Highly recommended! The software is flexible, secure, and adapts perfectly to our growing needs. Our productivity has never been higher.",
      color: "bg-purple-600"
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = 0;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Customer Testimonials
        </h1>
        
        <div
          ref={containerRef}
          className={`overflow-x-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={`${card.color} text-white rounded-2xl p-6 shadow-lg flex-shrink-0 select-none`}
                style={{ 
                  width: '350px',
                  minHeight: '200px'
                }}
              >
                <p className="text-sm leading-relaxed mb-4">
                  {card.content}
                </p>
                <p className="text-xs font-semibold mt-4">
                  {card.title}
                </p>
                <p className="text-xs opacity-80">
                  2024
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center mt-6 text-gray-600 text-sm">
          ← Drag cards left and right with your mouse →
        </p>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
