import Konva from "konva";
export const AnimationsList = {
    fade_in: (currentData) => {
        return {
            uid: currentData?.uid,
            duration: 2,
            easing: Konva.Easings.EaseIn,
            name: "Fade In",
            key: "fade_in",
            initialData: {
                opacity: 0,
            },
            toData: {
                opacity: currentData?.opacity,
            },
        };
    },
    fade_in_horizontal: (currentData) => {
        return {
            uid: currentData?.uid,
            duration: 2,
            easing: Konva.Easings.EaseIn,
            name: "Fade In Horizontal",
            key: "fade_in_horizontal",
            initialData: {
                opacity: 0,
                x: currentData?.x - 30,
            },
            toData: {
                opacity: currentData?.opacity,
                x: currentData?.x,
            },
        };
    },
    fade_in_vertical: (currentData) => {
        return {
            uid: currentData?.uid,
            duration: 2,
            easing: Konva.Easings.EaseIn,
            key: "fade_in_vertical",
            name: "Fade In Vertical",
            initialData: {
                y: currentData?.y + 20,
                opacity: 0,
            },
            toData: {
                y: currentData?.y,
                opacity: currentData?.opacity,
            },
        };
    },

    slide_in_horizontal: (currentData) => {
        return {
            uid: currentData?.uid,
            duration: 2,
            easing: Konva.Easings.EaseIn,
            key: "slide_in_horizontal",
            name: "Slide In Horizontal",
            initialData: {
                x: currentData?.x - 30,
            },
            toData: {
                x: currentData?.x,
            },
        };
    },
    slide_in_vertical: (currentData) => {
        return {
            uid: currentData?.uid,
            duration: 2,
            easing: Konva.Easings.EaseIn,
            key: "slide_in_vertical",
            name: "Slide In Vertical",
            initialData: {
                y: currentData?.y + 20,
            },
            toData: {
                y: currentData?.y,
            },
        };
    },
};
