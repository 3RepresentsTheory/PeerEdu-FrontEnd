const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

let win; // 在全局声明 BrowserWindow 实例

function createWindow() {
  // 初始化窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 确保可以使用 Node.js 模块
      contextIsolation: false, // 禁用上下文隔离
    },
  });

  win.loadFile('message_center.html'); // 加载登录页面

  // 删除默认菜单
  Menu.setApplicationMenu(null);
}

// 监听注册页面跳转事件
ipcMain.on('navigate-to-register', () => {
  if (win) {
    win.loadFile('register.html'); // 跳转到注册页面
  }
});

// 监听登录页面跳转事件
ipcMain.on('navigate-to-login', () => {
  if (win) {
    win.loadFile('login.html'); // 跳转回登录页面
  }
});

//监听“忘记页码”页面跳转事件
ipcMain.on('navigate-to-forgot-password', () => {
    if (win) {
     win.loadFile('forgot-password.html');
    }
});  

// 当应用准备就绪时创建窗口
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
