import React, { useState, useRef, useEffect } from 'react';

interface Card {
  id: number;
  title: string;
  content: string;
  color: string;
}

export const PageCards1 = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: Card[] = [
    {
      id: 1,
      title: "Jane Doe",
      content: "Switching to modern software has transformed our workflow. Tasks that used to take hours are now completed in minutes, and our team collaborates more efficiently than ever."
        + " The onboarding process was simple and the interface is very user-friendly.",
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
      content: "Excellent support and regular updates keep our software running smoothly.",
      color: "bg-teal-900"
    },
    {
      id: 4,
      title: "Michael Lee",
      content: "Implementing this software was a game changer for our business. Automation features have saved us countless hours and reduced errors. We now have more time to focus on our clients and innovation, rather than manual tasks.",
      color: "bg-blue-600"
    },
    {
      id: 5,
      title: "Sophia Brown",
      content: "Highly recommended! The software is flexible, secure, and adapts perfectly to our growing needs.",
      color: "bg-purple-600"
    },
    {
      id: 6,
      title: "Carlos Martinez",
      content: "Our team quickly adapted to the new software. The analytics dashboard provides valuable insights that help us make better decisions every day.",
      color: "bg-green-600"
    },
    {
      id: 7,
      title: "Linda Nguyen",
      content: "I love how customizable the software is. We were able to tailor it to fit our exact workflow, which has improved our efficiency tremendously.",
      color: "bg-pink-500"
    },
    {
      id: 8,
      title: "Robert King",
      content: "The integration with our existing tools was seamless. We experienced zero downtime during the transition, and the support team was always available. I can manage tasks and communicate with my team from anywhere, which has made remote work much easier.",
      color: "bg-yellow-600"
    },
    {
      id: 9,
      title: "Ava Patel",
      content: "Security is a top priority for us, and this software delivers. We feel confident knowing our data is protected and regularly backed up.",
      color: "bg-red-500"
    },
    {
      id: 10,
      title: "William Chen",
      content: "The mobile app is fantastic! I can manage tasks and communicate with my team from anywhere, which has made remote work much easier.",
      color: "bg-indigo-700"
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
    <div className="bg-gray-50 flex items-center justify-center p-4">
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
          <div className="flex items-start gap-6 pb-4" style={{ width: 'max-content' }}>
            {cards.map((card) => (
				<div
                key={card.id}
                className={`${card.color} text-white rounded-2xl p-6 shadow-lg flex-shrink-0 select-none`}
                style={{ 
                  width: '350px'
                }}
              >
                <p className="text-sm leading-relaxed mb-4">
                  {card.content}
                </p>
                <p className="text-xs font-semibold mt-4">
                  {card.title}
                </p>
                <p className="text-xs opacity-80">
                  2025
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
