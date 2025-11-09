import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { iconBase64 } from './icon.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

declare global {
  namespace Electron {
    interface App {
      isQuitting?: boolean;
    }
  }
}

let mainWindow: BrowserWindow | null;
let tray: Tray | null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 600,
    show: true, // Show the window on start as requested
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'build', 'index.html'));
  }

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow?.hide();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const createTray = (): void => {
  const icon = nativeImage.createFromDataURL(iconBase64);
  tray = new Tray(icon);

  const toggleWindow = (): void => {
    if (mainWindow) {
        if (mainWindow.isVisible() && mainWindow.isFocused()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    }
  };

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show/Hide Gerador Dev', click: toggleWindow },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setToolTip('Gerador Dev');
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWindow);
};

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (!mainWindow) {
        createWindow();
      }
      mainWindow?.show();
    }
  });
});

app.on('before-quit', () => {
  app.isQuitting = true;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // app.quit();
  }
});