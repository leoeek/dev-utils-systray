import { app, BrowserWindow, Menu, nativeImage, Tray } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { iconBase64 } from './icon.js';
import process from 'process';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This is a custom property to manage the quitting state of the app.
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
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 768,
    show: true, // Show the window on start as requested
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the correct content for dev vs. prod
  if (!app.isPackaged) {
    // In development, load from the Vite dev server
    mainWindow.loadURL('http://localhost:5173');
    // Optionally open dev tools
    // mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built index.html
    mainWindow.loadFile(path.join(__dirname, '..', 'build', 'index.html'));
  }

  // When the user tries to close the window, hide it instead of quitting.
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
    { label: 'Exibir/Esconder o Gerador Dev', click: toggleWindow },
    { type: 'separator' },
    {
      label: 'Encerrar',
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
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
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
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q.
  // We do nothing here to keep the app running.
  if (process.platform !== 'darwin') {
    // app.quit(); // This is the default behavior, but we override it for a tray app.
  }
});