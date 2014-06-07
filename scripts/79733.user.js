// ==UserScript==
// @author amareus
// @name           ptp.me lol link
// @namespace      http://www.google.com
// @description    Insert link for your loling into the main menu
// @include        http*://*passthepopcorn.me*
// ==/UserScript==
// Just modified this for personal use by trza, app props to amareus.

(function() {
	var target = document.getElementById('alerts').getElementsByTagName('a'); /* User menu */

	target[1].innerHTML += ' <font color="#Af5">|</font> <a href="/lol.php\">lol</a>';
})();