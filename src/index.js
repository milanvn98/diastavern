import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataContextProvider } from "./context/data_context";
import { AuthContextProvider } from "./context/auth-context";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <App />
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
