import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import * as log from "electron-log";

let isLauncherReady = false;
const isDebug =
  process.env.NODE_ENV !== "prod" && process.env.NODE_ENV !== "production";

let mainWindow: any;

const lockInstance = app.requestSingleInstanceLock();

if (!lockInstance) {
  app.quit();
} else {
  log.transports.file.resolvePath = (variables) => {
    return `${variables.libraryDefaultDir}/metadefender_gui.log`;
  };

  if (isDebug) app.commandLine.appendSwitch("disable-hang-monitor");

  const createWindow = () => {
    const options = {
      transparent: false,
      show: true,
      useContentSize: true,
      alwaysOnTop: true,
      webPreferences: {
        webSecurity: true,
        allowRunningInsecureContent: false,
        nodeIntegration: true,
        contextIsolation: false,
        backgroundThrottling: false,
        spellcheck: false,
      },
      // titleBarStyle: 'hidden'
    };

    // In dev mode we are loading the app via http, therefore we need to disable webSecurity restrictions
    if (isDebug) {
      options.alwaysOnTop = false;
      options.webPreferences.webSecurity = false;
      options.webPreferences.allowRunningInsecureContent = true;
    }

    const generateURL = () => {
      return isDebug
        ? "http://localhost:8765"
        : url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
          });
    };
    
    mainWindow = new BrowserWindow(options);
    mainWindow.loadURL(generateURL());
  };

  app.whenReady().then(() => {
    createWindow();
  });
}
