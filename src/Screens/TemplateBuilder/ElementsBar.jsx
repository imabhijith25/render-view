import React from "react";
import "./templateBuilder.css";
import { shapeElements, textElements } from "./ElementsList";
import { v4 } from "uuid";
import IconRender from "../../Components/IconRender/IconRender";
const ElementsBar = ({ dispatch }) => {
    return (
        <>
            <p className="para-normal-head">Shape Elements</p>
            <ShapeElementBar dispatch={dispatch} />
            <hr />

            <p className="para-normal-head">Text Elements</p>
            <TextElementBar dispatch={dispatch} />
        </>
    );
};

const ShapeElementBar = ({ dispatch }) => {
    return (
        <>
            <div className="elements-shape-container">
                {shapeElements.map((item) => (
                    <div
                        className={"elements-shape"}
                        title={item.name}
                        onClick={() => {
                            dispatch({
                                type: "update_objects_list",
                                data: item.data(
                                    String(v4() + new Date().getMilliseconds())
                                ),
                            });
                        }}
                    >
                        <IconRender
                            svgContent={item.img}
                            width={36}
                            height={36}
                            stroke={"white"}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

const TextElementBar = ({ dispatch }) => {
    return (
        <>
            {textElements.map((item) => (
                <div
                    className={`element-text ${item.style}`}
                    onClick={() => {
                        dispatch({
                            type: "update_objects_list",
                            data: item.data(
                                String(v4() + new Date().getMilliseconds())
                            ),
                        });
                    }}
                >
                    {item.text}
                </div>
            ))}
        </>
    );
};
export default ElementsBar;
