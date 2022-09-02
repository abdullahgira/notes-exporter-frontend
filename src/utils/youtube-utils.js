export function getVideoId(link) {
  const videoId = "";
  const patterns = [
    /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/,
    /https:\/\/youtu\.be\/(\w+)/,
  ];

  const matchedPattern = patterns.filter((p) => p.test(link))[0];
  if (!matchedPattern) return;

  const groups = link.match(matchedPattern);

  if (!groups.length) return;
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
