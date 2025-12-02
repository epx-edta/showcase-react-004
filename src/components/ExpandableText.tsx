import { useState } from "react";

type ExpandableTextProps = {
  text: string;
};

export const ExpandableText = ({ text }: ExpandableTextProps) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
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
      {/* Show toggle only if text is longer than 3 lines (always show for demo) */}
      <button
        className="text-blue-800 underline cursor-pointer text-sm"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? 'Show less' : 'Show more'}
      </button>
    </div>
  );
};
