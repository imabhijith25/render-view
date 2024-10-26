export const sceneData = {
    frameData: {
        type: "image",
        fill: "green",
    },
    objectsList: [
        {
            uid: "f3",
            type: "text",
            // opacity: 0,
            x: 30,
            y: 450,
            text: "This is how the text will appear over an image. The image here can be related to news",
            fontSize: 14,
            fontFamily: "Source Sans 3",
            fontStyle: "600",
            fill: "white",
            width: 300,
            padding: 20,
            align: "center",
            shadowBlur: 10, // Set the shadow blur radius
            shadowOffsetX: 5, // Set the shadow horizontal offset
            shadowOffsetY: 5, // Set the shadow vertical offset
        },
        {
            uid: "f2",
            type: "rectangle",
            x: 280,
            y: 20,
            width: 50,
            height: 50,
            fill: "#472296",
        },
    ],
    animations: [
        {
            type: "default",
            name: "slide up",
            on: "f3",
        },
    ],

    backgroundAnimations: {
        name: "scale-up",
    },
};
export const videoSceneData = {
    frameData: {
        type: "video",
        fill: "green",
    },
    objectsList: [
        {
            uid: "f3",
            type: "text",
            opacity: 0,
            x: 30,
            y: 450,
            text: "This is how the text will appear over a Video. You can also trim the videos to your liking",
            fontSize: 14,
            fontFamily: "Source Sans 3",
            fontStyle: "600",
            fill: "white",
            width: 300,
            padding: 20,
            align: "center",
            shadowBlur: 10, // Set the shadow blur radius
            shadowOffsetX: 5, // Set the shadow horizontal offset
            shadowOffsetY: 5, // Set the shadow vertical offset
        },
        {
            uid: "f2",
            type: "rectangle",
            x: 280,
            y: 20,
            width: 50,
            height: 50,
            fill: "#472296",
        },
    ],
    animations: {
        ff1: {},
        ff2: {},
    },

    backgroundAnimations: {
        name: "scale-up",
    },
};
