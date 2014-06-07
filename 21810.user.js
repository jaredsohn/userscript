// Copyright (c) 2008-2009, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Add ratings to RedBox titles page
//
// version 0.3
// 2009-07-13
// - fix for redbox website change
// - removed qty
//
// version 0.2
// 2008-06-04
// - fix for redbox website change
// - adds movie rating (G, PG, PG13, R, etc)
// - adds qty left when you select a redbox kiosk
//
// version 0.1
// 2008-01-28
// - adds yahoo rating next to each movie
//
// --------------------------------------------------------------------
// What:
// 	Adds Yahoo ratings next to each movie on the RedBox
// 	Titles page (thumbnail view). Highlights highly ranked
//	movies in green and badly ranked movies in red. Replaces
//	short title (30 chars) with full title name.
//
// Why:
//	I find it annoying to click on every movie to see its rating.
//
// How:
//	The script sends AJAX requests to get the Yahoo
// 	ranking from the title detail page.
//
// Future:
//	Add caching/cookie to remember rankings that have
//	already been fetched.
//
// Wish:
//	In the beginning, I wanted to get rankings from IMDB
//	or rottentomato, but I don't know how to overcome the
//	cross domain scripting issues without modifying the
//	actual RedBox.com website.
//
// Contact:
// 	detect [at] hotmail [dot] com
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Add ratings to RedBox titles page
// @description   Makes browsing movies easier and faster on the RedBox.com website
// @include       http://redbox.com/*
// @include       http://www.redbox.com/*
// @include       https://redbox.com/*
// @include       https://www.redbox.com/*
// @version	0.3
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    var GM_JQ2 = document.createElement('script');
    GM_JQ2.src = 'http://jqueryjs.googlecode.com/svn/trunk/plugins/form/jquery.form.js';
    GM_JQ2.type = 'text/javascript';
    var GM_JQ3 = document.createElement('script');
    GM_JQ3.src = 'http://spaz.googlecode.com/svn-history/r78/trunk/assets/jquery.moreSelectors.js';
    GM_JQ3.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    document.getElementsByTagName('head')[0].appendChild(GM_JQ2);
    document.getElementsByTagName('head')[0].appendChild(GM_JQ3);
	
	var titleList = new Array();

	function Querystring(qs) { // optionally pass a querystring to parse
	this.params = {};
	
	if (qs == null) qs = location.search.substring(1, location.search.length);
	if (qs.length == 0) return;

// Turn <plus> back to <space>
// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&'); // parse out name/value pairs separated via &
	
// split out each name=value pair
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);
		
		var value = (pair.length==2)
			? decodeURIComponent(pair[1])
			: name;
		
		this.params[name] = value;
	}
}

Querystring.prototype.get = function(key, default_) {
	var value = this.params[key];
	return (value != null) ? value : default_;
}

Querystring.prototype.contains = function(key) {
	var value = this.params[key];
	return (value != null);
}

unsafeWindow.savedRatings = [];
	
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    function letsJQuery() {
	
		unsafeWindow.titleList = new Array();

		unsafeWindow.getColorFromRating = function (rating)
		{
			var color;
			if(rating == 'A+' || rating == 'A' || rating == 'A-' || rating == 'B+' || rating == 'B')
			{
				color = "#00CC00";
			}
			else if(rating == 'F' || rating == 'D-' || rating == 'D' || rating == 'D+' || rating == 'C-')
			{
				color = "#FF0000";
			}
			else
			{
				color = "#A6A6A6";
			}
			return color;
		}

		unsafeWindow.getRating = function(obj, index, kioskId){
			var movieId = obj.attr('itemId');
			var movieTitle = obj.attr('textContent');
			
			//ajax call
			if(unsafeWindow.savedRatings[movieId])
			{
				unsafeWindow.addRatings(obj, unsafeWindow.savedRatings[movieId]);
			}
			else if(obj.contents().find('.greasemonkey').length==0 && movieId)
			{
				$.ajax(
					{
						type: "POST",
						url: "/data.svc/Title", 
						data: '{"type":"Title","pk":"ID","statements":[{"filters":{"ID":' + movieId + ',"KioskID":' + kioskId + '},"sort":null,"flags":null}],"__K":"UNKNOWN"}',
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function(json)
						{
							unsafeWindow.savedRatings[movieId] = json;
							unsafeWindow.addRatings(obj, json);
						}
					}
				);
			}
		}

		unsafeWindow.addRatings = function(obj, json)
		{
			movieRating = json.d.Rating;
			movieYahooRating = json.d.YahooRating;
			//console.log(obj, 'Id: ' + movieId, 'Title: ' + movieTitle, 'YahooRating: ' + movieYahooRating, 'Rating: ' + movieRating);
			//add rating to title
			$(obj.contents().find('.header')[0]).parent().after(
				'<tr>' +
				'<td class="greasemonkey">' +
				'<div style="color: #999999; text-decoration: none; font-weight: normal">' +
				'' + movieRating + '&nbsp; ' +
				'<span style="font-weight: bold; color:' + unsafeWindow.getColorFromRating(movieYahooRating) + '">' + movieYahooRating + '</span>' + 
				'</div>' +
				'</td>' +
				'</tr>'
			);
		}

		unsafeWindow.checkit = function()
		{
			if(location != unsafeWindow.oldLocation)
			{
				unsafeWindow.runIt();
			}
			unsafeWindow.oldLocation = location.toString();
		}

		unsafeWindow.oldLocation = '';
		unsafeWindow.oldLocation = location.toString();

		unsafeWindow.runIt = function()
		{
				var qs = new Querystring();
				var kioskId = qs.get("kioskid", "null");
				interval = unsafeWindow.setInterval(unsafeWindow.checkit, 100);
				var queueIndex = [];
				var queueId = [];
				$('#ctl00_ctl00_MainContent_dialog_MainContent_plvTitles .plvcItem').each(
					function( intIndex )
					{
						queueId[intIndex] = $(this);
						queueIndex[intIndex] = unsafeWindow.setInterval(						function(){
							if(queueId[intIndex].attr('itemId'))
							{							
								unsafeWindow.getRating(queueId[intIndex], intIndex, kioskId);
								unsafeWindow.clearInterval(queueIndex[intIndex]);
							}							
							},50);
					}	
				);
		}

		unsafeWindow.runIt();

	}
	
	
