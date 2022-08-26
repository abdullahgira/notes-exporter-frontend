import { Formik } from "formik";
import React from "react";
import { FiCopy } from "react-icons/fi";
import { Button, Form } from "semantic-ui-react";

import FileAttachment from "../components/file-attachment";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";
import * as kindleUtils from "../utils/kindle-utils";

const Kindle = () => {
  const [json, setJson] = React.useState();
  const [result, setResult] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const copy = useCopyToClipboard();

  const onSubmit = () => {
    setIsLoading(true);

    kindleUtils.formatJSONFromFile(json, (parsedJson) => {
      setIsLoading(false);
      const result = {
        title: parsedJson.title + " - " + parsedJson.authors,
        highlights: [],
      };
      for (let h of parsedJson.highlights) {
        result.highlights.push({
          note: h.text,
          link: h.location.url,
          value: h.location.value,
        });
      }
      setResult(result);
    });
  };

  return (
    <div>
      <div class="mb-4">
        <h3>Guide</h3>
        <ul className="list-disc ml-8">
          <li>
            Export the highlights as JSON using{" "}
            <a href="https://readwise.io/bookcision">Bookcision</a>
          </li>
          <li>Uplaod the JSON file here</li>
        </ul>
      </div>

      <Formik initialValues={{}} onSubmit={onSubmit}>
        {(formik) => (
          <Form
            autocomplete="off"
            onSubmit={formik.handleSubmit}
            loading={isLoading}
          >
            <FileAttachment
              id="pdf-notes"
              setAttachmentData={setJson}
              label="Select the HTML file exported from google docs."
            />

            <Button type="submit" primary disabled={!json}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>

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
            className="mt-2 py-4 px-2 border border-gray-200 rounded-md h-96 overflow-y-scroll"
            id="notes"
          >
            <h1>{result.title}</h1>

            {result.highlights.map((h, i) => (
              <div key={h.note} className="my-4">
                <p>{h.note}</p>
                <a href={h.link}>Location: {h.value}</a>
                <p></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kindle;
