function CreateInstructionsDetailWindow(_instruction){
	var self = Ti.UI.createWindow({
		backgroundColor:'white'
	});
	
	self.webview = Ti.UI.createWebView({
		html: _instruction.details
	});
	
	self.add(self.webview);
	
	return self;
	
}

module.exports = CreateInstructionsDetailWindow;
