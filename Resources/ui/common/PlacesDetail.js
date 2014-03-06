//This constructor will return the window for the place detail when clicked from the table view.

function CreatePlacesDetailWindow(_place){
	//Create the main window that will be returned by the constructor.
	var self = Ti.UI.createWindow({
		title: _place.name
	});
	//This is a temporary lable to store the JSON parameters during development.
	var label = Ti.UI.createLabel({
		text: JSON.stringify(_place)
	});
	//Add the temporary label to the window!
	self.add(label);
	
	//Remove label from memory once window is closed!
	self.addEventListener('close',function(){
		label = null;
	});
	
	//return the label to caller.
	return self;
	
}

module.exports = CreatePlacesDetailWindow;
