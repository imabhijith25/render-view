import React, { useEffect, useState } from "react";
import Scene from "../../Components/Scene/Scene";
import "../TemplateBuilder/templateBuilder.css";
import { useSearchParams } from "react-router-dom";
const temp = {
    frameData: {
        type: "image",
        fill: "green",
    },
    objectsList: [
        {
            uid: "f3",
            type: "text",
            opacity: 1,
            x: 30,
            y: 550,
            text: "This is how the text will appear over an image. The image here can be related to news",
            fontSize: 14,
            fontFamily: "Source Sans 3",
            fontStyle: "600",
            fill: "white",
            width: 300,
            padding: 20,
            align: "center",
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
        {
            uid: "blp",
            type: "rectangle",
            x: 280,
            y: 20,
            width: 50,
            height: 50,
            opacity: 0,
            fill: "#472296",
        },
    ],
    animationObjectsList: [
        {
            uid: "f3",
            type: "text",
            opacity: 0,
            x: 30,
            y: 570,
            text: "This is how the text will appear over an image. The image here can be related to news",
            fontSize: 14,
            fontFamily: "Source Sans 3",
            fontStyle: "600",
            fill: "white",
            width: 300,
            padding: 20,
            align: "center",
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

        {
            uid: "blp",
            type: "rectangle",
            x: 0,
            y: 20,
            width: 50,
            height: 50,
            opacity: 0,
            fill: "#472296",
        },
    ],
    animations: {
        f3: {
            name: "Fade In Vertical",
            on: "f3",
            uid: "f3",
            duration: 1,
            key: "fade_in_vertical",
            initialData: {
                y: 570,
                opacity: 0,
            },
            toData: {
                y: 550,
                opacity: 1,
            },
        },

        blp: {
            name: "Fade In Vertical",
            on: "f3",
            uid: "f3",
            duration: 7,
            key: "fade_in_vertical",
            initialData: {
                x: 0,
                opacity: 0,
            },
            toData: {
                x: 300,
                opacity: 0,
            },
        },
    },
    mode: "animation",
    duration: 2,
    backgroundAnimations: {
        name: "scale-up",
    },
};
const Render = () => {
    let mediaRecorder;
    let canvas;
    let canvasBg;
    let ctx;
    let ctxbg;
    const [sceneData, setSceneData] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const generateVideoCapture = () => {
        console.log(document.getElementsByTagName("canvas"));
        canvas = document.getElementsByTagName("canvas")[1];
        //try getting multiple streams
        ctx = canvas.getContext("2d");

        const data = []; // here we will store our recorded media chunks (Blobs)
        console.log(canvas);
        const stream = canvas.captureStream(60); // records the canvas in real time at our preferred framerate 30 in this case.
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            console.log("data available");
            data.push(e.data);
        };
        mediaRecorder.onstop = (e) =>
            downloadVideo(new Blob(data, { type: "video/webm;codecs=h264" }));
        mediaRecorder.start(1000);
    };

    useEffect(() => {
        //call this from api
        console.log(searchParams);

        setSceneData({ ...temp, mode: "animation" });
    }, []);
    useEffect(() => {
        if (
            sceneData &&
            sceneData.mode == "animation" &&
            searchParams.get("play")
        ) {
            recordDemo();
            generateVideoCapture();
        }
    }, [sceneData]);

    const recordDemo = () => {
        let x = 0;
        const s = setInterval(() => {
            console.log(x);
            if (x == 0) {
            }
            if (x == sceneData.duration * 1000) {
                mediaRecorder.stop();
            }
            x = x + 1000;

            if (x == 8000) {
                clearInterval(s);
            }
        }, 1000);
    };
    const downloadVideo = async (blob) => {
        const div = document.getElementById("man");
        var url = URL.createObjectURL(blob);
        console.log(url);
        var a = document.createElement("a");
        a.href = url;
        a.download = "test.webm";
        a.className = "button";
        a.innerText = "click here to download";
        div.appendChild(a);
        a.click();
    };

    return (
        <div className="tb-layout">
            <button
                onClick={() => {
                    recordDemo();
                }}
            ></button>
            <div className="tb-visualizer">
                {sceneData && <Scene {...sceneData} />}
                <div id="man"></div>
            </div>
        </div>
    );
};

export default Render;
