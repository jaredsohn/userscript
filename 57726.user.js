// ==UserScript==
// @name           Spotify Link Parser
// @description    Changes Spotify's HTML links for URI links.
// @include        *
// @version        v1.0
// ==/UserScript== 

function searchSpotifyLinks() {
	var allAnchor = document.getElementsByTagName('a');
	for (var i = 0; i < allAnchor.length; i++) {
		if (isSpotifyLink(allAnchor[i].href)) {
			allAnchor[i].href = parseSpotifyLink(allAnchor[i].href);
		}
	}
}
  
function isSpotifyLink(urlStr) {
    if (urlStr.match(/^http:\/\/open\.spotify\.com\//)) return true;
}

function parseSpotifyLink(urlStr) {

	// Track
	if (urlStr.match(/^http:\/\/open\.spotify\.com\/track\/(.*)/))
		return "spotify:track:" + RegExp.$1;
		
	// Artist
	if (urlStr.match(/^http:\/\/open\.spotify\.com\/artist\/(.*)/))
		return "spotify:artist:" + RegExp.$1;
		
	// Album
	if (urlStr.match(/^http:\/\/open\.spotify\.com\/album\/(.*)/))
		return "spotify:album:" + RegExp.$1;
		
	// Playlist
	if (urlStr.match(/^http:\/\/open\.spotify\.com\/user\/(.*)?\/playlist\/(.*)/))
		return "spotify:user:"+RegExp.$1+":playlist:"+RegExp.$2;
		
}
	
(function(){
    searchSpotifyLinks();
})();
