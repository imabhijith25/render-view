const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");
const { generateTrimCommands } = require("./generateFFMPEG");
function createWindow() {
    const win = new BrowserWindow({
        width: 1300,
        height: 600,
        minWidth: 1300,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    // win.setMenu(null);
    // win.loadURL("http://localhost:9000");
    // win.webContents.openDevTools();
    win.loadFile("dist/index.html");
}
ipcMain.on("trim-video", (event, arg) => {
    // console.log(arg); // Log the message received from the renderer
    console.log(generateTrimCommands(arg["exportInfo"], arg["location"]));
    const ffmpegCommand = generateTrimCommands(
        arg["exportInfo"],
        arg["location"]
    );
    exec(ffmpegCommand, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
        if (stderr) console.log(stderr);
        console.log(`${stdout}`);
    });
    event.reply("reply-from-main", "Message received"); // Reply back to the renderer
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
