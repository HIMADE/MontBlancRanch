//Constructor for the sections Window
var acs = require('/lib/ACS');

function CreateSectionWindow(_section){
	var self = Titanium.UI.createWindow({
		title : _section,
		navBarHidden: true,
		layout: 'vertical',
		backgroundImage: '/images/background.png'
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
			fontFamily: globals.customFont,
			fontSize: 30,
		},
		text: String.fromCharCode(0xe681),
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: 'black'
	});
	
	var sectionLabel = Ti.UI.createLabel({
		text: _section,
		font: {
			fontSize: 18,
			fontWeight: 'bold'
		},
		bottom: 0,
		height: 50,
		left: 55,
		color: 'black'
	});
	
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
	
	//Get Locations to populate main table.
	acs.GetGenres(_section,CreateTableCb);
	function CreateTableCb(_data) {
		var sortedData = _data.sort(function(a, b){
			 var nameA=a.rowtitle.toLowerCase(), nameB=b.rowtitle.toLowerCase();
			 if (nameA < nameB){ //sort string ascending
			  return -1;
			 }else if(nameA > nameB){
			  return 1;
			}else{
			 return 0; //default return value (no sorting)
			};
		});
		var tableView = Ti.UI.createTableView({
			data : sortedData || [{
				'title' : 'Data Unavailable'
			}],
			height: Ti.UI.FILL
		});
		//Add Event listener for table view.
		tableView.addEventListener('click', function(e) {
			var GenreDetail = require('/ui/common/GenreDetail');
			var genreDetail = new GenreDetail(e.rowData.rowtitle);
			genreDetail.open();
		});
		self.add(tableView);
	};//CreateTableCb

	
	
	return self;

};//End Main Function

module.exports = CreateSectionWindow;
