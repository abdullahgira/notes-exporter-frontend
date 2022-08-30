export function _getVideoId(link) {
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

export function _formatURL(link) {
  const videoId = _getVideoId(link);
  if (!videoId) return "";
  return `https://www.youtube.com/embed/${videoId}`;
}
