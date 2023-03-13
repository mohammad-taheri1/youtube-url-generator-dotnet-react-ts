import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
reportWebVitals();
