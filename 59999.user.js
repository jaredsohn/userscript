// ==UserScript==
// @name          Average Tweets per Day
// @namespace     http://exoego.net/
// @description	  Show an average tweets per day on Twitter profile
// @include       http://twitter.com/*
// @exclude       http://twitter.com/
// @version       0.1
// ==/UserScript==

(function($){

var profile = $('#profile');
var username = location.pathname.slice(1);
if (!profile || !username || username.indexOf("/")>0) return;

$.getJSON("http://followcost.com/" + username + ".json?callback=?", function(json){
	var wholeperiod = round(json.average_tweets_per_day || 0, 2) || "?";
	var last100 = round(json.average_tweets_per_day_recently || 0, 2) || "?";

	var lexicon = Lexicon();
	var markup =
		  '<li><span class="label">' + lexicon.wholeperiod + '</span> '
		+ '<a href="http://followcost.com/' + username +'" class="url">' + wholeperiod + ' tweets/day</a></li>'
		+ '<li><span class="label">' + lexicon.last100 + '</span> '
		+ '<a href="http://followcost.com/' + username +'" class="url">' + last100 + ' tweets/day</a></li>';
	profile.find('ul.about').append(markup);
});

function Lexicon (){
	var lexicon = {
		ja: {
			wholeperiod:"全期間",
			last100:"最近100件"
		},
		en: {
			wholeperiod:"Whole period",
			last100:"Last 100"
		}
	};
	var lang = navigator.language.slice(0,2);
	return lexicon[lang] || lexicon["en"];
}

function round (num, precision){
	precision = Math.pow(10, precision || 0);
	return Math.round(num * precision) / precision
}

})(this.unsafeWindow.jQuery)