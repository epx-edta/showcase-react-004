import { useState } from 'react';

type TextLength = 'short' | 'medium' | 'long';

export const PageImage1 = () => {
  const [textLength, setTextLength] = useState<TextLength>('medium');

  const textContent: Record<TextLength, string> = {
    short: "The image stays at the top center regardless of content length of text.",
    medium: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  };

  return (
    <div className="w-full bg-gray-100 px-8 pt-8 pb-[12rem]">
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTextLength('short')}
          className={`px-4 py-2 rounded ${textLength === 'short' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
        >
          Short
        </button>
        <button
          onClick={() => setTextLength('medium')}
          className={`px-4 py-2 rounded ${textLength === 'medium' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
        >
          Medium
        </button>
        <button
          onClick={() => setTextLength('long')}
          className={`px-4 py-2 rounded ${textLength === 'long' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'}`}
        >
          Long
        </button>
      </div>

      <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto top-16">

        {/* image top center */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="images/pageImage1/icon-2.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* image top left */}
        <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="images/pageImage1/icon-3.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* image bottom left */}
        <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
          <img
            src="images/pageImage1/icon-9.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Content with top padding to accommodate the image */}
        <div className="py-24">
          <h1 className="text-3xl font-bold text-center mb-4">Sticky Image Header</h1>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {textContent[textLength]}
          </p>
        </div>
      </div>
    </div>
  );
}