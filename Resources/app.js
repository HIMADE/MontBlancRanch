// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();



//
// create base UI tab and root window
//
Ti.UI.backgroundColor = 'white';

var DiningWindow = require('/ui/handheld/DiningWindow');
var diningWindow = new DiningWindow();
var tab1 = Titanium.UI.createTab({  
    icon:'125-food.png',
    title:'Dining',
    window: diningWindow
});

diningWindow.containingTab = tab1;
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
