// version 1.0
// ==UserScript==
// @name           mp3 player with playlist
// @namespace      http://tewe.tumblr.com
// @author         Emil Molnar
// @description    plays mp3 with yahoo media player
// @include        *
// ==/UserScript==

//testing Greasemonkey
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

var page_links = document.links;
var mp3match;
for (var i=0; i<page_links.length; i++){
	if (page_links[i].href.match(/\.mp3$/i)) {
	mp3match=1;
	} 

}
if (mp3match) {
	//insert the player
	var script = document.createElement('script');
	script.type='text/javascript';
	script.src='http://webplayer.yahooapis.com/player.js';
	var me= document.getElementsByTagName('head')[1];
	document.getElementsByTagName('head')[0].insertBefore(script,me);
}