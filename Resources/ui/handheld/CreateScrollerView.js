function CreateScrollerView(_textLabel, _labelIcon, _detailWindow){
	var self = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	
	var innerContainer = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		layout: 'vertical'
	});
	
	innerContainer.addEventListener('click',function(){
		_detailWindow.open();
		mainViewLabel.color = 'grey';
		mainViewTextLabel.color = 'grey';
		setTimeout(function(){
			mainViewLabel.color = 'black';
			mainViewTextLabel.color = 'black';
		},1000);
	});
	
	var mainViewLabel = Ti.UI.createLabel({
		text: String.fromCharCode(_labelIcon),
		font: {
			fontFamily: globals.customFont,
			fontSize: 100
		},
		color: 'black',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	innerContainer.add(mainViewLabel);
	
	var mainViewTextLabel = Ti.UI.createLabel({
		text: _textLabel,
		font: {
			fontFamily: 'Helvetica',
			fontSize: 20
		},
		color: 'black',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	innerContainer.add(mainViewTextLabel);
	
	self.add(innerContainer);
	
	return self;
}

module.exports = CreateScrollerView;