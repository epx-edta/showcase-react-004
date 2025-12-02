import React, { useState } from "react";

interface OptionTextProps {
  text: string;
  limit: number;
}

const OptionText: React.FC<OptionTextProps> = ({ text, limit }) => {
  const [showMore, setShowMore] = useState(false);
  const isTruncated = text.length > limit;
  const displayText = showMore || !isTruncated ? text : text.slice(0, limit) + "...";

  return (
    <div>
      <span>{displayText}</span>
      {isTruncated && (
        <button
          className="ml-2 text-blue-500 underline cursor-pointer text-sm"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default OptionText;
