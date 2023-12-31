const electron = require('electron');
const ipcMainEvents = require('./tools/ipcMainRenderer');
const { app, BrowserWindow, ipcRenderer, ipcMain} = electron;
const path = require('path');


const main = function() {
    const init = function() {
        events();
    };

    const events =  function() {
        app.on('ready', () => {
            createWindow();
            ipcMainEvents.init();
        });
        app.on('activate', () => {
            createWindow();
        });
        app.on('window-all-closed', () => {
            if(app.platform != 'darwin') {
                app.quit();
            }
        });
    };

    const createWindow = function () {
        const windowConfig = {
            width: 900,
            height: 450,
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                enableRemoteModule: true,
                allowRunningInsecureContent: true,
                webSecurity: true,
                contextIsolation: true,
                webviewTag: true,
                preload: path.join(__dirname, './tools/preload.js')
            },
            frame: false,
        
        };

        const mainWindow = new BrowserWindow(windowConfig);
    
        mainWindow.setResizable(false);

        mainWindow.webContents.openDevTools({ mode: 'undocked' });

        const url = "http://localhost:5173/"
        
        mainWindow.loadURL(url);

        global.ipcRenderer = ipcRenderer;
        global.mainWindow = mainWindow;

        ipcMain.on('maximize', (e, args) => {
            if(args.isMaximized) return mainWindow.restore();

            mainWindow.maximize()
        });

        ipcMain.on('minimize', () => {
            mainWindow.minimize();
        });
        
    };

    return {
        init: init
    }

}();

main.init();


