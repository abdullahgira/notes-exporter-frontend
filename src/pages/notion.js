import { Formik } from "formik";
import React from "react";
import { FiCopy } from "react-icons/fi";
import { Button, Form } from "semantic-ui-react";
import api from "../api";
import FormikInput from "../components/formik/formik-input";
import { axios } from "../config/axios-config";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";
import useLocalStorage from "../lib/use-localstorage";

const Notion = () => {
  const [secret, setSecret] = useLocalStorage("notion-secret");
  const [url, setUrl] = React.useState("");

  const [result, setResult] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const copy = useCopyToClipboard();

  const onSubmit = (data) => {
    setSecret(data.secret);
    setUrl(data.url);

    setIsLoading(true);
    axios
      .post(api.notion, data)
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

      <Formik
        initialValues={{ secret: secret, url: "" }}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form
            autocomplete="off"
            onSubmit={formik.handleSubmit}
            loading={isLoading}
          >
            <FormikInput label="Secret" name="secret" />
            <FormikInput label="Page URL" name="url" className="pb-4" />

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
            className="mt-2 py-4 px-2 border border-gray-200 rounded-md"
            id="notes"
          >
            <h1>{result.title}</h1>
            <a href={url}>{url}</a>

            {result.highlights.map((h, i) => (
              <div key={h.blockId} className="my-4">
                <p>{h.text}</p>
                {!h.groupWithNextBlock && (
                  <a
                    href={`https://www.notion.so/${result.pageId}#${h.blockId
                      .split("-")
                      .join("")}`}
                  >
                    Link to block
                  </a>
                )}
                <p></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notion;
