import React, { useState } from "react";
import "./Preview.css";
export const Preview = ({ image, displayText, onClick }) => {
    const [text, setText] = useState(false);
    return (
        <div
            className="preview"
            onClick={onClick}
            onMouseEnter={() => {
                setText(true);
            }}
            onMouseLeave={() => {
                setText(false);
            }}
            style={{
                backgroundImage: `url("${image}")`,
                backgroundSize: "auto",
            }}
        >
            {/* <img src={image} /> */}
            {text && <p>{displayText}</p>}
        </div>
    );
};

export const PreviewAddMore = ({ image, displayText }) => {
    // const [text, setText] = useState(false);
    return (
        <div
            className="preview"
            // onMouseEnter={() => {
            //     setText(true);
            // }}
            // onMouseLeave={() => {
            //     setText(false);
            // }}
            // style={{
            //     backgroundImage: `url("${image}")`,
            //     backgroundSize: "auto",
            // }}
        ></div>
    );
};
