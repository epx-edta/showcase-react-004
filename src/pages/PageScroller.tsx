
import { useState } from 'react';

export const PageScroller = () => {
  const [, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const scrollPercentage = (element.scrollLeft / (element.scrollWidth - element.clientWidth)) * 100;
    setScrollProgress(scrollPercentage);
  };

  return (
    <div className="w-full h-[17rem] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, 
            rgb(74, 222, 128) 0%, 
            rgb(34, 197, 94) 50%, 
            rgb(16, 185, 129) 100%);
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(74, 222, 128, 0.8),
                      0 0 24px rgba(34, 197, 94, 0.6);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          box-shadow: 0 0 16px rgba(74, 222, 128, 1),
                      0 0 32px rgba(34, 197, 94, 0.8);
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(74, 222, 128, 0.8) rgba(30, 41, 59, 0.3);
        }
      `}</style>

      <div
        className="custom-scrollbar w-96 bg-slate-900 rounded-lg shadow-2xl overflow-x-auto overflow-y-hidden"
        onScroll={handleScroll}
      >
        <div className="flex w-max gap-4 p-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-shadow flex items-center justify-center text-white font-semibold"
            >
              Card {i + 1}
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}


