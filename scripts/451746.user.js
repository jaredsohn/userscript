// ==UserScript==
// @name YouTube Watch R Rated Videos
// @author Tommy Smith
// @description Watch adult content on YouTube even when you are under 18. Please use responsibly.
// @version 1.1
// @include http*://youtube.com/watch?*
// @include http*://*.youtube.com/watch?*
// ==/UserScript==

// detect if nessecary, and if nessecary, continue
// assumes video id is 11 chars long
if (document.getElementById("unavailable-message").innerHTML.indexOf("Content Warning") != -1) {
document.getElementById("player-unavailable").innerHTML = "<embed id='movie_player' bgcolor='#000000' allowfullscreen='true' allowscriptaccess='always' name='movie_player' src='https://youtube.com/v/"+location.search.substring((Math.abs(location.search.indexOf("?v="))*Math.abs(location.search.indexOf("&v=")))+3,14)+"?autoplay=1' type='application/x-shockwave-flash' width='100%' height='100%'></embed>";
}