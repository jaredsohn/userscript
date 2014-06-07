// ==UserScript==
// @name          TwibsTest
// @namespace     http://www.twibs.com
// @description   See what people are saying about a webpage on twitter
// @author        Peter Denton, Chad Etzel
// @homepage      http://www.twibs.com
// @include       *
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	
var pageTitle=document.title;

function jtw_urlencode(str) {
str = escape(str);

str = str.replace(/\+/g, '%2B');
str = str.replace(/%20/g, '+');
str = str.replace(/\*/g, '%2A');
str = str.replace(/\//g, '%2F');
str = str.replace(/@/g, '%40');
str = str.replace(/#/g, '%23');
return str;
}


function jsonp_proxy(url, callback)
{
	$.getJSON(url,
			function(data){
				//window.alert(arr.length);
				callback(data);
			});

}

function do_search(search, lastid, callback)
{
	twitter_search_proxy(jtw_urlencode(search), lastid, callback);
}

function twitter_search_proxy(search, lastid, callback)
{
	//search should already be url encoded
	var url;
	var since_str = "";
	var rpp = 10;
	var lang = 'all';

	if (lastid > 0) {
		since_str = "&since_id=" + lastid + "";
	}
	url = "http://search.twitter.com/search.json?q=" + search + since_str + "&rpp=" + rpp + "&lang=" + lang + "&callback=?"
	jsonp_proxy(url, callback);
}



function mycallback(arr)
{
	if (arr.results.length > 0) {
		lastid = arr.results[0].id;
		for (var i = 0; i < arr.results.length; i++) {
			var user =   arr.results[i].from_user;
			var tweet =  arr.results[i].text;
			var tstamp = arr.results[i].created_at;
          tstamp = new Date(tstamp);
          tstamp = tstamp.toLocaleString();
			var img =    arr.results[i].profile_image_url;
			var tid =    arr.results[i].id;
			$("#results").prepend("<img src="+img+" />" + user + ": " + tweet + " (" + tstamp + ")<p>");
		} // end for
	} else {
		$('#results').append("no results");
	}
}

$('document').ready(function() {
	do_search(pageTitle, 0, mycallback);
});

var logox = document.createElement("div");
logox.innerHTML = '<div id="results" style="width:250px;height:500px;overflow:scroll;position: absolute; z-index : 10000;top:20%;right:0;margin: 0 auto 0 auto; ' +
    'border: 2px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #fff; ' +
    'color: #000;"></div>';
document.body.insertBefore(logox, document.body.firstChild);

window.setTimeout(function(){do_search(pageTitle, 0, mycallback);}, 5000);


}