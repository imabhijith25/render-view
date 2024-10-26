import Konva from "konva";
export const addObjects = (frame, objectsList) => {
    for (let objects = 0; objects < objectsList.length; objects++) {
        const konvaObject = resolveShape(objectsList[objects]);
        frame.addObject(konvaObject);
    }
};

const resolveShape = (objects) => {
    console.log(objects);
    if (objects.type == "circle") {
        return new Konva.Circle({
            ...objects,
        });
    } else if (objects.type == "text") {
        return new Konva.Text({ ...objects });
    } else if (objects.type == "rectangle") {
        return new Konva.Rect({ ...objects });
    } else if (objects.type == "line") {
        return new Konva.Line({ ...objects });
    }
};
