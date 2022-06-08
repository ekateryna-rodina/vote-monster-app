import React from "react";

type SectionTitleProps = {
  children?: React.ReactNode;
};
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return <h3 className="text-gray-800 mb-4">{children}</h3>;
};

export default SectionTitle;
