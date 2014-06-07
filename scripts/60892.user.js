// ==UserScript==
// @name           Personal Avarage Tweets per Day
// @namespace      Made by jeffreyk
// @description    Show an average tweets per day on Twitter profile, but now on your homepage
// @include        http://twitter.com/
// @include        https://twitter.com/
// @version        0.1
// ==/UserScript==


(function($){
$.getJSON("http://followcost.com/" + document.getElementById('me_name').innerHTML + ".json?callback=?", function(json){
	var wholeperiod = round(json.average_tweets_per_day || 0, 2) || "?";

	document.getElementById('me_tweets').innerHTML = document.getElementById('me_tweets').innerHTML + ' | ' + wholeperiod + ' per day'
});

function round (num, precision){
	precision = Math.pow(10, precision || 0);
	return Math.round(num * precision) / precision
}

})(this.unsafeWindow.jQuery)