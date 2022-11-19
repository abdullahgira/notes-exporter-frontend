import React from "react";
import { FiCopy } from "react-icons/fi";
import { Button, Form, Message } from "semantic-ui-react";

import api from "../api";
import { axios } from "../config/axios-config";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";

import FileAttachment from "../components/file-attachment";
import HighlightContainer from "../components/highligh-container";
import Highlight from "../components/highlight";
import Note from "../components/note";
import Reference from "../components/reference";

const PDF = () => {
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [title, setTitle] = React.useState("");

  const [result, setResult] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const copy = useCopyToClipboard();

  const onSubmit = () => {
    if (!file) setError("Please select a file first!");
    else if (file) setError(null);

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(api.pdf, formData)
      .then((response) => {
        setResult(response.data);
        setTitle(file.name.replace(/.pdf$/gi, ""));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <div class="mb-4">
        <h3>Guide</h3>
        <ul className="list-disc ml-8">
          <li>Attach the PDF to export the highlights from</li>
          <li>Submit!</li>
        </ul>
      </div>

      <div class="mb-4">
        <h3>Contributors</h3>
        <ul className="list-disc ml-8">
          <li>
            <a href="https://github.com/0xabu/pdfannots">pdfannots </a>
          </li>
        </ul>
      </div>

      <Form autocomplete="off" onSubmit={onSubmit} loading={isLoading}>
        <FileAttachment
          id="pdf-notes"
          setAttachmentData={setFile}
          label="Select the HTML file exported from google docs."
        />

        <Button type="submit" primary>
          Submit
        </Button>

        {error && <Message negative>{error}</Message>}
      </Form>

      {result && (
        <div className="my-4">
          <div class="flex justify-end">
            <Button
              className="ml-auto mb-2 flex items-center gap-2"
              onClick={() => copy(document.getElementById("notes").innerHTML)}
            >
              <FiCopy size="16" />
              Copy
            </Button>
          </div>
          <div
            className="mt-2 py-4 px-2 border border-gray-200 rounded-md"
            id="notes"
          >
            <h1>{title}</h1>

            {result.highlights.map((h, i) => (
              <HighlightContainer key={h.text}>
                <div className="my-4">
                  <Reference>PAGE: {h.page}</Reference>
                  <Highlight>{h.text}</Highlight>
                  {h.contents && <Note>{h.contents}</Note>}
                </div>
              </HighlightContainer>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDF;
