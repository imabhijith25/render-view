import Konva from "konva";
import { imageScene } from "../Screens/TemplateBuilder/Reducer/ReducerFunction";
import { AnimationsList } from "../Utils/AnimationsList";
import { generateAndDispatchCustomEvent } from "../Utils/util";

export const setAnimationObjectsList = (animations, objectsList) => {
    const finalList = [];
    for (let objects = 0; objects < objectsList.length; objects++) {
        console.log("first loop");
        const uid = objectsList[objects].uid;
        if (animations.hasOwnProperty(uid)) {
            const requiredData = {
                ...objectsList[objects],
                ...animations[uid].initialData,
            };
            finalList.push(requiredData);
        } else {
            finalList.push(objectsList[objects]);
        }
    }
    return finalList;
    // generateAndDispatchCustomEvent("update_animations_list", finalList);
};
export const assignAnimations = (state) => {
    let requiredNode;
    window.frame
        .getLayer()
        .getChildren()
        .map((node) => {
            const uid = node.attrs["uid"];
            if (state.animations.hasOwnProperty(uid)) {
                requiredNode = node;
                console.log("req1uirednode", requiredNode);
                const animationData = state.animations[uid];
                console.log("animationData", animationData);
                let tween = new Konva.Tween({
                    node: requiredNode,
                    ...animationData.toData,
                    duration: animationData.duration,
                    easing: animationData.easing,
                });

                tween.play();
            }
        });
    generateAndDispatchCustomEvent("set_to_default_mode");
};

export const assignBackgroudAnimations = (background) => {
    const tween = new Konva.Tween({
        node: background,
        scaleX: 1.092,
        scaleY: 1.092,
        duration: 1.5,
        easing: Konva.Easings.EaseInOut,
        onFinish: function () {
            setTimeout(() => {
                tween.reset();
                tween.play();
            }, 1200);
        },
    });
    tween.play();
};
