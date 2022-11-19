import React from "react";

const HighlightContainer = ({ children }) => {
  return (
    <div className="my-5">
      {children}
      <p></p>
    </div>
  );
};

export default HighlightContainer;
