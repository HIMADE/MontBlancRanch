function CreateGenreTVR(_place){
	var self = Ti.UI.createTableViewRow({
		width: Ti.UI.FILL,
		height: 75,
		className: 'business',
		business: _place,
		id: _place.id
	});
	
	var imageView = Ti.UI.createImageView({
		height: 75,
		width: 75,
		left: 0,
		image: _place.image_url
	});
	
	self.add(imageView);
	
	var businessName = Ti.UI.createLabel({
		text: _place.name,
		left: 80,
		width: Ti.UI.FILL,
		wordWrap:false,
		top: 10,
		font: {
			fontSize: 16,
			fontWeight: 'bold'
		}
	});
	
	self.add(businessName);
	
	var ratingImageContainer = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.SIZE,
		right: 0,
		left: 80,
		top: 30
	});
	
	self.add(ratingImageContainer);
	
	var ratingImage = Ti.UI.createImageView({
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		image: _place.rating_img_url
	});
	
	ratingImageContainer.add(ratingImage);
	
	return self;
	
}

module.exports = CreateGenreTVR;
