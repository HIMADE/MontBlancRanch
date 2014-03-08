//This constructor will return the window for the place detail when clicked from the table view.

function CreatePlacesDetailWindow(_place){
	//--Main Window--
	
	//Create the main window that will be returned by the constructor.
	var self = Ti.UI.createWindow({
		title: _place.name,
		layout: 'vertical'
	});
	
	//This is a temporary lable to store the JSON parameters during development.
	var label = Ti.UI.createLabel({
		text: JSON.stringify(_place)
	});
	
	//Add the temporary label to the window!
	self.add(label);
	
	//----Call Button---
	//Check if user is on an iPhone Device with dialer capabilities
	if(Ti.Platform.name === 'iPhone OS' || Ti.Platform.osname == 'android'){
	
		//Create Phone Dialer Button
		var callButton = Ti.UI.createButton({
			width : Ti.UI.SIZE,
			height : '45dp',
			title : 'Call Business'
		});
		//Add Button Click Event Listener
		callButton.addEventListener('click', function() {
			Ti.Platform.openURL('tel:' + _place.phone_number);
		});
		//Add Button to main window
		self.add(callButton); 

	}// endof iPhone Check
	
	//--Web Site Button--
	//Create Website Button if website present
	if(_place.website != null){
		//Create Website Button
		var websiteButton = Ti.UI.createButton({
			width :Ti.UI.SIZE,
			height : '45dp',
			title : 'View Web Site'
		});
		//Add Website Button Event Listener
		websiteButton.addEventListener('click', function() {
			Ti.Platform.openURL('http://' + _place.website);
		});
		//Add Button to main window
		self.add(websiteButton);

	}// endof Web Site Check
	
	
	//-- Directions Button --	
	var directionsButton = Ti.UI.createButton({
		width: Ti.UI.SIZE,
		height: '45dp',
		title: 'Get Directions'
	});
	
	directionsButton.addEventListener('click',function(){
		var encodedDestination = Ti.Network.encodeURIComponent(_place.address);
		Ti.Platform.openURL((Ti.Platform.osname == 'android') ? 'http://maps.google.com/?daddr=':'http://maps.apple.com/?daddr=' + encodedDestination);
	});
	
	self.add(directionsButton);
	
	//Remove label from memory once window is closed!
	self.addEventListener('close',function(){
		label = null;
	});
	
	//return the label to caller.
	return self;
	
}

module.exports = CreatePlacesDetailWindow;
