import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
const devMode = process.env.MODE_ENV === "development";
if (devMode && module && module.hot) {
  module.hot.accept();
}
