import {
    PrimitiveCircle,
    PrimitiveLine,
    PrimitiveRectangle,
    PrimitiveText,
} from "./Reducer/PrimitiveElementData";
import {
    ShapeSVG,
    Circle,
    Rectangle,
    Line,
    Poly,
} from "../../Components/IconRender/SvgList";

export const textElements = [
    {
        name: "heading_one",
        style: "large_heading",
        text: "Heading One",
        data: (uid) => PrimitiveText("Heading Text", uid, 80, 220, 20, "900"),
    },
    {
        name: "para_one",
        style: "normal_paragrah",
        text: "Paragraphs",
        data: (uid) => PrimitiveText("Paragraph Text", uid, 80, 290, 14, "500"),
    },
];

export const frameElements = [
    {
        name: "frame_image",
        img: "",
        style: "frame_image",
    },
    {
        name: "frame_video",
        img: "",
        style: "frame_video",
    },
];
export const shapeElements = [
    {
        name: "rectangle",
        style: "shape_styles",
        img: Rectangle,
        data: (uid) => PrimitiveRectangle(uid, 120, 50),
    },
    {
        name: "circle",
        style: "shape_styles",
        img: Circle,
        data: (uid) => PrimitiveCircle(uid, 20, 50),
    },

    {
        name: "line",
        style: "shape_styles",
        img: Line,
        data: (uid) => PrimitiveLine(uid),
    },
];
