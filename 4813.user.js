// ==UserScript==
// @name           Last.fm - Highlight Same Artists - Fixed
// @namespace      
// @description    Highlights artists that you listen to on other users' profiles.
// @include        http://www.last.fm/user/*
// ==/UserScript==var style = "font-weight: bold;";
function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}var fixXML = /^<\?xml version[^>]+?>/;(function() {
						    var re1 = /^http\:\/\/www\.last\.fm\/user\/([^\/]+)[\/]*$/i;    //if (!location.href.match(re1)) {
						    // return;
						    //}
    var usernameLink = xpath("//span");
    if (usernameLink.snapshotLength > 0) {
	    var username = usernameLink.snapshotItem(0).innerHTML;
    } else {
      return;
    }
    var isoverallpage = 0;
    var re3 = new RegExp("&subtype=artist");
    if(re3.exec(window.location.href)) {
	   isoverallpage = 1;
    }
    var re2 = new RegExp(username, "i");
    if (location.href.match(re2)) {
     return;
    }    GM_xmlhttpRequest({
        method: "GET",
        url: "http://ws.audioscrobbler.com/1.0/user/" + username + "/topartists.xml",
        onload: function(responseDetails) {            var xml = new XML(responseDetails["responseText"].replace(fixXML, ""));            var xmlArtists = xml[0].artist;           
//			var hasrecenttracks = xpath("//div[@id=\"recenttracks\"]").snapshotLength;
			if(isoverallpage == 1) {
				var links = xpath("//table[@class=\"barChart\"][1]//td[@class='subject']/span/a");
			} else {
				var links = xpath("//table[@class=\"barChart\"][1]//td[@class='subject']/span/a");
			}
	     
			for (var i = 0; i < links.snapshotLength; i++) {              var cur = links.snapshotItem(i);
              var curArtist = cur.innerHTML;
	      if(isoverallpage == 1) {
		      curArtist = cur.getAttribute("title");
	      }
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
              }
	      foo = 1;
	  }
        }
    });})();

