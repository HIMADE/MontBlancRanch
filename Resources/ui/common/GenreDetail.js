
function CreateGenreDetailWindow(_genre){
	var Yelp = require('/lib/yelp');
	var GenreTVR = require('/ui/common/GenreTVR');
	
	var self = Titanium.UI.createWindow({
		backgroundImage: '/images/background.png',
		layout: 'vertical',
		navBarHidden: true
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
		text: _genre,
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
	
	var tableView = Ti.UI.createTableView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	
	
	
	tableView.addEventListener('click', function(_e) {
			Yelp.GetBusiness(_e.rowData.id, function(_data){
				var PlaceDetail = require('/ui/common/PlacesDetail');
				//Add Event listener for table view.
				var placeDetail = new PlaceDetail(_data);
				placeDetail.open();
			});
	});
	self.add(tableView);
	
	//Get Locations to populate main table.
	
   function CreateTableCb(e){
		for (var i = 0; i < e.businesses.length; i++) {
			var business = e.businesses[i];
			Ti.API.info(JSON.stringify(business));
			var row = new GenreTVR(business);
			tableView.appendRow(row);
			if(i == e.businesses.length){
				activityIndicator.hide();
			}
		};
		
	};//CreateTableCb

	Yelp.GetBusinesses(_genre, CreateTableCb);
	(_genre, CreateTableCb);
	
	var style;
	if (Ti.Platform.name === 'iPhone OS'){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}else {
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	
	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: 'green',
	  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
	  message: 'Loading...',
	  style:style,
	  top:10,
	  left:10,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	
	self.add(activityIndicator);
	activityIndicator.show();
	
	return self;
};

module.exports = CreateGenreDetailWindow;