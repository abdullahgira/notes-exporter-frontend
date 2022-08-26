export const formatJSONFromFile = (file, handleJson) => {
  const reader = new FileReader();

  reader.onload = function (event) {
    const parsedJson = JSON.parse(event.target.result);
    if (typeof handleJson === "function") handleJson(parsedJson);
  };

  reader.readAsText(file);
};
