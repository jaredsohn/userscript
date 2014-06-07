// ==UserScript==
// @name          TwitterPromo
// @namespace     http://runlevel6.org/greasemonkey/twitterpromo
// @description   Hide the little promotional messages on Twitter.com
// @include       http://*twitter.com*
// ==/UserScript==

var side = document.getElementById('side');
if (side) {
	for (var i=0, promotions=side.getElementsByClassName('promotion'); i < promotions.length; i++) side.removeChild(promotions[i]);
}