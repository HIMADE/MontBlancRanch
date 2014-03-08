//This file is for communicating with the Appcelerator Cloud Services Platform
var Cloud = require('ti.cloud');

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
            var row = {'id':place.id,'title': place.name, 'model': place };
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
				data.push({'id': genre.id, 'title': genre.title, 'hasChild':true});
			}
			_cb(data);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	}); 

	return [{'title':'Breakfast'}];
};
