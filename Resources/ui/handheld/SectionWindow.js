//Constructor for the sections Window
var acs = require('/lib/ACS');

function CreateSectionWindow(_section){
	var self = Titanium.UI.createWindow({
		title : _section,
		backgroundColor : '#fff'
	}); 
	
	//Get Locations to populate main table.
	acs.GetGenres(_section,CreateTableCb);
	function CreateTableCb(_data) {
		var tableView = Ti.UI.createTableView({
			data : _data || [{
				'title' : 'Data Unavailable'
			}]
		});
		//Add Event listener for table view.
		tableView.addEventListener('click', function(e) {
			var GenreDetail = require('/ui/common/GenreDetail');
			var genreDetail = new GenreDetail(e.rowData.title);
			self.containingTab.open(genreDetail);
			genreDetail.containingTab = self.containingTab;
		});
		self.add(tableView);
	};//CreateTableCb

	
	
	return self;

};//End Main Function

module.exports = CreateSectionWindow;
