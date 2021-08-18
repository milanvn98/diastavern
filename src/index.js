import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataContextProvider } from "./context/data_context";
import { AuthContextProvider } from "./context/auth-context";
import { NavContextProvider } from "./context/nav-context";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <NavContextProvider>
          <App />
        </NavContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
