import { useFormik } from "formik";
import React from "react";
import { FiCopy } from "react-icons/fi";
import YouTube from "react-youtube";
import { Button, Form, Icon } from "semantic-ui-react";
import api from "../api";
import FormikInput from "../components/formik/formik-input";
import FormikTextArea from "../components/formik/formik-textarea";
import { axios } from "../config/axios-config";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";
import { formatTime, getVideoId } from "../utils/youtube-utils";

/**
 * Creates a timer to track youtube API changes to the progress bar
 *
 */
const Youtube = () => {
  const formik = useFormik({
    initialValues: { url: "", timestamps: "" },
  });
  const [url, setUrl] = React.useState("");
  const [result, setResult] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const ytRef = React.useRef(null);

  const copy = useCopyToClipboard();

  const captureMoment = React.useCallback(() => {
    const currentTime = ytRef.current.getCurrentTime();

    let h = Math.floor(currentTime / 3600);
    let m = Math.floor((currentTime % 3600) / 60);
    let s = Math.floor((currentTime % 3600) % 60);

    formik.setFieldValue(
      "timestamps",
      `${formik.values.timestamps}${formatTime(h, m, s)},30\n\n`
    );

    const textarea = document.getElementById("timestamps");
    textarea.scrollTop = textarea.scrollHeight;
  }, [formik]);

  const seekTo = React.useCallback((val) => {
    const seekToTime = ytRef.current?.getCurrentTime() + val;
    ytRef.current?.seekTo(seekToTime);
  }, []);

  const togglePlay = React.useCallback(() => {
    if (isPlaying) ytRef.current?.pauseVideo();
    else ytRef.current?.playVideo();
  }, [isPlaying]);

  const onPlay = React.useCallback(() => {
    setIsPlaying(true);
  }, []);

  const onPause = React.useCallback(() => {
    setIsPlaying(false);
  }, []);

  const onReady = React.useCallback((e) => {
    ytRef.current = e.target;
  }, []);

  const onSubmit = React.useCallback(() => {
    const data = formik.values;

    setUrl(data.url);

    setIsLoading(true);
    axios
      .post(api.youtube, data)
      .then((response) => setResult(response.data))
      .finally(() => setIsLoading(false));
  }, [formik]);

  return (
    <div>
      <div class="mb-4">
        <h3>Guide</h3>
        <ul className="list-disc ml-8">
          <li>Each timestamp has to be in a new line</li>
          <li>
            Timestamp format is: hh:mm:ss[,duration in seconds (default 10
            seconds)]
          </li>
          <li>
            If the timestamp format is not followed, funny results may happen,
            enojy ;)
          </li>
        </ul>
      </div>

      <Form autocomplete="off" onSubmit={onSubmit} loading={isLoading}>
        <FormikInput
          label="URL"
          name="url"
          className="pb-4"
          onChange={formik.handleChange}
          value={formik.values.url}
        />

        {formik.values.url && getVideoId(formik.values.url) && (
          <YouTube
            videoId={getVideoId(formik.values.url)}
            onPlay={onPlay}
            onPause={onPause}
            onReady={onReady}
          />
        )}

        <p>Controls</p>
        <div className="flex items-center gap-4 mb-5">
          <Button type="button" icon onClick={() => seekTo(-10)}>
            <Icon name="angle double left"></Icon>
            -10s
          </Button>
          <Button type="button" icon onClick={() => seekTo(-5)}>
            <Icon name="angle left"></Icon>
            -5s
          </Button>

          <Button type="button" icon onClick={togglePlay}>
            {isPlaying ? <Icon name="pause"></Icon> : <Icon name="play"></Icon>}
          </Button>

          <Button type="button" icon onClick={() => seekTo(5)}>
            +5s
            <Icon name="angle right"></Icon>
          </Button>
          <Button type="button" icon onClick={() => seekTo(10)}>
            +10s
            <Icon name="angle double right"></Icon>
          </Button>
        </div>

        <Button
          type="button"
          className="mt-2"
          onClick={() => captureMoment(formik)}
        >
          <Icon name="pencil" />
          Capture moment
        </Button>

        <FormikTextArea
          label="Timestamps"
          name="timestamps"
          rows={10}
          onChange={formik.handleChange}
          value={formik.values.timestamps}
        />

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
            className="mt-2 py-4 px-2 border border-gray-200 rounded-md h-96 overflow-y-scroll"
            id="notes"
          >
            <h1>{result.title}</h1>
            <a href={url}>{url}</a>

            {result.notes?.map((h, i) => (
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
