import { setAnimationObjectsList } from "../../../FrameProcessor/assignAnimations";

export const imageScene = {
    frameData: {
        type: "color",
        fill: "#ffffff",
    },
    mode: "default", //or animation
    objectsList: [],
    animationObjectsList: [],
    animations: {},

    backgroundAnimations: {},
};

export function reducer(state, action) {
    const tempObjectsList = [...state.objectsList];
    switch (action.type) {
        case "update_frame_data":
            return { ...state, frameData: action.data };
        case "update_objects_list":
            const existing = tempObjectsList.find(
                (item) => item.uid == action.data.uid
            );
            if (!existing) {
                tempObjectsList.push(action.data);
                return { ...state, objectsList: tempObjectsList };
            } else {
                const newObjectsList = tempObjectsList.map((item) => {
                    if (item.uid == action.data.uid) {
                        return { ...action["data"] };
                    } else {
                        return { ...item };
                    }
                });

                return { ...state, objectsList: newObjectsList };
            }

        case "shift_objects_list":
            return { ...state, objectsList: action.data };
        case "delete_objects":
            const newObjects = tempObjectsList.filter(
                (item) => item?.uid != action.data?.uid
            );
            return { ...state, objectsList: newObjects };

        case "update_animations":
            const animList = setAnimationObjectsList(
                {
                    ...state.animations,
                    [action.data.key]: action.data.value,
                },
                state
            );
            return {
                ...state,
                animationObjectsList: animList,
                mode: "animation",
                animations: {
                    ...state.animations,
                    [action.data.key]: action.data.value,
                },
            };

        case "update_animations_list":
            console.log("gonger");
            console.log(action.data);
            let uniqueArr = [...new Set(action.data.map(JSON.stringify))].map(
                JSON.parse
            );
            console.log("unqie", uniqueArr);
            return {
                ...state,
                mode: "animation",
                animationObjectsList: uniqueArr,
            };

        case "switch_to_default":
            return {
                ...state,
                mode: "default",
            };

        case "switch_to_animation":
            return {
                ...state,
                mode: "animation",
            };

        case "update_background_animations":
            return { ...state, count: state.count - 1 };

        default:
            return "Unrecognized command";
    }
}
