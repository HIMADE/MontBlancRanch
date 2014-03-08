// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var Yelp = require('/lib/yelp');
var yelp = new Yelp();



//
// create base UI tab and root window
//
Ti.UI.backgroundColor = 'white';

var SectionWindow = require('/ui/handheld/SectionWindow');
var diningWindow = new SectionWindow('Dining');
var tab1 = Titanium.UI.createTab({  
    icon:'125-food.png',
    title:'Dining',
    window: diningWindow
});

diningWindow.containingTab = tab1;
//
// create controls tab and root window
//
var activitiesWindow = new SectionWindow('Activities');
var tab2 = Titanium.UI.createTab({  
    icon:'63-runner.png',
    title:'Activites',
    window:activitiesWindow
});

activitiesWindow.containingTab = tab2;
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();

