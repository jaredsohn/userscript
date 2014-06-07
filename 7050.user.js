// ==UserScript==
// @name	        Last.fm - My Top Tracks - Fix (slow)
// @namespace      xxx
// @description    Shows any tracks on Last.fm artist pages that you've listened to by that artist.
// @include        http://www.last.fm/music/*
// ==/UserScript==


/* CUSTOM VARIABLES */
// chartLimit:		Maximum number of songs to display in "My Top Tracks" on
//					each artist's page. Set to 0 for no limit. Default is 10.
var chartLimit = 50;

// cacheTimeout:	Script will use the cache for this amount of time (in
//					minutes) before updating. Set to 0 to disable cacheing.
//					Default is 60 * 24 (60 mins in an hour * 24 hours in a
//					day = daily). [NB: * is multiplication.]
var cacheTimeout = -1;

// putItHere:	Location for placing the new table.
//
var putItHere = 4;

/* History */
// Previous Home : http://bear.unixbsd.info/~zaltan/lastfm/
// Previously modified by iten
// snyde1:  1-Nov-2006 modify for Oct 2006 release of last.fm; fix for artists with "&" in name
// snyde1: 14-Dec-2006 modify for Dec 2006 release of last.fm
// snyde1: 12-Feb-2007 modify for Feb 2007 release of last.fm

/* SCRIPT */
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function escape2(str) {
	var times;
	if (arguments.length < 2) {
		times = 1;
	} else {
		times = arguments[1];
	}
	for (var i = 0; i < times; i++) {
		str = encodeURIComponent(str).replace(/\%20/g, "+");
	}
	return str;
}

function unescape2(str) {
	var times;
	if (arguments.length < 2) {
		times = 1;
	} else {
		times = arguments[1];
	}
	for (var i = 0; i < times; i++) {
		str = decodeURIComponent(str.replace(/\%26/g, "&amp;"));
		str = decodeURIComponent(str.replace(/\+/g, "%20"));
		str = decodeURIComponent(str.replace(/ \& /g, " &amp; ")); // Fix for artist with ampersand for and
	}
	return str;
}

function doChart(xml, username, artist) {
	var XMLtracks = xml[0].tr;
	var tracks = new Array();
	var lastPos = 0;
	var lastCount;
	var j = 0;
	var extratd = 0;
	var theArtist = ""+artist;
	theArtist = (theArtist.replace(/\&amp\;/g, "%26"));
	var repArtist = theArtist.replace(/\ /g, "+");
	repArtist = repArtist.replace(/\%/g, "%25");
	for (var i = 0; i < XMLtracks.length(); i++) {
		var trackURL = XMLtracks[i].td[1].span.a[1].@href;
		var re = /\/music\/([^\/]+)\/_\/([^\/]+)/;
		if(extratd == 1) {
			trackURL = XMLtracks[i].td[2].span.a[1].@href;
		}
		var matches = re.exec(trackURL);
		if (matches == null) {
			continue;
		}
		var currArtist = matches[1];
		var currName = matches[2];
		if(extratd == 1) {
			currCount = XMLtracks[i].td[4].div.span;
			extratd = 0;
		} else {
			var currCount = XMLtracks[i].td[3].div.span;
		}
		currArtist = unescape2(currArtist);
		if (unescape2(currArtist) != unescape2(theArtist)) {
			continue;
		}
		tracks[j] = new Array();
		tracks[j]["name"] = currName;
		tracks[j]["count"] = currCount;
		if (j == 0) {
			tracks[0]["pos"] = 1;
			var maxCount = tracks[0]["count"];
		} else {
			if (tracks[j]["count"] == lastCount) {
				tracks[j]["pos"] = lastPos;
			} else {
				tracks[j]["pos"] = j + 1;
			}
		}
		tracks[j]["width"] = Math.max(12, Math.round(tracks[j]["count"] / maxCount * 100));
		lastPos = tracks[j]["pos"];
		lastCount = tracks[j]["count"];
		j++;
	}
	if (tracks.length < 1) {
		return;
	}
	var barCharts = xpath("//h3");
	for (var j = 0; j < barCharts.snapshotLength; j++ ) {
		if ( barCharts.snapshotItem(j).textContent.match(/Top Tracks, Last Six Months/) ) {
			putItHere = j;
		}
	}
	var insertBeforeHere = barCharts.snapshotItem(putItHere);
	var newnode = document.createElement("div");
	newnode.setAttribute("id", "mychart");
	newnode.setAttribute("style", "width: 100%;");
	
	insertBeforeHere.parentNode.parentNode.insertBefore(newnode, insertBeforeHere.parentNode);
	var mychart = document.getElementById("mychart");
	if (!mychart) {
	  return;
	}
	if (chartLimit < 1) {
	  chartLimit = 500;
	}
	var HTML = "<h3><a href=\"/user/"+escape2(username)+"/charts/&charttype=overall&subtype=track\" title=\"More top tracks...\">Top Tracks, Me</a></h3><div ><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"barChart inlineChart\">";
	var firstitem = 1;
	for (var k = 0; k < tracks.length && k < chartLimit; k++) {

		HTML += "<tr><td class=\"position\">"+tracks[k]["pos"]+"</td><td class=\"subject\" title=\""+unescape2(tracks[k]["name"], 2)+ ", played "+ tracks[k]["count"] +" times\"><div>"+"<span class=\"percentageBar\" style=\"width: "+tracks[k]["width"]+"%;\">"+"</span><span class=\"text\"><a title=\""+unescape2(tracks[k]["name"], 2)+ "\" href=\"/music/"+repArtist+"/_/"+ tracks[k]["name"] +"\">"+unescape2(tracks[k]["name"])+"</a></span></div></td><td class=\"counter\" >"+ tracks[k]["count"]  +"</td></tr>";
		firstitem = 0;
	}
	HTML += "</table></div></div><p class=\"chartmore\"><span>for me</span><span class=\"li\"><a href=\"/user/"+escape2(username)+"/charts/&charttype=overall&subtype=track\">More top tracks...</a></span></p>";
	mychart.innerHTML = HTML;
}

function fixHTML(html) {
	var re = /<table [^>]+>(.|\n)+<\/table>/;
	var matches = re.exec(html);
	if (matches == null) {
	  return 0;
	} else {
	  return matches[0];
	}
}

(function() {
	if (!location.href.match(/^http\:\/\/www\.last\.fm\/music\/([^\/]+)[\/]*$/, "i")) {
		return;
	}
	var usernameLink = xpath("//span");
	if (usernameLink.snapshotLength > 0) {
		var username = usernameLink.snapshotItem(0).innerHTML;
	} else {
		return;
	}
	var artistHTML = xpath("//div[@id='LastHeadline']/h1");
	if (artistHTML.snapshotLength > 0) {
		var artist = artistHTML.snapshotItem(0).firstChild.innerHTML;
	} else {
		return;
	}
	var usedCache = 0;
	if (cacheTimeout > 0) {
		var cacheTimestamp = GM_getValue("mytoptracks_"+username+"_timestamp", 0);
		var d = new Date();
		var currentTimestamp = Math.ceil(d.getTime() / 60000);
		if (currentTimestamp - cacheTimestamp <= cacheTimeout) {
			var cacheValue = GM_getValue("mytoptracks_"+username+"_xml", 0);
			if (cacheValue) {
				var xml = new XML(cacheValue);
				doChart(xml, username, artist);
				usedCache = 1;
			}
		}
	}
	if (!usedCache) {
		GM_xmlhttpRequest({
			method: "GET",
					url: "http://www.last.fm/user/" + escape2(username) + "/charts/?charttype=overall&subtype=track",
			onload: function(responseDetails) {
					var xmlText = fixHTML(responseDetails["responseText"]).replace(/\&nbsp;/ig, '');
					var regexp = /\s&\s/g;
					xmlText = xmlText.replace(regexp, "foo");
					regexp = /(<td[^>]*class="subject")[^>]*>/g;
					xmlText = xmlText.replace(regexp, "$1>");
				if (!xmlText) {
					return;
				}
				if (cacheTimeout > 0) {
					var d = new Date();
					var currentTimestamp = Math.ceil(d.getTime() / 60000);
					GM_setValue("mytoptracks_"+username+"_timestamp", currentTimestamp);
					GM_setValue("mytoptracks_"+username+"_xml", xmlText);
				}
				var xml = new XML(xmlText);

				doChart(xml, username, artist);
			}
		});
	}
})();