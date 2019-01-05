const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let aboutWindow;

//listen for the app to be ready

app.on('ready', function(){

  //create new window
  mainWindow = new BrowserWindow({});

  //load html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/html/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  //quit app when main window is closed

  mainWindow.on('closed', function(){
    app.quit();
  })

  //build menu from template because menu templates are fucking important genius
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //insert menu
  Menu.setApplicationMenu(mainMenu);

});

//Handle Create Add Window
/*function createAddWindow(){
  //create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Shopping List Item'
  });

  //load html into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  //garbage collection handle
  addWindow.on('close', function(){
    addWindow = null
  })

} 

//Catch Item Add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
 // addWindow.close();
});
*/

function createAboutWindow(){
  //create new window
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'About'
  });
  
    //load html into window
    aboutWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/html/aboutWindow.html'),
        protocol: 'file:',
        slashes: true
      }));
    
      //garbage collection handle
      aboutWindow.on('close', function(){
        aboutWindow = null
      })
}


//create menu template

const mainMenuTemplate = [

  {
    label:'File',
    submenu:[

      {
        label: 'Colour Blind Mode'
      },
      {
        label:'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit(); 
        }

      }
    ]
  }
];

//if mac add empty object to menu

if(process.platform == 'darwin'){
  const name = app.getName()
  mainMenuTemplate.unshift({
        label:name,
        submenu:[
            {
                label:'About',
                click(){
                    createAboutWindow();
                }
            }
        ]
    
      })
} 
//if Win32 or Linux should add the about menu to the File submenu
else if (process.platform !== 'darwin'){
    mainMenuTemplate[0].submenu.push({
        label:'About',
        click(){
            createAboutWindow();
        }
    });
}


//Add Developer Tools Item if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle Dev Tools',
        accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}