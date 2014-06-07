// ==UserScript==
// @name           Last.fm - Highlight Same Artists
// @namespace      
// @description    Highlights artists that you listen to on other users' profiles.
// @include        http://www.last.fm/user/*
// ==/UserScript==
// Make bold:var style = "font-weight: bold;";

// Make italic:
//var style = "font-style: italic;";

// Make red:
//var style = "color: red;";

// Make blue, bold and underlined:
//var style = "color: blue; font-weight: bold; text-decoration: underline;";
function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}var fixXML = /^<\?xml version[^>]+?>/;(function() {
	var usernameLink = xpath("//div[@id='badgeTop']/ul/li/a");
	if (usernameLink.snapshotLength > 1) {
		var username = usernameLink.snapshotItem(1).innerHTML;
	} else {
		return;
	}
	var isoverallpage = 0;
	var re1 = new RegExp("^http\:\/\/www\.last\.fm\/user\/[^\/]+\/charts\/.*&subtype=artist");
	if (re1.exec(window.location.href)) {
		isoverallpage = 1;
	}
	var re2 = new RegExp(username, "i");
	if (location.href.match(re2)) {
		return;
	}	GM_xmlhttpRequest({
		method: "GET",
		url: "http://ws.audioscrobbler.com/1.0/user/" + username + "/topartists.xml",
		onload: function(responseDetails) {			var xml = new XML(responseDetails["responseText"].replace(fixXML, ""));			var xmlArtists = xml[0].artist;			var hasrecenttracks = xpath("//div[@id=\"recenttracks\"]").snapshotLength;
			var links = new Array();
			if (isoverallpage == 1) {
				links[0] = xpath("//div[@class=\"lastChart\"]//td[@class='chartlabel']/div/a");
			} else if (hasrecenttracks){
				links[0] = xpath("//div[@class='lastChart'][3]//td[@class='chartlabel']/div/a");
				links[1] = xpath("//div[@class='lastChart'][2]//td[@class='chartlabel']/div/a");
			} else {
				links[0] = xpath("//div[@class='lastChart'][2]//td[@class='chartlabel']/div/a");
				links[1] = xpath("//div[@class='lastChart'][1]//td[@class='chartlabel']/div/a");
			}
			for (var h = 0; h < links.length; h++) {				for (var i = 0; i < links[h].snapshotLength; i++) {					var cur = links[h].snapshotItem(i);
					var curArtist = cur.innerHTML;
					for (var j = 0; j < xmlArtists.length(); j++) {
						if (curArtist == xmlArtists[j].name) {
							var curStyle = cur.getAttribute("style");
							if (curStyle != null) {
								cur.setAttribute("style", style + curStyle);
							} else {
								cur.setAttribute("style", style);
							}
							break;
						}
					}				}
			}
		}
	});})();
