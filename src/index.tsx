import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./scss/index";
import { App } from "./App";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// const devMode = process.env.MODE_ENV === "development";

// if (devMode && module && module.hot) {
//   module.hot.accept();
// }
