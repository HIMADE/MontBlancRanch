//This constructor will return the window for the place detail when clicked from the table view.

function CreatePlacesDetailWindow(_place){
	//--Main Window--
	alert(_place.reviews.length);
	//Create the main window that will be returned by the constructor.
	var self = Ti.UI.createWindow({
		title: _place.name
	});
	
	var scrollView = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		contentHeight: 'auto',
		contentWidth: 'auto',
		layout: 'vertical'
	});
	
	//This is a temporary lable to store the JSON parameters during development.
	var imageView = Ti.UI.createImageView({
		width: Ti.UI.FILL,
		height: 100,
		width: 100,
		left: 5,
		image: _place.image_url
	});
	
	//Add the temporary label to the window!
	scrollView.add(imageView);
	
	///////--ADD REVIEW DATA HERE---///////
	
	var reviewView = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE
	});
	
	scrollView.add(reviewView);
	
	var headerLabel = Ti.UI.createLabel({
		top: 0,
		width: Ti.UI.FILL,
		height: '30dp',
		font:{
		},
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		text: '  Reviews',
		backgroundColor: 'red'
	});
	
	reviewView.add(headerLabel);
	
	var reviewImage = Ti.UI.createImageView({
		image: _place.reviews[0].user.image_url,
		width: 50,
		height: 50,
		left: 5,
		top: 35
	});
	
	reviewView.add(reviewImage);
	
	var reviewDescriptionLabel = Ti.UI.createLabel({
		text: _place.reviews[0].excerpt,
		left: 60,
		right: 5,
		top: 35,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		font:{ fontSize: '12dp'},
	});
	
	reviewView.add(reviewDescriptionLabel);
	
	var ratingImage = Ti.UI.createImageView({
		top: 90,
		image: _place.reviews[0].rating_image_small_url,
		width: 50,
		height: 10,
		left: 5,
	});
	
	reviewView.add(ratingImage);
	
	///
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
			Ti.Platform.openURL('tel:' + _place.phone);
		});
		//Add Button to main window
		scrollView.add(callButton); 

	}else{
		var phoneNumberLabel = Ti.UI.createLabel({
			text: _place.phone
		});
		scrollView.add(phoneNumberLabel);
	}
	// endof iPhone Check
	
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
		scrollView.add(websiteButton);

	}// endof Web Site Check
	
	
	//-- Directions Button --	
	var directionsButton = Ti.UI.createButton({
		width: Ti.UI.SIZE,
		height: '45dp',
		title: 'Get Directions'
	});
	
	directionsButton.addEventListener('click',function(){
		var encodedDestination = Ti.Network.encodeURIComponent(_place.location.display_address);
		Ti.Platform.openURL((Ti.Platform.osname == 'android') ? 'http://maps.google.com/?daddr=':'http://maps.apple.com/?daddr=' + encodedDestination);
	});
	
	scrollView.add(directionsButton);
	
	//Remove label from memory once window is closed!
	self.addEventListener('close',function(){
		label = null;
	});
	
	self.add(scrollView);
	
	//return the label to caller.
	return self;
	
}

module.exports = CreatePlacesDetailWindow;
