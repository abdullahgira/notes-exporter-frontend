import React from "react";

const Note = ({ children }) => {
  return (
    <p>
      <i>Note: {children}</i>
    </p>
  );
};

export default Note;
