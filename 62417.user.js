// ==UserScript==
// @name           Short URL maker.
// @namespace      #aVg
// @description    Create short urls from the Greasemonkey menu. Currently only supports tinyURL and bit.ly.
// @include        *
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var services = {
	"TinyURL" : function() {
		get("http://tinyurl.com/api-create.php?url=", function(A) {
			A = A.responseText;
			prompt("Here is your "+A.length+" character TinyURL:", A);
		});
	},
	"bit.ly" : function() {
		get("http://api.bit.ly/shorten?version=2.0.1&login=bitlyapidemo&apiKey=R_0da49e0a9118ff35f52f629d2d71bf07&longUrl=", function(A) {
			if(A.responseText.match(/"hash": "([^"]+)/)) prompt("Here's a "+(RegExp.$1.length + 14)+" character bit.ly url:", "http://bit.ly/"+RegExp.$1);
			else alert("Error retrieving bit.ly url!");
		});
	},
	"tinyarro" : function() {
		get("http://tinyarro.ws/api-create.php?utfpure=1&url=", function(A) {
			A = A.responseText;
			prompt("Here is your "+A.length+" character tinyarro:", A);
		});
	}
};

function get(u, o) {
	GM_xmlhttpRequest({url :  u + encodeURIComponent(location.href), onload : o, method : "GET"});
}

for(var s in services) GM_registerMenuCommand("Shorten via " + s, services[s]);