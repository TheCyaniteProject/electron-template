import { app, BrowserWindow, ipcMain } from 'electron'
// include the Node.js 'path' module at the top of your file
import { join } from 'node:path'
import Debug from './debug.js'

const debug = new Debug();

// modify your existing createWindow() function
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        transparent: true,
        frame: false,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');
};

ipcMain.on('minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.minimize();
});
ipcMain.on('close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.close();
});
ipcMain.on('open-devtools', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) win.webContents.openDevTools();
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});