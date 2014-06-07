// ==UserScript==
// @name           SpotifyURI Link Parser
// @description    Changes Spotify links to SpotifyURI links.
// @include        *
// @version        v1.1
// ==/UserScript== 

/*
 * Code based on "Spotify Link Parser" by Mijail
 * http://userscripts.org/scripts/show/57726
 */

function searchSpotifyLinks() {
    var allAnchor = document.getElementsByTagName('a');
    for (var i = 0; i < allAnchor.length; i++) {
        if (isSpotifyLink(allAnchor[i].href)) {
            allAnchor[i].href = parseSpotifyLink(allAnchor[i].href);
        }
    }
}
  
function isSpotifyLink(urlStr) {
    if (urlStr.match(/^http:\/\/open.spotify.com\//) || urlStr.match(/^spotify:/) ) return true;
}

function parseSpotifyLink(urlStr) {
    if (urlStr.match(/^(http:\/\/open.spotify.com\/|spotify:)(album|artist|track)([:\/])([a-zA-Z0-9]+)\/?$/)) {
        return "http://spotify.url.fi/"+ RegExp.$2 +"/"+ RegExp.$4;
    } else {
        return urlStr;
    }
}
	
(function(){
    searchSpotifyLinks();
})();