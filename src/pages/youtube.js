import { Formik } from "formik";
import React from "react";
import { FiCopy } from "react-icons/fi";
import { Button, Form } from "semantic-ui-react";
import api from "../api";
import FormikInput from "../components/formik/formik-input";
import FormikTextArea from "../components/formik/formik-textarea";
import { axios } from "../config/axios-config";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";

const Youtube = () => {
  const [url, setUrl] = React.useState("");
  const [result, setResult] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const copy = useCopyToClipboard();

  const onSubmit = (data) => {
    setUrl(data.url);

    setIsLoading(true);
    axios
      .post(api.youtube, data)
      .then((response) => setResult(response.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <div class="mb-4">
        <h3>Guide</h3>
        <ul className="list-disc ml-8">
          <li>Each timestamp has to be in a new line</li>
          <li>Timestamp format is: hh:mm:ss</li>
          <li>
            If the timestamp format is not followed, funny results may happen,
            enojy ;)
          </li>
        </ul>
      </div>

      <Formik initialValues={{ timestamps: "", url: "" }} onSubmit={onSubmit}>
        {(formik) => (
          <Form
            autocomplete="off"
            onSubmit={formik.handleSubmit}
            loading={isLoading}
          >
            <FormikInput label="URL" name="url" className="pb-4" />
            <FormikTextArea label="Timestamps" name="timestamps" />

            <Button type="submit" primary>
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
            <a href={url}>{url}</a>

            {result.notes.map((h, i) => (
              <div key={h.link} className="my-4">
                <p>{h.note}</p>
                <a href={h.link}>
                  [{h.from} - {h.to}]
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Youtube;
