//This constructor will return the window for the place detail when clicked from the table view.

function CreatePlacesDetailWindow(_place){
	//--Main Window--
	//alert(_place.reviews.length);
	//Create the main window that will be returned by the constructor.
	var self = Ti.UI.createWindow({
		navBarHidden: true,
		backgroundImage: '/images/background.png',
		layout: 'vertical'
	});
	
	var header = Ti.UI.createView({
		height: (globals.isiOS7) ? 70 : 50
	});
	
	self.add(header);
	
	var close = Ti.UI.createLabel({
		width: 50,
		height: 50,
		bottom: 0,
		left: 0,
		font: {
			fontFamily: globals.fontAwesome,
			fontSize: 30,
		},
		text: String.fromCharCode(0xf053),
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: 'black'
	});
	
	var sectionLabel = Ti.UI.createLabel({
		text: 'Business Details',
		font: {
			fontSize: 18,
			fontWeight: 'bold'
		},
		bottom: 0,
		height: 50,
		left: 55,
		color: 'black'
	});
	
	var yelpLogo = Ti.UI.createImageView({
		height: 25,
		height: 50,
		right: 5,
		bottom: 5,
		image: '/images/yelp_logo_50x25.png'
	});
	
	header.add(yelpLogo);
	
	var pxBorder = Ti.UI.createView({
		height: 1,
		width: Ti.UI.FILL,
		backgroundColor:'black',
		bottom: 0
	});
	
	header.add(pxBorder);
	
	header.add(sectionLabel);
	
	close.addEventListener('click',function(){
		self.close();
	});
	
	header.add(close);
	
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
			
			var placeLabel = Ti.UI.createLabel({
						width: Ti.UI.FILL,
						height: 30,
						text: ' '+ _place.name,
						font: {	fontSize: '17dp',
								fontWeight: 'bold'
							},
						wordWrap: true,
						color:'white',
						backgroundColor: 'black'
					});
					
			scrollView.add(placeLabel);
			
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
					image: _place.image_url,
					borderWidth: 1,
					borderColor: 'black'
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
					
					var locationLabel = Ti.UI.createLabel({
						left: 110,
						top: 2,
						height: Ti.UI.SIZE,
						width: Ti.UI.FILL,
						wordWrap: true,
						text: _place.location.display_address[0] + _place.location.display_address[1],
						font: {fontSize: '13dp'},
						color:'black'
					});
					
					info.add(locationLabel);
					
					var phoneLabel = Ti.UI.createLabel({
						left: 110,
						top: 2,
						height: Ti.UI.SIZE,
						width: Ti.UI.FILL,
						text: _place.phone,
						font: {fontSize: '13dp'},
						color:'black'
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
					backgroundColor: 'black',
					color: 'white'
				});
				
				reviewView.add(reviewsHeaderLabel);
				
				var reviewImage = Ti.UI.createImageView({
					image: _place.reviews[0].user.image_url,
					width: 50,
					height: 50,
					left: 5,
					top: 35,
					borderWidth: 1,
					borderColor: 'black'
				});
				
				reviewView.add(reviewImage);
				
				var reviewDescriptionLabel = Ti.UI.createLabel({
					text: _place.reviews[0].excerpt,
					left: 60,
					right: 5,
					top: 35,
					width: Ti.UI.FILL,
					wordWrap: true,
					height: Ti.UI.SIZE,
					font:{ fontSize: '12dp'},
					color: 'black'
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
					backgroundColor: 'black',
					color: 'white'
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
						color: 'black'
					});
					
					dealView.add(deals);
				}else{
					Ti.API.info('No Deals Detected');
					var noDeals = Ti.UI.createLabel({
						text: "No deals available",
						top: 40,
						left: 5,
						font: {fontSize: '13dp'},
						color: 'black'
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
