//This file is for communicating with the Appcelerator Cloud Services Platform
var Cloud = require('ti.cloud');
var GenreTVR = require('/ui/common/GenreTVR');

exports.GetInstructions = function(_cb){
	Cloud.Objects.query({
		classname : 'Instructions',
	}, function (e) {
	    if (e.success) {
	        Ti.API.info('Success:\n' +
	            'Count: ' + e.Instructions.length);
	            var data = [];
	        for (var i = 0; i < e.Instructions.length; i++) {
	            var instruction = e.Instructions[i];
	            Ti.API.info(JSON.stringify(instruction));
	            var row = {title:instruction.title, object: instruction};
	        	data.push(row);
	        }
	        _cb(data);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};

exports.GetLocations = function(_genre, _cb){
	Cloud.Places.query({
    page: 1,
    per_page: 20,
    where: {
    		tags_array: _genre
    	}
}, function (e) {
    if (e.success) {
        Ti.API.info('Success:\n' +
            'Count: ' + e.places.length);
            var data = [];
        for (var i = 0; i < e.places.length; i++) {
            var place = e.places[i];
            Ti.API.info(JSON.stringify(place));
            var row = GenreTVR(place);
        		data.push(row);
        }
        _cb(data);
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
	
};

exports.GetGenres = function(_section,_cb){
	//Get Genres from ACS
	Cloud.Objects.query({
		classname : 'genre',
		where:{'tags_array':_section}
	}, function(e) {
		if (e.success) {
			var data = [];
			Ti.API.info('Success:\n' + 'Count: ' + e.genre.length);
			for (var i = 0; i < e.genre.length; i++) {
				var genre = e.genre[i];
				var tvr = Ti.UI.createTableViewRow({
					id: genre.id,
					hasChild: (globals.isAndroid)? false:true,
					height: 50,
					width: Ti.UI.FILL,
					rowtitle: genre.title
				});
				
				var tvrLabel = Ti.UI.createLabel({
					text: genre.title,
					font: {
						fontSize: 18
					},
					left: 20,
					color: 'black'
				});
				
				tvr.add(tvrLabel);
				data.push(tvr);
			}
			_cb(data);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	}); 

	return [{'title':'Breakfast'}];
};
