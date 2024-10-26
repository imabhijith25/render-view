import React from "react";
export const ShapeSVG = (
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
);

export const Circle = <circle cx="12" cy="12" r="10"></circle>;

export const Rectangle = (
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
);

export const Line = <line x1="5" y1="12" x2="19" y2="12"></line>;

export const Poly = (
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
);

export const Play = <polygon points="5 3 19 12 5 21 5 3"></polygon>;
