//Constructor for the Dining Tab Window
var acs = require('/lib/ACS');

function CreateDiningWindow(_tab){
	var self = Titanium.UI.createWindow({
		title : 'Dining',
		backgroundColor : '#fff'
	}); 
	
	//Get Locations to populate main table.
	acs.GetGenres(CreateTableCb);
	function CreateTableCb(_data) {
		var tableView = Ti.UI.createTableView({
			data : _data || [{
				'title' : 'Data Unavailable'
			}]
		});
		//Add Event listener for table view.
		tableView.addEventListener('click', function(e) {
			var GenreDetail = require('/ui/common/GenreDetail');
			var genreDetail = new GenreDetail(e.rowData.title, _tab);
			self.containingTab.open(genreDetail);
			genreDetail.containingTab = self.containingTab;
		});
		self.add(tableView);
	};//CreateTableCb

	
	
	return self;

};//End Main Function

module.exports = CreateDiningWindow;
