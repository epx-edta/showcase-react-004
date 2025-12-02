import React from "react";

const PageFlex001: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">PageFlex001</h1>
      <p>mobile=column, tablet/desktop=row</p>
      <div className="flex gap-4 mt-6 flex-col md:flex-row">
        <div className="bg-blue-300 p-4 rounded flex-1 text-center">Flex Item 1</div>
        <div className="bg-green-300 p-4 rounded flex-1 text-center">Flex Item 2</div>
      </div>
    </div>
  );
};

export default PageFlex001;
