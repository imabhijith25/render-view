import React from "react";
import "./templateChoser.css";
import {
    ButtonPrimary,
    ButtonSecondary,
} from "../../Components/Buttons/Buttons";
import Scene from "../../Components/Scene/Scene";
import { sceneData, videoSceneData } from "../../Mocks/SceneData";
const TemplateChoser = () => {
    const listOfTemplates = [
        {
            name: "Deafult Express",
            key: "default_express",
        },
        {
            name: "Lois lane",
            key: "lois_lane",
        },
    ];
    return (
        <div className="layout">
            <div className="templateChoserContainer">
                <div className="template-header">
                    <div>
                        <h3>Choose a template for your video</h3>
                        <p>
                            This will be the template used during automated
                            video generation. You can always change it!!
                        </p>
                    </div>
                    <div className="button-area">
                        <ButtonPrimary text={"Use This Template"} />
                        {/* <ButtonSecondary text={"Customize This Template"} /> */}
                    </div>
                </div>
                <div className="choser-content">
                    <div className="choser-menu">
                        {listOfTemplates.map((item) => (
                            <p
                                className={
                                    item.key == "default_express"
                                        ? "selected"
                                        : ""
                                }
                            >
                                {item.name}
                            </p>
                        ))}
                        <p className="create-template">
                            <ButtonSecondary
                                text={"+ Create your Own Template"}
                            />
                        </p>
                    </div>
                    <div className="choser-template">
                        <div className="choser-screen-image">
                            <Scene {...sceneData} type="image" />
                        </div>
                        <div className="choser-screen-video">
                            <Scene {...videoSceneData} type="video" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateChoser;
