import React from "react";
import { Button, Form } from "semantic-ui-react";
import api from "../api";
import FileAttachment from "../components/file-attachment";
import { axios } from "../config/axios-config";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";

const GooglePlayBooks = () => {
  const [file, setFile] = React.useState(null);

  const [result, setResult] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const copy = useCopyToClipboard();

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(api.coursera, formData)
      .then((response) => setResult(response.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <div class="mb-4">
        <h3>Guide</h3>
        <ul className="list-disc ml-8">
          <li>WIP</li>
        </ul>
      </div>

      <Form autocomplete="off" onSubmit={onSubmit} loading={isLoading}>
        <FileAttachment
          id="coursera-notes"
          setAttachmentData={setFile}
          label="Select the HTML file exported from google docs."
        />

        <Button type="submit" size="small" primary>
          Submit
        </Button>
      </Form>

      {result && (
        <div className="my-4">
          <div class="flex justify-end">
            <Button
              size="small"
              className="ml-auto mb-2"
              onClick={() => copy(document.getElementById("notes").innerHTML)}
            >
              Copy to clipboard
            </Button>
          </div>
          <div
            className="mt-2 py-4 px-2 border border-gray-200 rounded-md"
            id="notes"
          >
            <h1>{result.title}</h1>

            {result.highlights.map((h, i) => (
              <div key={h.note} className="my-4">
                <p>{h.note}</p>
                <a href={h.link}>Link</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GooglePlayBooks;
