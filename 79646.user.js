// ==UserScript==
// @author amareus
// @name           ptp.me lol link
// @namespace      http://www.google.com
// @description    Insert link for your loling into the main menu
// @include        http*://*passthepopcorn.me*
// ==/UserScript==
// Just modified this for personal use by trza, app props to amareus.

(function() {
	var target = document.getElementById('menu').getElementsByTagName('li'); /* menu */

	target[4].innerHTML += ' <a href="/lol.php\">lol</a>';
})();