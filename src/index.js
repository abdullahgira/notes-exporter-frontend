import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

import "semantic-ui-css/components/icon.min.css";
import "./assets/css/tailwind.css";
import "./assets/css/app.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
