import React from "react";
import Scene from "../../Components/Scene/Scene";
import "../TemplateBuilder/templateBuilder.css";
const Render = () => {
    const sceneData = {
        frameData: {
            type: "image",
            fill: "green",
        },
        objectsList: [
            {
                uid: "f3",
                type: "text",
                opacity: 1,
                x: 30,
                y: 550,
                text: "This is how the text will appear over an image. The image here can be related to news",
                fontSize: 14,
                fontFamily: "Source Sans 3",
                fontStyle: "600",
                fill: "white",
                width: 300,
                padding: 20,
                align: "center",
                shadowBlur: 10, // Set the shadow blur radius
                shadowOffsetX: 5, // Set the shadow horizontal offset
                shadowOffsetY: 5, // Set the shadow vertical offset
            },
            {
                uid: "f2",
                type: "rectangle",
                x: 280,
                y: 20,
                width: 50,
                height: 50,
                fill: "#472296",
            },
        ],
        animationObjectsList: [
            {
                uid: "f3",
                type: "text",
                opacity: 0,
                x: 30,
                y: 570,
                text: "This is how the text will appear over an image. The image here can be related to news",
                fontSize: 14,
                fontFamily: "Source Sans 3",
                fontStyle: "600",
                fill: "white",
                width: 300,
                padding: 20,
                align: "center",
                shadowBlur: 10, // Set the shadow blur radius
                shadowOffsetX: 5, // Set the shadow horizontal offset
                shadowOffsetY: 5, // Set the shadow vertical offset
            },
            {
                uid: "f2",
                type: "rectangle",
                x: 280,
                y: 20,
                width: 50,
                height: 50,
                fill: "#472296",
            },
        ],
        animations: {
            f3: {
                name: "Fade In Vertical",
                on: "f3",
                uid: "f3",
                duration: 1,
                key: "fade_in_vertical",
                initialData: {
                    y: 570,
                    opacity: 0,
                },
                toData: {
                    y: 550,
                    opacity: 1,
                },
            },
        },
        mode: "animation",
        backgroundAnimations: {
            name: "scale-up",
        },
    };
    return (
        <div className="tb-layout">
            <div className="tb-visualizer">
                <Scene {...sceneData} />
            </div>
        </div>
    );
};

export default Render;
