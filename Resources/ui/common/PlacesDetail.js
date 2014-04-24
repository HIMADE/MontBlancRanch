//This constructor will return the window for the place detail when clicked from the table view.

function CreatePlacesDetailWindow(_place){
	//--Main Window--
	alert(_place.reviews.length);
	//Create the main window that will be returned by the constructor.
	var self = Ti.UI.createWindow({
		title: _place.name
	});
	
		var mainView = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.FILL
		});
	
			var scrollView = Ti.UI.createScrollView({
				height: Ti.UI.FILL,
				width: Ti.UI.FILL,
				top: 0,
				contentHeight: 'auto',
				contentWidth: 'auto',
				layout: 'vertical',
				scrollType: 'vertical',
			});
			
			mainView.add(scrollView);
		
		//This is a temporary lable to store the JSON parameters during development.
		
			var infoView = Ti.UI.createView({
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
			});
			
			scrollView.add(infoView);
				
				var imageView = Ti.UI.createImageView({
					width: Ti.UI.FILL,
					height: 100,
					width: 100,
					left: 5,
					top: 5,
					bottom: 5,
					image: _place.image_url
				});
				
				//Add the temporary label to the window!
				infoView.add(imageView);
		
				var info = Ti.UI.createView({
					top: 0,
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE,
					layout:'vertical'
				});
				
				infoView.add(info);
		
					var placeLabel = Ti.UI.createLabel({
						left: 110,
						top: 2,
						width: Ti.UI.FILL,
						height: Ti.UI.SIZE,
						text: _place.name,
						font: {fontSize: '17dp'},
					});
					
					info.add(placeLabel);
					
					var locationLabel = Ti.UI.createLabel({
						left: 110,
						top: 2,
						height: Ti.UI.SIZE,
						width: Ti.UI.FILL,
						text: _place.location.display_address[0] + _place.location.display_address[1],
						font: {fontSize: '13dp'},
					});
					
					info.add(locationLabel);
					
					var phoneLabel = Ti.UI.createLabel({
						left: 110,
						top: 2,
						height: Ti.UI.SIZE,
						width: Ti.UI.FILL,
						text: _place.phone,
						font: {fontSize: '13dp'},
					});
					
					info.add(phoneLabel);
		///////--ADD REVIEW DATA HERE---///////
		
			var reviewView = Ti.UI.createView({
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE
			});
			
			scrollView.add(reviewView);
		
				var reviewsHeaderLabel = Ti.UI.createLabel({
					top: 0,
					width: Ti.UI.FILL,
					height: '30dp',
					font:{ fontSize: '16dp'
					},
					textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
					text: '  Customer Reviews',
					backgroundColor: 'red'
				});
				
				reviewView.add(reviewsHeaderLabel);
				
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
	
			var dealView = Ti.UI.createView({
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
			});
			
			scrollView.add(dealView);
	
				var dealsHeaderlabel = Ti.UI.createLabel({
					top: 5,
					width: Ti.UI.FILL,
					height: '30dp',
					font:{ fontSize: '16dp'
					},
					textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
					text: '  Deals',
					backgroundColor: 'red'
				});
				
				dealView.add(dealsHeaderlabel);
				
				if(_place.deals != null || _place.deals != undefined){
					Ti.API.info('Deals Detected');
					var deals = Ti.UI.createLabel({
						top: 40,
						text: _place.deals,
						font: {fontSize: '13dp'},
						textAlign: Ti.UI.TEXT_ALIGNEMENT_LEFT,
						left: 5,
					});
					
					dealView.add(deals);
				}else{
					Ti.API.info('No Deals Detected');
					var noDeals = Ti.UI.createLabel({
						text: "No deals available",
						top: 40,
						left: 5,
						font: {fontSize: '13dp'},
					});
					
					dealView.add(noDeals);
				}
	
		var contactView = Ti.UI.createView({
			width: Ti.UI.FILL,
			bottom: 0,
			height: Ti.UI.SIZE
		});
		
		mainView.add(contactView);
	
			///
			//----Call Button---
			//Check if user is on an iPhone Device with dialer capabilities
			if(Ti.Platform.name === 'iPhone OS' || Ti.Platform.osname == 'android'){
			
				//Create Phone Dialer Button
				var callButton = Ti.UI.createButton({
					width : Ti.UI.SIZE,
					height : '40dp',
					title : 'Call',
					left: 15,
					//bottom: 0,
				});
				//Add Button Click Event Listener
				callButton.addEventListener('click', function() {
					Ti.Platform.openURL('tel:' + _place.phone);
				});
				//Add Button to main window
				contactView.add(callButton); 
		
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
					height : '40dp',
					title : 'View Web Site',
					//bottom: 0,
				});
				//Add Website Button Event Listener
				websiteButton.addEventListener('click', function() {
					Ti.Platform.openURL('http://' + _place.website);
				});
				//Add Button to main window
				contactView.add(websiteButton);
		
			}// endof Web Site Check
			
			
			//-- Directions Button --	
			var directionsButton = Ti.UI.createButton({
				width: Ti.UI.SIZE,
				height: '40dp',
				title: 'Directions',
				right: 15,
				//bottom: 0,
			});
			
			directionsButton.addEventListener('click',function(){
				var encodedDestination = Ti.Network.encodeURIComponent(_place.location.display_address);
				Ti.Platform.openURL((Ti.Platform.osname == 'android') ? 'http://maps.google.com/?daddr=':'http://maps.apple.com/?daddr=' + encodedDestination);
			});
			
			contactView.add(directionsButton);
			
			//Remove label from memory once window is closed!
			self.addEventListener('close',function(){
				label = null;
			});
	
	self.add(mainView);
	
	//return the label to caller.
	return self;
	
}

module.exports = CreatePlacesDetailWindow;
