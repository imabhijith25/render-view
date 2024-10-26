export const PrimitiveText = (
    textContent,
    uid,
    x,
    y,
    fontSize = 14,
    fontStyle = "600"
) => {
    return {
        uid,
        type: "text",
        x,
        y,
        text: textContent,
        fontSize,
        fontFamily: "Source Sans 3",
        fontStyle,
        fill: "black",
        opacity: 1,
        draggable: true,
    };
};

export const PrimitiveRectangle = (uid, x, y) => {
    return {
        uid,
        type: "rectangle",
        x,
        y,
        width: 50,
        stroke: "#fefefe",
        strokeWidth: 4,
        height: 50,
        fill: "#472296",
        draggable: true,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        offsetX: 0,
        offsetY: 0,
        skewX: 0,
        skewY: 0,
        opacity: 1,
    };
};

export const PrimitiveCircle = (uid, x, y) => {
    return {
        uid,
        type: "circle",
        x,
        y,
        radius: 70,
        fill: "#e6e6e6",
        stroke: "#1e1e1e",
        strokeWidth: 4,
        draggable: true,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        offsetX: 0,
        offsetY: 0,
        skewX: 0,
        opacity: 1,
        skewY: 0,
    };
};

export const PrimitiveLine = (uid) => {
    return {
        uid,
        type: "line",
        rotation: 0,
        points: [10, 20, 50, 60],
        stroke: "#1e1e1e",
        strokeWidth: 10,
        draggable: true,
        opacity: 1,
    };
};
