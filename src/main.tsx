import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import ViewContextProvider from "./contexts/View.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ViewContextProvider>
      <App />
    </ViewContextProvider>
  </React.StrictMode>
);
