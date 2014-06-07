// ==UserScript==
// @name	H-Ratings
// @namespace	Malou Damgaard
// @description	Føjer H-Ratings til cachesiderne på Geocaching.com
// @include	http://www.geocaching.com/seek/cache_details.aspx*
// @match	http://www.geocaching.com/seek/cache_details.aspx*
// @version	0.0.2
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright	2011 GEOCACHING DANMARK
// @icon	http://s3.amazonaws.com/uso_ss/icon/121728/large.png?1325200495
// ==/UserScript==

var t1 = document.getElementById("uxFavContainerLink");
if( t1 ) {
	var targetDiv = t1.parentNode.parentNode;
} else {
	var targetDiv = document.getElementById("ctl00_ContentBody_trNotLoggedIn");
}

var gccode = getGCref();

if( targetDiv && gccode ) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.handicaching.com/show.php?waypoint=" + gccode,
		onload: function(response) {
			var handiDiv = document.createElement("div");
			var rating = "<strong>" + gccode + "</strong>";
			var goicon = "<img width='22' height='16' alt='Go' style='vertical-align:middle;'src='http://www.geocaching.dk/images/handicaching/h-ratings_button.png' />";
			var linkicon = "<img width='112' height='34' title='Geocaching.dk/handicap' alt='H-Rating Guide (dansk)' src='http://www.geocaching.dk/images/handicaching/h-rating_guide.png' />";
			if(response.responseText.match(/Sorry, we could not find that cache in our database/)) {
				rating += " er ikke Handicache ratet endnu? &nbsp;";
			} else {
				var h = response.responseText.match(/Average rating:&nbsp;<\/td>\s*<td><b>(H[1-5]{5})/);
				var d = response.responseText.match(/Average difficulty:&nbsp;<\/td>\s*<td>.*<\/td>\s*<td>\(([1-5]|[1-4]\.5)\)<\/td>/);
				var t = response.responseText.match(/Average terrain:&nbsp;<\/td>\s*<td>.*<\/td>\s*<td>\(([1-5]|[1-4]\.5)\)<\/td>/);
				if(h && d ) {
					rating = [
						rating,
						": ",
						h[1], " D", d[1], "/T", t[1],
						". &nbsp;<a href='http://www.handicaching.com/show.php?waypoint=",
						gccode,
						"' target='_new'>",
						goicon,
						" Se detaljer</a> &nbsp;"
					].join("");
				} else {
					GM_log("Couldn't extract HCode from Handicaching.com");
					return;
				}
			}
			
			handiDiv.id = "handicaching";
			handiDiv.className = "handistyle";
			handiDiv.innerHTML = [
				"<strong>H-Rating</strong> <a href='http://www.geocaching.dk/handicap/h-rating' style='float:right;' target='_new'>",
				linkicon,
				"</a><br>",
				rating,
				"<a href='http://www.handicaching.com/rate.php?waypoint=",
				gccode,
				"&step=2' target='_new'>",
				goicon,
				" Rate Cachen</a>"].join("");
			GM_addStyle(".handistyle{border:0px solid #60723d;margin:0em 0 0em;padding:0em;-moz-border-radius: 0em;border-radius: 0em;clear:both;} .handistyle a{color:#60723d !important;font-weight:bold;text-decoration:none;}");
			targetDiv.parentNode.insertBefore(handiDiv,targetDiv.nextSibling.nextSibling);
		}
	});
} else {
	GM_log("Unexpected document structure");
}

function getGCref() {
	var gccodeDiv = document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode");
	if( gccodeDiv ) {
		var gccode = gccodeDiv.innerHTML.match(/GC[A-Z0-9]+/);
		if( gccode ) {
			return gccode[0];
		}
	}
	GM_log("Couldn't work out GCcode");
	return null;
}