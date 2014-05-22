var globals = {
	isAndroid: (Ti.Platform.osname == 'android') ? true : false,
	customFont: 'Pe-icon-7-stroke'
};

(function(){
var isiOS7;
var version = Titanium.Platform.version.split(".");
var major = parseInt(version[0]);
if (major == 7 && (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad')) {
	isiOS7 = true;
} else {
	isiOS7 = false;
}// iOS 6
globals.isiOS7 = isiOS7;

var win = Ti.UI.createWindow({
	navBarHidden: true,
	backgroundColor: 'white',
	backgroundImage: '/images/background.png'
});

var mainWindow = Ti.UI.createView({
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
});

var logo = Ti.UI.createImageView({
	image: '/images/logo_03.png',
	width: '80%'
});

var swipeLabel = Ti.UI.createLabel({
	text: '< Swipe To View>',
	bottom: 20,
	font: {
		fontFamily: 'Arial',
		fontSize: 14
	},
	color:'black'
});

mainWindow.add(swipeLabel);

mainWindow.add(logo);

var CreateScrollerView = require('/ui/handheld/CreateScrollerView');
var SectionWindow = require('/ui/handheld/SectionWindow');

var activitiesWindow = new SectionWindow('Activities');
var activities = new CreateScrollerView('Activities', 0xe676, activitiesWindow);

var diningWindow = new SectionWindow('Dining');
var dining = new CreateScrollerView('Drinks & Dining', 0xe669, diningWindow);

var entertainmentWindow = new SectionWindow('Entertainment');
var entertainment = new CreateScrollerView('Entertainment', 0xe6a4, entertainmentWindow);

var scroller = Ti.UI.createScrollableView({
	views: [mainWindow, activities, dining, entertainment],
	scrollingEnabled: true,
	showPagingControl: true,
	pagingControlAlpha: 0.2,
	pagingControlColor: 'black',
	tintColor: 'black'
});
	
	win.add(scroller);
/*
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	barColor:'white'
});
//
// create base UI tab and root window
//
Ti.UI.backgroundColor = 'white';


var tab1 = Titanium.UI.createTab({  
    icon:'125-food.png',
    title:'Dining',
    window: diningWindow
});

diningWindow.containingTab = tab1;
//
// create controls tab and root window
//

var tab2 = Titanium.UI.createTab({  
    icon:'63-runner.png',
    title:'Activites',
    window: activitiesWindow
});

activitiesWindow.containingTab = tab2;


var tab3 = Titanium.UI.createTab({  
    icon:'63-runner.png',
    title:'Entertainment',
    window: entertainmentWindow
});

entertainmentWindow.containingTab = tab3;
//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
// open tab group
tabGroup.open();
*/

win.open();
})();