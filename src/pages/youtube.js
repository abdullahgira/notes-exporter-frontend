import React from "react";
import { FiCopy } from "react-icons/fi";
import YouTube from "react-youtube";
import { Button, Form, Icon } from "semantic-ui-react";

import api from "../api";
import { axios } from "../config/axios-config";
import useCopyToClipboard from "../hooks/use-copy-to-clipboard";
import useLocalStorage from "../lib/use-localstorage";
import { formatTime, getVideoId } from "../utils/youtube-utils";

/**
 * Creates a timer to track youtube API changes to the progress bar
 *
 */
const Youtube = () => {
  const [title, setTitle] = useLocalStorage("title");
  const [timestamps, setTimestamps] = useLocalStorage("timestamps");
  const [url, setUrl] = useLocalStorage("url");
  const [result, setResult] = useLocalStorage(
    "result",
    {},
    JSON.stringify,
    JSON.parse
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const playerRef = React.useRef(null);

  const copy = useCopyToClipboard();

  const captureMoment = React.useCallback(() => {
    setTitle(playerRef.current.videoTitle);
    const currentTime = playerRef.current.getCurrentTime();

    let h = Math.floor(currentTime / 3600);
    let m = Math.floor((currentTime % 3600) / 60);
    let s = Math.floor((currentTime % 3600) % 60);

    setTimestamps(`${timestamps}${formatTime(h, m, s)},30\n\n`);

    const textarea = document.getElementById("timestamps");
    textarea.scrollTop = textarea.scrollHeight;
  }, [timestamps]);

  const seekTo = React.useCallback((val) => {
    const seekToTime = playerRef.current?.getCurrentTime() + val;
    playerRef.current?.seekTo(seekToTime);
  }, []);

  const togglePlay = React.useCallback(() => {
    if (isPlaying) playerRef.current?.pauseVideo();
    else playerRef.current?.playVideo();
  }, [isPlaying]);

  const setPlaybackRate = React.useCallback((rate) => {
    playerRef.current?.setPlaybackRate(rate);
  }, []);

  const onPlay = React.useCallback(() => {
    setIsPlaying(true);
  }, []);

  const onPause = React.useCallback(() => {
    setIsPlaying(false);
  }, []);

  const onReady = React.useCallback((e) => {
    playerRef.current = e.target;
  }, []);

  const onReset = React.useCallback(() => {
    if (window.confirm("Reset the state?")) {
      setUrl("");
      setTimestamps("");
      setResult("");
      setTitle("");
    }
  }, []);

  const onSubmit = React.useCallback(() => {
    const data = { url, timestamps };

    setIsLoading(true);
    axios
      .post(api.youtube, data)
      .then((response) => setResult(response.data))
      .finally(() => setIsLoading(false));
  }, [url, timestamps]);

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
        <div className="mb-5 flex items-center justify-between gap-4">
          <Form.Input
            label="URL"
            name="url"
            className=" flex-grow"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />

          <Button type="button" className="mt-3" onClick={onReset}>
            <Icon name="refresh" />
            Reset
          </Button>
        </div>
        {url && getVideoId(url) && (
          <YouTube
            videoId={getVideoId(url)}
            onPlay={onPlay}
            onPause={onPause}
            onReady={onReady}
          />
        )}

        <Button type="button" className="mt-5" onClick={() => captureMoment()}>
          <Icon name="pencil" />
          Capture moment
        </Button>

        <p>Playback Rate</p>
        <div className="flex items-center gap-4 mb-5">
          <Button type="button" icon onClick={() => setPlaybackRate(1)}>
            1x
          </Button>
          <Button type="button" icon onClick={() => setPlaybackRate(1.5)}>
            1.5
          </Button>
          <Button type="button" icon onClick={() => setPlaybackRate(2)}>
            2
          </Button>
        </div>

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

        <Form.TextArea
          id="timestamps"
          label="Timestamps"
          rows={10}
          onChange={(e) => setTimestamps(e.target.value)}
          value={timestamps}
        />

        <Button type="submit" primary onClick={onSubmit}>
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
            <h1>{title}</h1>
            <a href={url}>{url}</a>
            <p></p>

            {result.notes?.map((h, i) => (
              <div key={h.link} className="my-4">
                <p>{h.note}</p>
                <a href={h.link}>
                  [{h.from} - {h.to}]
                </a>
                <p></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Youtube;
