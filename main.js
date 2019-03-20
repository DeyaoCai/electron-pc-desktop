const path = require('path')
const cprocess = require("child_process");
cprocess.exec("node app.js"); // 开代理服务器

const {
  app,
  BrowserWindow,
  Tray,
  ipcMain,
  globalShortcut
} = require('electron')


ipcMain.on("min-win",function () {
  mainWindow.minimize();
});
ipcMain.on("full-win",function () {
  mainWindow.maximize();
});
ipcMain.on("res-win",function () {
  mainWindow.unmaximize();
});
ipcMain.on("openDevTools",function () {
  mainWindow.webContents.openDevTools();
});
let mainWindow = null

function initialize (url) {
  function createWindow () {
    const windowOptions = {
      width: 1920,
      minWidth: 680,
      height: 1080,
      title: "hellow world!",
      frame: false,
      titleBarStyle: 'customButtonsOnHover',
      transparent: true,
    };


    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.webContents.openDevTools();
    // const child = new BrowserWindow({parent: mainWindow, modal: true, show: false})
    // child.show();__dirname
    // child.loadURL(`file://${}/index.html`);
    mainWindow.show();

    // mainWindow.loadURL(`http://vuc.cn:8889`);
    mainWindow.loadURL(url);
    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
      app.quit()
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}
// initialize(`http://localhost:4200/`);

initialize(`file://${__dirname}/index.html`);
