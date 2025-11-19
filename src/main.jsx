import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { StoreProvider } from "./context/StoreContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import "./i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
