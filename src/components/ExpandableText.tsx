import { useState, useRef, useLayoutEffect } from "react";
import { twMerge } from "tailwind-merge";

type ExpandableTextProps = {
  text: string;
  numberOfLines?: number;
  expanderLabelMore?: string;
  expanderLabelLess?: string;
  expanderLabelClassName?: string;
};

export const ExpandableText = ({ text, numberOfLines = 3, expanderLabelMore = "Show More", expanderLabelLess = "Show Less", expanderLabelClassName = "" }: ExpandableTextProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [text]);

  return (
    <div
      className="border border-gray-300 rounded bg-white p-4 shadow-sm"
    >
      <span
        ref={textRef}
        className={
          showMore
            ? ''
            : 'block overflow-hidden text-ellipsis' + ' line-clamp-' + numberOfLines.toString() + ' display-webkit-box'
        }
        style={
          showMore
            ? {}
            : {
              display: '-webkit-box',
              WebkitLineClamp: numberOfLines,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }
        }
      >
        {text}
      </span>
      {(isTruncated || showMore) && (
        <button
          className={twMerge("cursor-pointer text-sm font-bold mt-4 flex items-center gap-1", expanderLabelClassName)}
          style={{ alignItems: 'center' }}
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? (
            <>
              <span>{expanderLabelLess}</span>
              <span aria-label="up caret" style={{ position: 'relative', top: '2px', display: 'inline-block' }}>
                ^
              </span>
            </>
          ) : (
            <>
              <span>{expanderLabelMore}</span>
              <span aria-label="down caret" style={{ position: 'relative', top: '-2px', display: 'inline-block', transform: 'rotate(180deg)' }}>
                ^
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
