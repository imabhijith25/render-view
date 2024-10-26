import React, { useEffect, useState } from "react";
import {
    circleProperties,
    lineProperties,
    rectangleProperties,
    textProperties,
} from "../../Utils/PropertList";
import { ButtonPlain } from "../../Components/Buttons/Buttons";
import { colorFrame } from "../../Utils/frameData";
const PropertyBar = ({ currentShape, state, dispatch, multiSelected }) => {
    const [property, setProperty] = useState(null);
    const propertyDeterminer = {
        text: textProperties,
        circle: circleProperties,
        rect: rectangleProperties,
        rectangle: rectangleProperties,
        line: lineProperties,
    };

    useEffect(() => {
        if (currentShape != null) {
            setProperty(currentShape.type);
        } else if (currentShape?.type == "frame") {
            setProperty("frame");
        }
    }, [currentShape]);

    const handleChange = (uid, property, value) => {
        const existing = state.objectsList.find(
            (item) => item?.uid == currentShape?.uid
        );
        dispatch({
            type: "update_objects_list",
            data: { ...existing, uid, [property]: value },
        });
    };

    const move = (to) => {
        const objectsList = [...state.objectsList];
        if (objectsList.length == 0 || objectsList.length == 1) return;
        let previousIndex = null;
        let nextIndex = null;
        let current = 0;
        for (let i = 0; i < objectsList.length; i++) {
            if (objectsList[i].uid == currentShape.uid) {
                current = i;
                previousIndex = i != 0 ? i - 1 : 0;
                nextIndex =
                    i != objectsList.length - 1
                        ? i + 1
                        : objectsList.length - 1;
            }
        }
        if (to == "back") {
            const temp = objectsList[current];
            objectsList[current] = objectsList[previousIndex];
            objectsList[previousIndex] = temp;
            dispatch({
                type: "shift_objects_list",
                data: objectsList,
            });
        } else {
            const temp = objectsList[current];
            objectsList[current] = objectsList[nextIndex];
            objectsList[nextIndex] = temp;
            dispatch({
                type: "shift_objects_list",
                data: objectsList,
            });
        }
    };
    console.log("sha[e", currentShape);
    if (multiSelected) {
        return (
            <>
                <div>You have selected multiple items</div>
            </>
        );
    } else if (currentShape == null || currentShape?.type == "frame") {
        return (
            <>
                <div dangerouslySetInnerHTML={colorFrame}></div>
                <div className="property-group">
                    <p className="property-name">Frame Color: </p>
                    <input
                        type="color"
                        value={state.frameData.fill}
                        className="property-input"
                        onChange={(e) => {
                            dispatch({
                                type: "update_frame_data",
                                data: {
                                    ...state.frameData,
                                    fill: e.target.value,
                                },
                            });
                        }}
                    />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    {Object.keys(propertyDeterminer?.[property] || []).map(
                        (item) => (
                            <>
                                <div className="property-group">
                                    <p className="property-name">
                                        {
                                            propertyDeterminer?.[property][
                                                item
                                            ][3]
                                        }
                                        :
                                    </p>
                                    <input
                                        className={
                                            propertyDeterminer?.[property][
                                                item
                                            ][3] == "Text Content" ||
                                            propertyDeterminer?.[property][
                                                item
                                            ][3] == "Font Family"
                                                ? "property-input-text-area"
                                                : "property-input"
                                        }
                                        type={
                                            propertyDeterminer?.[property][
                                                item
                                            ][2]
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                currentShape?.uid,
                                                item,
                                                propertyDeterminer?.[property][
                                                    item
                                                ][2] == "number"
                                                    ? Number(e.target.value)
                                                    : e.target.value
                                            )
                                        }
                                        value={
                                            state.objectsList.find(
                                                (item) =>
                                                    item?.uid ==
                                                    currentShape?.uid
                                            )?.[item]
                                        }
                                    ></input>{" "}
                                </div>
                            </>
                        )
                    )}

                    {currentShape != null && (
                        <div className="movement-container">
                            <ButtonPlain
                                text={"Move To Front"}
                                onClick={() => {
                                    move("front");
                                }}
                            ></ButtonPlain>
                            <ButtonPlain
                                onClick={() => {
                                    move("back");
                                }}
                                text={"Move To Back"}
                            ></ButtonPlain>
                        </div>
                    )}
                </div>
            </>
        );
    }
};

export default PropertyBar;
