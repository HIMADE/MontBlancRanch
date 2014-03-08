//
// Aaron K. Saunders
//
// http://www.clearlyinnovative.com
// http://blog.clearlyinnovative.com
// @aaronksaunders
//
// SEE http://bytespider.github.com/jsOAuth/ for jsOAuth.js
//
function EstablishYelp(){
Ti.API.info('EstablishYelp Executed');
Ti.include("/lib/jsOAuth.js");

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
var options = {
	'method' : "GET",
	//'headers' : headers,
	'url' : 'http://api.yelp.com/v2/search?term=Food&location=Whitefish+MT',
	'data' : (args.method === 'PUT' || args.method === 'POST') ? JSON.stringify(args.params) : args.params,
	'success' : function(data) {
		var response = JSON.parse(data);
		Ti.API.info('success - response ' + data);
		Ti.API.info(response.businesses.length);
		if(args.success !== undefined) {
			args.success(data);
		};
	},
	'failure' : function(data) {
		var response = JSON.stringify(data);
		Ti.API.info('failure - response ' + response);
		if(args.success !== undefined) {
			args.error(data)
		}
	}
}

// Make the request
oauth.request(options);

}

module.exports = EstablishYelp;
