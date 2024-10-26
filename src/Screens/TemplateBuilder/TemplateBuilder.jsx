import React, { useEffect, useReducer, useState } from "react";
import "./templateBuilder.css";
import ElementsBar from "./ElementsBar";
import Scene from "../../Components/Scene/Scene";
import { imageScene, reducer } from "./Reducer/ReducerFunction";
import PropertyBar from "./PropertyBar";
import AnimationsBar from "./AnimationsBar";
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

    return (
        <div className="tb-layout">
            <div className="tb-visualizer">
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
