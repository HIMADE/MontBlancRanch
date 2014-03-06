var acs = require('/lib/ACS');
function CreateGenreDetailWindow(_genre){
	
	var self = Titanium.UI.createWindow({
		title : _genre,
		backgroundColor : '#fff'
	}); 
	
	//Get Locations to populate main table.
	acs.GetLocations(_genre, CreateTableCb);
	function CreateTableCb(_data) {
		var tableView = Ti.UI.createTableView({
			data : _data || [{
				'title' : 'Data Unavailable'
			}]
		});
		//Add Event listener for table view.
		tableView.addEventListener('click', function(e) {
			var PlaceDetail = require('/ui/common/PlacesDetail');
			var placeDetail = new PlaceDetail(e.rowData.model);
			self.containingTab.open(placeDetail);
		});
		self.add(tableView);
	};//CreateTableCb
	
	return self;
};

module.exports = CreateGenreDetailWindow;