import React, { useEffect, useState } from "react";
import { AnimationsList } from "../../Utils/AnimationsList";
import "./templateBuilder.css";
import {
    assignAnimations,
    setAnimationObjectsList,
} from "../../FrameProcessor/assignAnimations";
import IconRender from "../../Components/IconRender/IconRender";
import { Play } from "../../Components/IconRender/SvgList";
const AnimationsBar = ({ currentShape, multiSelected, dispatch, state }) => {
    const animationNames = Object.keys(AnimationsList);
    const [selectedAnimaton, setSelectedAnimation] = useState(null);
    console.log("current shape", currentShape);
    const updateAnimations = () => {
        dispatch({
            type: "update_animations",
            data: {
                key: currentShape.uid,
                value: {
                    name: selectedAnimaton,
                    on: currentShape.uid,
                    ...AnimationsList[selectedAnimaton](currentShape),
                },
            },
        });
    };
    useEffect(() => {
        const currentAnimation = state?.animations?.[currentShape?.uid];
        if (currentAnimation) {
            console.log("current animation", currentAnimation);
            setSelectedAnimation(currentAnimation?.key);
        }
    }, [currentShape]);

    useEffect(() => {
        if (state.mode == "animation") {
            assignAnimations(state);
        }
    }, [state]);

    return (
        <>
            <div styles={{ height: "100%" }}>
                {/* <button
                    onClick={() => {
                        console.log(state);
                    }}
                >
                    View state
                </button> */}
                {animationNames.map((item) => (
                    <button
                        className={
                            selectedAnimaton == item
                                ? "chips chips-selected"
                                : "chips"
                        }
                        onClick={() => {
                            setSelectedAnimation(item);
                        }}
                    >
                        {AnimationsList[item]()?.name}
                    </button>
                ))}
            </div>

            <div
                className="play-button"
                onClick={async () => {
                    updateAnimations();
                }}
            >
                <IconRender
                    width={24}
                    height={24}
                    stroke={"white"}
                    fill={"none"}
                    svgContent={Play}
                />
                Play Template
            </div>
        </>
    );
};

export default AnimationsBar;
