import {ExpandableText} from "../components/ExpandableText";

export const PageExpandableText = () => {
  return (
    <div className="p-8">
      <ExpandableText
        text="This text is too short to truncate."
      />
      <ExpandableText
        text="This text is long enough to truncate and show more content when expanded. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </div>
  );
};