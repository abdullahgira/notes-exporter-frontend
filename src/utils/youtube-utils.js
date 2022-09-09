export function getVideoId(link) {
  const pattern =
    /^https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/)([\w\d-]+)/;

  const groups = link.match(pattern);

  if (!groups?.length) return;
  return groups[1];
}

export function formatURL(link) {
  const videoId = getVideoId(link);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}`;
}

function _prependZero(time) {
  return `${time < 10 ? `0${time}` : time}`;
}

export function formatTime(h, m, s) {
  return `${h ? h + ":" : ""}${_prependZero(m)}:${_prependZero(s)}`;
}
