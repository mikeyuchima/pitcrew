import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const customHistory = createBrowserHistory();

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
registerServiceWorker();
