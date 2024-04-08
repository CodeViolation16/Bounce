import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import emailjs from "@emailjs/browser";

emailjs.init({
  publicKey: "UkUjerbLysGboAWZw",
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: ["foo@emailjs.com", "bar@emailjs.com"],
    // The variable contains the email address
    watchVariable: "userEmail",
  },
  limitRate: {
    // Set the limit rate for the application
    id: "app",
    // Allow 1 request per 10s
    throttle: 10000,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
