import React from "react";
import { FiUpload } from "react-icons/fi";

function FileAttachment({ id, label, setAttachmentData }) {
  const selectedContent = {};

  const [file, setFile] = React.useState(null);

  const handleOnSelectedFile = (e) => {
    setFile(e.target.files[0]);
    setAttachmentData(e.target.files[0]);
  };

  const clearAttachment = () => {
    setFile(null);
    setAttachmentData(null);
  };

  return (
    <>
      {file ? (
        <div className="flex justify-between my-4">
          <span className="break-all">
            <strong>{selectedContent.fileName || "File name"}</strong>:{" "}
            {file.name}
          </span>
          <div
            className="text-red-500 flex items-center justify-center cursor-pointer"
            onClick={clearAttachment}
          >
            {/* {selectedContent.clear} */}
            Clear
          </div>
        </div>
      ) : (
        <>
          <input
            type="file"
            id={id}
            accept="*/*"
            className="hidden"
            onChange={handleOnSelectedFile}
          />
          <label htmlFor={id} className="text-primary flex my-4">
            <div className="flex items-center justify-center cursor-pointer">
              <FiUpload size="16" className="mr-2" />
              <span>{label || "Select a file to attach"}</span>
            </div>
          </label>
        </>
      )}
    </>
  );
}

export default FileAttachment;
