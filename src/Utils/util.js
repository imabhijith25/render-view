export const convertSecondstoHMS = (inD) => {
    console.log(inD);
    const d = Number(inD);

    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    return (
        ("0" + h).slice(-2) +
        ":" +
        ("0" + m).slice(-2) +
        ":" +
        ("0" + s).slice(-2)
    );
};

export const sanitizeHMS = (format) => {
    const formatArray = format.split(":");
    let sanitizedString =
        formatArray[0] == "00" ? `${formatArray[1]}:${formatArray[2]}` : format;
    return sanitizedString;
};

export const generateAndDispatchCustomEvent = (eventName, eValue) => {
    document.dispatchEvent(new CustomEvent(eventName, { detail: eValue }));
};
