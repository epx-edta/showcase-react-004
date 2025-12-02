import { useState } from "react";

type ExpandableTextProps = {
  text: string;
};

export const ExpandableText = ({ text }: ExpandableTextProps) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="border border-gray-300 rounded bg-white p-4 shadow-sm"
    >
      <span
        className={
          showMore
            ? ''
            : 'block overflow-hidden text-ellipsis' +
              ' line-clamp-3' +
              ' display-webkit-box'
        }
        style={
          showMore
            ? {}
            : {
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
        }
      >
        {text}
      </span>
      <button
        className="text-blue-800 cursor-pointer text-sm font-bold mt-4 flex items-center gap-1"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? (
          <>
            Show less <span aria-label="up caret">^</span>
          </>
        ) : (
          <>
            Show more <span aria-label="down caret" style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>^</span>
          </>
        )}
      </button>
    </div>
  );
};
