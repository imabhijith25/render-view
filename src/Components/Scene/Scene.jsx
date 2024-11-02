import "./Scene.jsx";
import React, { useEffect } from "react";
import { Frame } from "../../FrameProcessor/frame.js";
import { addObjects } from "../../FrameProcessor/addObjects.js";
import {
    assignAnimations,
    assignBackgroudAnimations,
} from "../../FrameProcessor/assignAnimations.js";
const Scene = ({
    frameData,
    objectsList,
    animationObjectsList,
    mode,
    animations,
    play = false,
}) => {
    const frame = new Frame(
        frameData.type == "video" ? "videoContainer" : "container"
    );

    console.log(frame);
    useEffect(() => {
        const videoElement = document.getElementById("myVideo");
        window.frame = frame;
        frame.createFrame();
        frame.addFrameBackground(frameData, videoElement, play);
        frame.addSelectionTransformers();
        if (mode == "animation") {
            addObjects(frame, animationObjectsList);
        } else {
            addObjects(frame, objectsList);
        }

        if (mode == "animation") {
            assignAnimations({ animations });
        }
    }, [frameData, objectsList, animations, animationObjectsList]); //these dependencies should be in a separate useeffect made only to update

    if (frameData.type == "video") {
        return (
            <>
                <div id="videoContainer"></div>
            </>
        );
    } else {
        return (
            <>
                <div id="container"></div>
            </>
        );
    }
};

export default Scene;
