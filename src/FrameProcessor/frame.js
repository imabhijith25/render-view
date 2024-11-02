import Konva from "konva";
import { assignBackgroudAnimations } from "./assignAnimations";
import { generateAndDispatchCustomEvent } from "../Utils/util";
export class Frame {
    constructor(containerName) {
        this.containerName = containerName;
    }
    createFrame() {
        this.frame = new Konva.Stage({
            container: this.containerName,
            height: 640,
            width: 360,
        });
        this.backgroundLayer = new Konva.Layer();
        this.layer = new Konva.Layer();
        this.frame.add(this.backgroundLayer);
        this.frame.add(this.layer);
    }

    //this represents frame background
    addFrameBackground(frameData, play) {
        if (frameData.type == "color") {
            this.background = new Konva.Rect({
                x: 0,
                y: 0,
                height: this.frame.height(),
                width: this.frame.width(),
                fill: frameData.fill,
            });
            this.backgroundLayer.add(this.background);
        } else if (frameData.type == "image") {
            const image = new Image();
            image.onload = () => {
                this.background = new Konva.Image({
                    x: 0,
                    y: 0,

                    height: this.frame.height(),
                    width: this.frame.width(),
                    image,
                });

                this.backgroundLayer.add(this.background);
            };
            image.src = "./image.jpg";
        } else {
            var video = document.createElement("video");
            video.src = "./sample.mp4";
            video.muted = true;
            this.videoBackground = new Konva.Image({
                x: 0,
                y: 0,
                scaleX: 1.2,
                scaleY: 1.2,
                image: video,
            });
            this.backgroundLayer.add(this.videoBackground);
            var anim = new Konva.Animation(function () {
                // do nothing, animation just need to update the layer
            }, this.backgroundLayer);

            // update Konva.Image size when meta is loaded
            let that = this;
            video.addEventListener("loadedmetadata", function (e) {
                that.videoBackground.width(video.videoWidth);
                that.videoBackground.height(video.videoHeight);
            });
            video.play();
            anim.start();
        }
    }

    addObject(item) {
        if (item instanceof Konva.Node) {
            item.on("dragend", (e) => {
                generateAndDispatchCustomEvent(
                    "update_objects_list",
                    e.target.attrs
                );
                generateAndDispatchCustomEvent("set_tab_to_properties", {
                    ...e.target.attrs,
                });
            });
            item.on("transformend", (e) => {
                generateAndDispatchCustomEvent(
                    "update_objects_list",
                    e.target.attrs
                );
            });
            this.layer.add(item);
        }
    }

    getFramer() {
        return this.frame;
    }
    getLayer() {
        return this.layer;
    }

    getBackgroundLayer() {
        return this.backgroundLayer;
    }

    getTransformer() {
        return this.transformer.nodes();
    }

    addSelectionTransformers() {
        this.transformer = new Konva.Transformer();
        this.layer.add(this.transformer);

        this.frame.on("click tap", (e) => {
            if (e.target === this.frame || e.target == this.background) {
                console.log("frame clicked");
                this.transformer.nodes([]);
                console.log(e.target);
                generateAndDispatchCustomEvent("set_tab_to_properties", {
                    ...e.target.attrs,
                    type: "frame",
                });
                return;
            }
            // do we pressed shift or ctrl?
            const metaPressed =
                e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
            const isSelected = this.transformer.nodes().indexOf(e.target) >= 0;
            console.log("return not doen");
            if (!metaPressed && !isSelected) {
                // if no key pressed and the node is not selected
                // select just one
                this.transformer.nodes([e.target]);
                generateAndDispatchCustomEvent(
                    "set_tab_to_properties",
                    e.target.attrs
                );
                generateAndDispatchCustomEvent("multiselect_removed");
            } else if (metaPressed && isSelected) {
                // if we pressed keys and node was selected
                // we need to remove it from selection:
                const nodes = this.transformer.nodes().slice(); // use slice to have new copy of array
                // remove node from array
                nodes.splice(nodes.indexOf(e.target), 1);
                this.transformer.nodes(nodes);

                if (this.transformer.nodes().length == 1) {
                    generateAndDispatchCustomEvent(
                        "set_tab_to_properties",
                        this.transformer.nodes()[0].attrs
                    );
                    generateAndDispatchCustomEvent("multiselect_removed");
                }
            } else if (metaPressed && !isSelected) {
                // add the node into selection
                const nodes = this.transformer.nodes().concat([e.target]);
                this.transformer.nodes(nodes);
                if (this.transformer.nodes().length == 1) {
                    generateAndDispatchCustomEvent(
                        "set_tab_to_properties",
                        this.transformer.nodes()[0].attrs
                    );
                    generateAndDispatchCustomEvent("multiselect_removed");
                } else {
                    generateAndDispatchCustomEvent("multiselect_added");
                }
            }

            this.transformer.moveToTop();
        });
    }
}
