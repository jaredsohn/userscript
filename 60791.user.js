// ==UserScript==
// @name         	Spotify tooltips
// @namespace    	www.allakatastroferna.com
// @description  	Adds a tooltip with Artist/Album/Track information to Spotify links
// @version 		1.0
// @license 		MIT License, http://www.opensource.org/licenses/mit-license.php
// @include      	*
// ==/UserScript==

function handleSpotifyLink(e) {

	var obj = e.currentTarget;
	
	// Don't modify existing title
	if (obj.getAttribute("title") != null)
		return;
	
	// Create url to Spotify Metadata API
	var wsUrl = getWsUrl(obj.getAttribute("href"));
	
	if (wsUrl) {
		
		GM_xmlhttpRequest({
			method: "GET",
			url: wsUrl,
			headers: {
				"User-Agent": "Mozilla/5.0",
				"Accept": "text/xml"
			},
			onload: function(response) {
				// Inject responseXML into existing Object if not present
				if (!response.responseXML)
					response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
				
				var doc = response.responseXML;
				
				// Create and set title attribute
				if (doc) {
					
					var t = "";
						
					var artists = [];
					var nodes = doc.documentElement.childNodes;
					for (var i=0; i<nodes.length; i++) {
						if (nodes[i].nodeName == "artist")
							artists[artists.length] = getTextContent(nodes[i]);	
					}
					var strArtists = "Artist" + ((artists.length > 1)? "s" : "") + ": " + artists.join(", ");

					switch (doc.documentElement.nodeName) {
						case "track" : 
							t = "Track: " + getTextContent(doc.getElementsByTagName("name")[0]) + " (" + strFromSecs(getTextContent(doc.getElementsByTagName("length")[0])) + ")" + 
							"  ###  " + strArtists + "  ###  Album: " + getTextContent(doc.getElementsByTagName("album")[0].getElementsByTagName("name")[0]);
							break;
						case "artist" :
							t = strArtists;
							break;
						case "album" :
							t = "Album: " + getTextContent(doc.getElementsByTagName("name")[0]) + " (" + getTextContent(doc.getElementsByTagName("released")[0]) + ")" +
							"  ###  " + strArtists;
							break;
						default :
							break;	
					}
					
					obj.setAttribute("title", t);
				}
			}
		});
	}		
}

function getTextContent(node) {
	var str = node.textContent;
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function strFromSecs(secs) {
	return Math.floor(secs / 60) + ":" + pad((secs % 60).toFixed(0));	
}

function pad(n) {
	return (n > 9)? n : 0 + "" + n;
}

/*
 * Url parsing based on "Spotify Link Parser" by Mijail
 * http://userscripts.org/scripts/show/57726
 */
function getWsUrl(linkUrl) {
	
	if (!linkUrl)
		return null;
	
	// Artist
	if (linkUrl.match(/^http:\/\/open\.spotify\.com\/artist\/(.*)/))
		return "http://ws.spotify.com/lookup/1/?uri=spotify:artist:" + RegExp.$1;
	
	// Album
	if (linkUrl.match(/^http:\/\/open\.spotify\.com\/album\/(.*)/))
		return "http://ws.spotify.com/lookup/1/?uri=spotify:album:" + RegExp.$1/* + "&extras=track"*/;
	
	// Track
	if (linkUrl.match(/^http:\/\/open\.spotify\.com\/track\/(.*)/))
		return "http://ws.spotify.com/lookup/1/?uri=spotify:track:" + RegExp.$1;

	// Playlist, can't handle playlists
	//if (urlStr.match(/^http:\/\/open\.spotify\.com\/user\/(.*)?\/playlist\/(.*)/))
	
	return null;
}


window.addEventListener("load", function(){
	// Find spotify links
	var aElms = document.getElementsByTagName('a');
	for (var i=0; i<aElms.length; i++) {
		if (aElms[i].href.match(/^http:\/\/open\.spotify\.com\//))  {
			aElms[i].addEventListener("mouseover", handleSpotifyLink, false);
		}
	}
}, false);