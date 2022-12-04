import { Formik } from "formik";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { FiCopy } from "react-icons/fi";
import { Button, Form } from "semantic-ui-react";
import api from "../api";
import FileAttachment from "../components/file-attachment";
import FormikInput from "../components/formik/formik-input";
import HighlightContainer from "../components/highligh-container";
import Highlight from "../components/highlight";
import Note from "../components/note";
import Reference from "../components/reference";
import { axios } from "../config/axios-config";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";
import useLocalStorage from "../lib/use-localstorage";

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
      .post(api.googlePlayBooks, formData)
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
        <div className="my-5">
          <FileUploader
            handleChange={(file) => setFile(file)}
            name="file"
            types={["html"]}
          />
        </div>

        <Button type="submit" primary>
          Submit
        </Button>
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
            <h1>{result.title}</h1>

            {result.highlights.map((h, i) => (
              <HighlightContainer key={h.note}>
                <Reference>
                  {" "}
                  <a href={h.link}>Link</a>{" "}
                </Reference>
                <Highlight>{h.note}</Highlight>
                {h.yourNote && <Note>{h.yourNote}</Note>}
              </HighlightContainer>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GooglePlayBooks;
