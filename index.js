const electron = require('electron');
const {app, BrowserWindow, Menu,ipcMain} = electron;

//another way to import components of electron
/*
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
*/


let mainWindow;
let addWindow;



app.on('ready',()=>
{
	//console.log('app is ready');

	mainWindow = new BrowserWindow({});
	mainWindow.loadURL('file://' + __dirname + '/main.html');
	mainWindow.on('closed',()=>app.quit());

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);

});


//addWindow
function createAddWindow()
{
	addWindow = new BrowserWindow({
		width: 400, 
		height: 150,
		title: 'Add New Todo'
		// ,frame: false 
	});
	
	addWindow.setMenu(null);

	// addWindow.on('close', function () {
	// 	if (!addWindow) return;
	// 	addWindow = null;
	// })

	addWindow.on('blur', ()=>addWindow.close());
	addWindow.on('closed',()=>addWindow = null);

	addWindow.loadURL('file://' + __dirname + '/add.html');
}

ipcMain.on('todo:add', (event, todo)=>
{
	if (todo === "")
	{
		return;
	}

	mainWindow.webContents.send('todo:add', todo);
	addWindow.close();
}
);

let menuTemplate = 
[
	{
	label: 'File',
	submenu:
	[
		{
			label: 'New Todo',
			accelerator: 'CmdOrCtrl+N',
			click() {createAddWindow();}
		},
		{
			label: 'Clear All Todos',
			accelerator: 'Shift+CmdOrCtrl+C',
			click() {clearAll();}
		},
		{
			label: 'Quit',
			accelerator: 'CmdOrCtrl+Q',
			click() {app.quit();}
		}
	]
	}
];

function clearAll()
{
	mainWindow.webContents.send('todo:clear');
}

//another way of doing accelerator
/*
accelerator: (()=>
{
	if (process.platform === 'darwin')
	{
		return 'Command+Q';
	}
	else
	{
		return 'Ctrl+Q';
	}
}
)(),
--OR
accelerator: process.platform === 'darwin' ? 'Command+Q':'Ctrl+Q',
*/

//if OSX/macOS
if (process.platform === 'darwin')
{
	//shift menu over by 1
	menuTemplate.unshift({});
}

//ENVIRONMENTS
/*
production
development
staging
test
*/
if (process.env.NODE_ENV !== 'production')
{
	menuTemplate.push
	({
		label: 'DEVELOPER!',
		submenu: 
		[
			{role:'reload'},
			// {
			// label: 'Reload',
			// accelerator: 'CmdOrCtrl+R',
			// click: function (item, focusedWindow) 
			// 	{
			// 	if (focusedWindow) 
			// 	{
			// 		// on reload, start fresh and close any old
			// 		// open secondary windows
			// 		if (focusedWindow.id === 1) {
			// 		BrowserWindow.getAllWindows().forEach(function (win) {
			// 			if (win.id > 1) {
			// 			win.close()
			// 			}
			// 		})
			// 		}
			// 		focusedWindow.reload()
			// 	}
			// 	}
			// }, 
			{
			label: 'Toggle Full Screen',
			accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
			click: function (item, focusedWindow) 
			{
				if (focusedWindow) 
				{
					focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
				}
			}
			}, 
			{
			label: 'Toggle Developer Tools',
			accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
			click: function (item, focusedWindow) 
			{
				if (focusedWindow) {
					focusedWindow.toggleDevTools()
				}
			}
			}, 
			{
			type: 'separator'
			}, 
			{
			label: 'About Todo',
			click: function (item, focusedWindow) 
			{
				if (focusedWindow) 
				{
					const options = 
					{
						type: 'info',
						title: 'about Todo',
						buttons: ['Ok'],
						message: 'Just a basic todo app.'
					}
					electron.dialog.showMessageBox(focusedWindow, options, function () {})
				}
			}
		}]
	});
}

