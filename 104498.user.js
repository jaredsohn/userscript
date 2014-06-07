// ==UserScript==
// @name            the-west.nl - share you item trader (NL only)
// @description	    Share your item trader with others so everybody can find the items they're searching for even quicker!
// @namespace       Christophev
// @include         http://*.the-west.nl/game.php*
// @version         2.0
// ==/UserScript==

//linked script, so updating this script won't be necessary.
(function(){
	var it_script = document.createElement("script");
	it_script.type = "text/javascript";
	it_script.src = "http://www.christophev.be/the-west/item_trader/test.js";
	document.body.appendChild(it_script);
})()