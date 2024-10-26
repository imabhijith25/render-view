import React from "react";
import "./Button.css";
export const ButtonPrimary = ({ text, size = "medium", onClick }) => {
    return (
        <button className={"primary button-commons"} onClick={onClick}>
            {text}
        </button>
    );
};

export const ButtonSecondary = ({ text, size = "medium", onClick }) => {
    return (
        <button className={"secondary button-commons"} onClick={onClick}>
            {text}
        </button>
    );
};

export const ButtonPlain = ({ text, size = "small", onClick }) => {
    return (
        <button className={"plain button-commons"} onClick={onClick}>
            {text}
        </button>
    );
};
