import React from "react";
import OptionText from "../components/OptionText";

const PageOptionText: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">PageOptionText</h1>
      <p className="mb-4">This page demonstrates the OptionText component:</p>
      <OptionText
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        limit={60}
      />
    </div>
  );
};

export default PageOptionText;
