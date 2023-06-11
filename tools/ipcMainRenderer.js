const { ipcMain, remote } = require('electron');
const services = require('./services');

const ipcMainEvents = {
    init: () => {
        ipcMain.on('translate', (e, ...args) => {
            const result = services.init(e, args);
        });
        
    }

};


module.exports = ipcMainEvents;

