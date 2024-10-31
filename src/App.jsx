import React from "react";
import TrimAndManipulator from "./Screens/TrimAndManipulator/TrimAndManipulator";
import "./App.css";
import TemplateChoser from "./Screens/TemplateChoser/TemplateChoser";
import TemplateBuilder from "./Screens/TemplateBuilder/TemplateBuilder";
const App = () => {
    return (
        <>
            {/* <TrimAndManipulator /> */}
            {/* <TemplateChoser /> */}
            <TemplateBuilder />
        </>
    );
};

export default App;
