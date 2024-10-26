import React, { useEffect, useState } from "react";
import {
    ButtonPrimary,
    ButtonSecondary,
} from "../../Components/Buttons/Buttons";
import "./trimStyles.css";
import RangeSlider from "react-range-slider-input";
import "../../../node_modules/react-range-slider-input/dist/style.css";
import { convertSecondstoHMS, sanitizeHMS } from "../../Utils/util";
import { Preview } from "../../Components/Preview/Preview";
const TrimAndManipulator = () => {
    let videoPlayer;
    const [exportInfo, setExportInfo] = useState([]);
    const [controlStates, setControlStates] = useState({
        showClipAddedMessage: false,
        editMode: false,
        editIndex: null,
    });
    const [rangeData, setRangeData] = useState({
        value: [0, 0],
        min: 0,
        max: 0,
    });
    useEffect(() => {
        videoPlayer = document.getElementById("video-player");
    }, []);
    const getVideoPlayerDuration = () => {
        const duration = videoPlayer.duration;
        const tempRangeData = { ...rangeData };
        tempRangeData.value = [0, parseInt(duration)];
        tempRangeData.min = 0;
        tempRangeData.max = parseInt(duration);
        setRangeData(tempRangeData);
    };
    const cutClick = () => {
        //set image thumbnail
        const videoPlayer = document.getElementById("video-player");
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        let image = canvas.toDataURL("image/jpeg");
        const tempExport = [...exportInfo];
        console.log(controlStates);
        if (controlStates.editMode) {
            tempExport[controlStates.editIndex] = {
                from: parseInt(rangeData.value[0]),
                to: parseInt(rangeData.value[1]),
                image,
                value: [rangeData.value[0], rangeData.value[1]],
            };
        } else {
            tempExport.push({
                from: parseInt(rangeData.value[0]),
                to: parseInt(rangeData.value[1]),
                image,
                value: [rangeData.value[0], rangeData.value[1]],
            });
        }
        console.log(tempExport);
        setExportInfo(tempExport);
    };

    const exportVideo = () => {
        window.electron.sendMessage("trim-video", {
            location: "./dist/sample.mp4",
            exportInfo,
        });

        // Listen for a reply from the main process
        window.electron.receiveMessage("reply-from-main", (message) => {
            console.log(message); // 'Message received'
        });
    };

    const editClip = (index) => {
        setControlStates({
            ...controlStates,
            editMode: true,
            editIndex: index,
        });
        //set the current range value
        const tmp = exportInfo[index];
        setRangeData({ ...rangeData, value: tmp.value });
    };
    return (
        <>
            <div className="layout">
                <div className="container">
                    <div className="header">
                        <h2>Trim and Manipulate Video</h2>
                        <p>
                            Cut out certain portions of video and rearrange them
                        </p>
                    </div>
                    <div className="video-container">
                        <video
                            controls
                            class="styled-video"
                            id="video-player"
                            onLoadedMetadata={getVideoPlayerDuration}
                        >
                            <source
                                src="./sample.mp4"
                                type="video/mp4"
                            ></source>
                            Your browser does not support the video tag.
                        </video>
                        <p>
                            Drag the Knobs to get the video portion between them
                        </p>
                        <RangeSlider
                            id="rangeSlider"
                            value={rangeData.value}
                            max={rangeData.max}
                            min={rangeData.min}
                            onInput={(e) => {
                                const videoPlayer =
                                    document.getElementById("video-player");
                                videoPlayer.currentTime = e[0];
                                const tmp = { ...rangeData, value: e };
                                setRangeData(tmp);
                                setControlStates({
                                    ...controlStates,
                                    showClipAddedMessage: false,
                                });
                            }}
                        />
                    </div>

                    <div className="cut-clip-container">
                        {/* <ButtonPrimary text={"Export as Video"}></ButtonPrimary> */}
                        <ButtonSecondary
                            text={
                                controlStates.editMode
                                    ? `Edit Cut from ${sanitizeHMS(
                                          convertSecondstoHMS(
                                              rangeData.value[0]
                                          )
                                      )} to ${sanitizeHMS(
                                          convertSecondstoHMS(
                                              rangeData.value[1]
                                          )
                                      )}`
                                    : `Add Cut from ${sanitizeHMS(
                                          convertSecondstoHMS(
                                              rangeData.value[0]
                                          )
                                      )} to ${sanitizeHMS(
                                          convertSecondstoHMS(
                                              rangeData.value[1]
                                          )
                                      )}`
                            }
                            onClick={() => {
                                cutClick();
                                setControlStates({
                                    ...controlStates,
                                    showClipAddedMessage: true,
                                    editIndex: null,
                                    editMode: 0,
                                });
                            }}
                        ></ButtonSecondary>

                        {controlStates.showClipAddedMessage &&
                            !controlStates.editMode &&
                            (exportInfo.length < 5 ? (
                                <p>
                                    Clip Added! You can add more clips by
                                    dragging the knob.
                                </p>
                            ) : (
                                <p>
                                    Final Clip Added. You can only add 5 clips
                                </p>
                            ))}
                        {controlStates.editMode ? (
                            <p
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={() => {
                                    setControlStates({
                                        ...controlStates,
                                        showClipAddedMessage: false,
                                        editIndex: null,
                                        editMode: 0,
                                    });
                                }}
                            >
                                You are editing clip {controlStates.editIndex}.
                                Click to cancel.
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    {exportInfo.length > 0 && (
                        <>
                            <div className="preview-area">
                                {exportInfo.map((item, index) => (
                                    <Preview
                                        image={item.image}
                                        onClick={() => {
                                            editClip(index);
                                        }}
                                        displayText={
                                            "Click to edit of this portion"
                                        }
                                    />
                                ))}
                            </div>

                            <div>
                                <ButtonPrimary
                                    text={"Export as Video"}
                                    onClick={exportVideo}
                                ></ButtonPrimary>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default TrimAndManipulator;
