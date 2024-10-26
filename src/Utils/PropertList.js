export const textProperties = {
    text: ["text", "input", "text", "Text Content"],
    fontSize: ["number", "input", "text", "Font Size"],
    fontFamily: ["number", "input", "dropdown", "Font Family"],
    fontStyle: ["number", "input", "dropdown", "Font Style"],
    fill: ["color", "input", "color", "Shape Color"],
    x: ["number", "input", "number", "Left/Right Position"],
    y: ["number", "input", "number", "Up/Down Position"],
};

export const circleProperties = {
    radius: ["number", "input", "number", "Radius"],
    fill: ["color", "input", "color", "Shape Color"],
    stroke: ["color", "input", "color", "Stroke"],
    strokeWidth: ["number", "input", "number", "Stroke Width"],
    x: ["number", "input", "number", "Left/Right Position"],
    y: ["number", "input", "number", "Up/Down Position"],
};

export const rectangleProperties = {
    height: ["number", "input", "text", "Height"],
    width: ["number", "input", "text", "Width"],

    fill: ["color", "input", "color", "Shape Color"],
    stroke: ["color", "input", "color", "Stroke"],
    strokeWidth: ["number", "input", "number", "Stroke Width"],

    x: ["number", "input", "number", "Left/Right Position"],
    y: ["number", "input", "number", "Up/Down Position"],
};

export const lineProperties = {
    stroke: ["color", "input", "color", "Stroke"],
    strokeWidth: ["number", "input", "number", "Stroke Width"],
    rotation: ["number", "input", "number", "Rotation"],
};
