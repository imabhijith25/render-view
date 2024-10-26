import React from "react";

const IconRender = ({ width, height, stroke, fill, svgContent }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={fill ? fill : "none"}
            stroke={stroke ? stroke : "currentColor"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-type"
        >
            {svgContent}
        </svg>
    );
};

export default IconRender;
