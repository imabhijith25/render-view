import React, { useEffect, useReducer, useState } from "react";
import "./templateBuilder.css";
import ElementsBar from "./ElementsBar";
import Scene from "../../Components/Scene/Scene";
import { imageScene, reducer } from "./Reducer/ReducerFunction";
import PropertyBar from "./PropertyBar";
import AnimationsBar from "./AnimationsBar";
import { assignAnimations } from "../../FrameProcessor/assignAnimations";
const TemplateBuilder = () => {
    const [state, dispatch] = useReducer(reducer, imageScene);
    const [currentTab, setCurrentTab] = useState("properties");
    const [currentShape, setCurrentShape] = useState(null);
    const [multiSelected, setMultiSelected] = useState(false);
    useEffect(() => {
        document.addEventListener("update_objects_list", (e) => {
            dispatch({
                type: "update_objects_list",
                data: e.detail,
            });
        });

        document.addEventListener("multiselect_added", () => {
            setMultiSelected(true);
        });
        document.addEventListener("multiselect_removed", () => {
            setMultiSelected(false);
        });

        document.addEventListener("set_tab_to_properties", (e) => {
            setCurrentTab("properties");
            setCurrentShape(e.detail);
        });

        document.addEventListener("update_animations_list", (e) => {
            dispatch({
                type: "update_animations_list",
                data: e.detail,
            });
        });

        document.addEventListener("set_to_default_mode", (e) => {
            dispatch({
                type: "switch_to_default",
            });
        });

        document.addEventListener("keydown", (e) => {
            if (e.key == "Delete") {
                dispatch({
                    type: "delete_objects",
                    data: window.frame.getTransformer()[0].attrs,
                });
                setCurrentShape(null);
                setCurrentTab("elements");
            }
        });
    }, []);
    useEffect(() => {
        console.log(state);
        if (state.mode == "animation") {
            assignAnimations(state);
        }
    }, [state]);

    const injectAndPlay = () => {
        const animations = {
            "097c9650-8f34-4670-bd2c-eaefc6ba6671603": {
                name: "Fade In",
                on: "097c9650-8f34-4670-bd2c-eaefc6ba6671603",
                uid: "097c9650-8f34-4670-bd2c-eaefc6ba6671603",
                duration: 2,
                key: "fade_in",
                initialData: {
                    opacity: 0,
                },
                toData: {
                    opacity: 1,
                },
            },
        };

        const objectsList = [
            {
                uid: "097c9650-8f34-4670-bd2c-eaefc6ba6671603",
                type: "rectangle",
                x: 120,
                y: 50,
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
            },
        ];

        //update animations,
        //update objectsList,
        //call update_animatiosn reducer function
        dispatch({
            type: "inject_and_update_and_play",
            data: {
                animations,
                objectsList,
            },
        });
    };

    return (
        <div className="tb-layout">
            <div className="tb-visualizer">
                <button onClick={injectAndPlay}>
                    Inject Data and Play Animation
                </button>
                <Scene {...state} />
            </div>
            <div className="tb-propertyBar">
                <div className="tab-container">
                    <button
                        className={
                            currentTab == "properties"
                                ? "tab tab-selected"
                                : "tab"
                        }
                        onClick={() => setCurrentTab("properties")}
                    >
                        Properties
                    </button>
                    <button
                        className={
                            currentTab == "elements"
                                ? "tab tab-selected"
                                : "tab"
                        }
                        onClick={() => setCurrentTab("elements")}
                    >
                        Elements
                    </button>
                    <button
                        className={
                            currentTab == "animations"
                                ? "tab tab-selected"
                                : "tab"
                        }
                        onClick={() => setCurrentTab("animations")}
                    >
                        Animations
                    </button>
                </div>
                {currentTab == "properties" && (
                    <PropertyBar
                        currentShape={currentShape}
                        state={state}
                        dispatch={dispatch}
                        multiSelected={multiSelected}
                    />
                )}

                {currentTab == "elements" && (
                    <ElementsBar dispatch={dispatch} />
                )}

                {currentTab == "animations" && (
                    <AnimationsBar
                        state={state}
                        currentShape={currentShape}
                        dispatch={dispatch}
                    />
                )}
            </div>
        </div>
    );
};

export default TemplateBuilder;
