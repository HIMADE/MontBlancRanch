function CreateInstructionsWindow(_sectionLabel){
	var self = Ti.UI.createWindow({
		navBarHidden: true,
		layout: 'vertical',
	});
	
	globals.ACS.GetInstructions(PopulateTable);
	
	self.tableView = Ti.UI.createTableView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	});
	
	self.header = Ti.UI.createView({
		height: (globals.isiOS7) ? 70 : 50
	});
	
	self.add(self.header);
	
	self.header.close = Ti.UI.createLabel({
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
	
	self.header.add(self.header.close);
	
	self.header.close.addEventListener('click',function(){
		self.close();
	});
	
	self.header.sectionLabel = Ti.UI.createLabel({
		text: _sectionLabel,
		font: {
			fontSize: 18,
			fontWeight: 'bold'
		},
		bottom: 0,
		height: 50,
		left: 55,
		color: 'black'
	});
	
	self.header.add(self.header.sectionLabel);
	
	self.header.pxBorder = Ti.UI.createView({
		height: 1,
		width: Ti.UI.FILL,
		backgroundColor:'black',
		bottom: 0
	});
	
	self.header.add(self.header.pxBorder);
	
	function PopulateTable(_data){
		self.tableView.data = _data;
	};
	
	self.tableView.addEventListener('click',function(evt){
		var InstructionDetailWindow = require('/ui/handheld/InstructionsDetailWindow');
		var instructionDetailWindow = new InstructionDetailWindow(evt.row.object);
		instructionDetailWindow.open();
	});
	
	self.add(self.tableView);
	
	return self;
};

module.exports = CreateInstructionsWindow;
