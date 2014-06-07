// ==UserScript==
// @name			RottenTomatoes - add IMDB rating
// @namespace		http://userscripts.org/users/6623/scripts
// @description		Adds info from IMDB to Rottentomatoes title pages
// @version			1.0
// @include			http://*.rottentomatoes.com/m/*
// ==/UserScript==

IMDB_icon = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAYAAAB24g05AAAACXBIWXMAAA9hAAAPYQGoP6dpAAAABGdB' +
	'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAu0lE' +
	'QVR42mL8DwQMYMDIQBqAaAMIIBa45rNppOk3ZgQbAhBATAjNs6AyRNJgPYwMAAHEBLOZ1YIFJ81qMQ/I' +
	'QlaHMAQggJgQJiMARAMC/D6RhCKGbAhAADHBTEbXgA9ADIS4ECCAmFD9hx2AbIcYOguNz8AAEECM/8+k' +
	'/UdVPosB4SpkNjqAyAEEEBPEb7MIaMYWE2lglwAEECMoIbGysqL5m7ArwN74/ZsBIIAYYSkRZAgpAKQZ' +
	'BAACDABFGEQjVBKm/gAAAABJRU5ErkJggg==';

var GM_IMDB_Div = document.createElement('div');
GM_IMDB_Div.innerHTML = '<div class="fl">\n<P><span class="label"><img src="' + IMDB_icon + '" alt="IMDB"> Rating:</span>\n <span class="content" id="imdb_rating">checking...</span></p></div>';
GM_IMDB_Div.setAttribute('id','GM_IMDB_Div');
document.getElementById('movie_stats').appendChild(GM_IMDB_Div);

const $xpath = '//div[@class="movie_info_area"]/h1/text()';
var $nodes = document.evaluate($xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var original_title = $nodes.singleNodeValue.data.replace(/\s+$/, '');
var title = escape(original_title);
title = title.replace(/ /g, "+");
url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + '+site:imdb.com';

GM_xmlhttpRequest({
	method:"GET",
	url:url1,
	onload:function(details) {
		var res;
		res = eval('(' + details.responseText + ')');
		url2 = res.responseData.results[0].unescapedUrl;
		if (findImdbID(url2) != null) {
			getMovieInfo(url2, this.index, function(rating) { 
			var IMDB_rating_span = document.getElementById('imdb_rating');
			//GM_log("rating: "+rating.rating);
			IMDB_rating_span.innerHTML = "<a href='" + url2 + "' title='" + original_title + " on IMDB'>" + rating.rating + "</a>";
			});
		}
	}
});

// the three functions below have been borrowed from Julien Couvreur's 
// Inline IMDB Ratings: http://userscripts.org/scripts/review/11360
function findImdbID(url) {
	var m = url.match(/^http:\/\/(.*\.)?imdb.com\/title\/(tt\d*)/i);
	if (m) return m[2];
	return null;
}

function getMovieInfo(imdbUrl, index, callback) {
	var url = imdbUrl;
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(details) {
			callback(extractMovieInfo(details.responseText, index));
		}
	});
}

function extractMovieInfo(content, index) {
	// <b>User Rating:</b> 
	// <b>2.1/10</b> 
	var match = content.match(/<b>(\d.\d)\/10<\/b>/);
	return { rating: match[1], index: index };
}