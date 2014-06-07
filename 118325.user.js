// ==UserScript==
// @name           Stop Spotify from launching
// @description    Stops Spotify from launching automatically when opening open.spotify.com links.
// @include        http://open.spotify.com/*
// ==/UserScript==
function main() {
	document.body.setAttribute("onload", "");  
}

main();