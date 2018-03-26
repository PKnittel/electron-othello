const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // und Laden der index.html der App.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'client/index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }
  
  app.on('ready', createWindow);
