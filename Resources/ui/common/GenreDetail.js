
function CreateGenreDetailWindow(_genre){
	var Yelp = require('/lib/yelp');
	var GenreTVR = require('/ui/common/GenreTVR');
	
	var self = Titanium.UI.createWindow({
		title : _genre,
		backgroundColor : '#fff'
	}); 
	
	//Get Locations to populate main table.
	
   function CreateTableCb(e){
   		var dataset = [];
		for (var i = 0; i < e.businesses.length; i++) {
			var business = e.businesses[i];
			Ti.API.info(JSON.stringify(business));
			var row = GenreTVR(business);
			dataset.push(row);
		};

		var tableView = Ti.UI.createTableView({
			data : dataset
		});
		
		var PlaceDetail = require('/ui/common/PlacesDetail');
		//Add Event listener for table view.
		tableView.addEventListener('click', function(_e) {
			Yelp.GetBusiness(_e.rowData.id, function(_data){
				var placeDetail = new PlaceDetail(_data);
				self.containingTab.open(placeDetail);
			});
		});
		self.add(tableView);
	};//CreateTableCb

	Yelp.GetBusinesses(_genre, CreateTableCb);
	(_genre, CreateTableCb);
	
	return self;
};

module.exports = CreateGenreDetailWindow;