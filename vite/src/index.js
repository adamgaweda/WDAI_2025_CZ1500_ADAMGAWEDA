import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RecipesProvider } from "./context/RecipesContext";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <RecipesProvider>
            <App />
        </RecipesProvider>
    </BrowserRouter>
);