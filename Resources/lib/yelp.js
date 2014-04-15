//
// Aaron K. Saunders
//
// http://www.clearlyinnovative.com
// http://blog.clearlyinnovative.com
// @aaronksaunders
//
// SEE http://bytespider.github.com/jsOAuth/ for jsOAuth.js
//
Ti.include("/lib/jsOAuth.js");
Ti.API.info('YELP GENERAL LOADED');
	var auth = {
		// Update with your auth tokens
		consumerKey : "QuWSUTOthcIrqJPc6lyOiw",
		consumerSecret : "CY3TLYvt_Ig_vnOJALjgBFVkTW8",
		accessTokenKey : "DklsiRDxauG6X66fAX39FAA8mNTQukzF",
		accessTokenSecret : "x-g011lYBIJ8hJo7bHZQs-K6_DY",
		serviceProvider : {
			signatureMethod : "HMAC-SHA1"
		}
	};

	var oauth = OAuth(auth);

	var args = {
		params : {},
		method : "GET"
	};


exports.GetBusinesses = function(_term, _callback, _getMore, _offset){
	Ti.API.info('Get Business Called');
	var options = {
		'method' : "GET",
		'url' : 'http://api.yelp.com/v2/search?term=' + _term + '&location=Whitefish+MT',
		'data' : (args.method === 'PUT' || args.method === 'POST') ? JSON.stringify(args.params) : args.params,
		'success' : function(data) {
			_callback(JSON.parse(data));
			Ti.API.info('success - response ' + data);
			if (args.success !== undefined) {args.success(data);};
		},
		'failure' : function(data) {
			var response = JSON.stringify(data);
			Ti.API.info('failure - response ' + response);
			if (args.success !== undefined) {args.error(data);};
		}
	};
	
	if(_getMore){
		options.url = 'http://api.yelp.com/v2/search?term=' + _term + '&location=Whitefish+MT&offset=' + _offset;
	}
	// Make the request
	oauth.request(options);
};

exports.GetBusiness = function(_id, _callback){
	var options = {
		'method' : "GET",
		'url' : 'http://api.yelp.com/v2/business/' + _id ,
		'data' : (args.method === 'PUT' || args.method === 'POST') ? JSON.stringify(args.params) : args.params,
		'success' : function(data) {
			_callback(JSON.parse(data));
			Ti.API.info('success - response ' + data);
			if (args.success !== undefined) {args.success(data);};
		},
		'failure' : function(data) {
			var response = JSON.stringify(data);
			Ti.API.info('failure - response ' + response);
			if (args.success !== undefined) {args.error(data);};
		}
	};
	// Make the request
	oauth.request(options);
};
