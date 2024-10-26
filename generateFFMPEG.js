const generateTrimCommands = (exportData, location) => {
    let ffmpegCommand = `ffmpeg -i ${location}  -filter_complex "`;
    exportData.map((item, index) => {
        ffmpegCommand += `[0:v]trim=start=${item["from"]}:end=${item["to"]},setpts=PTS-STARTPTS[v${index}];   [0:a]atrim=start=${item["from"]}:end=${item["to"]},asetpts=PTS-STARTPTS[a${index}];`;
    });
    let tempEnding = ` `;
    exportData.map((item, index) => {
        tempEnding += `[v${index}][a${index}]`;
    });
    tempEnding += `concat=n=${
        exportData.length
    }:v=1:a=1[outv][outa]"  -map "[outv]" -map "[outa]" ${randomFileName()}.mp4`;
    ffmpegCommand + tempEnding;
    return ffmpegCommand + tempEnding;
};

const randomFileName = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    return "storydote" + timestamp;
};

// ffmpeg -i input_video.mp4 -filter_complex \
// "[0:v]trim=start=5:end=10,setpts=PTS-STARTPTS[v0]; \
//  [0:a]atrim=start=5:end=10,asetpts=PTS-STARTPTS[a0]; \
//  [0:v]trim=start=20:end=24,setpts=PTS-STARTPTS[v1]; \
//  [0:a]atrim=start=20:end=24,asetpts=PTS-STARTPTS[a1]; \
//  [v0][a0][v1][a1]concat=n=2:v=1:a=1[outv][outa]" \
// -map "[outv]" -map "[outa]" output_video.mp4

module.exports = {
    generateTrimCommands,
};
//ffmpeg -i ./dist/sample.mp4 -filter_complex "[0:v]trim=start=10:end=20,setpts=PTS-STARTPTS[v0]; [0:a]atrim=start=10:end=20,asetpts=PTS-STARTPTS[a0]" -map "[v0]" -map "[a0]" output.mp4
