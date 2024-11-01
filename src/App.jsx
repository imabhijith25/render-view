import React from "react";
import TrimAndManipulator from "./Screens/TrimAndManipulator/TrimAndManipulator";
import "./App.css";
import TemplateChoser from "./Screens/TemplateChoser/TemplateChoser";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TemplateBuilder from "./Screens/TemplateBuilder/TemplateBuilder";
import Render from "./Screens/Render/Render";
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TemplateBuilder />} />
                    <Route path="/trim" element={<TrimAndManipulator />} />
                    <Route path="/chose" element={<TemplateChoser />} />
                    <Route path="/render" element={<Render />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
