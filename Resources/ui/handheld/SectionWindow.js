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
		var sortedData = _data.sort(function(a, b){
			 var nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase();
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
