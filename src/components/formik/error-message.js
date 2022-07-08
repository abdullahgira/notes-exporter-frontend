import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="flex items-center gap-3 text-red-700 font-medium -mt-3 mb-4 opacity-90">
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
