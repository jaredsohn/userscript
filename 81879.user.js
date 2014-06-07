// ==UserScript==
// @name          Remove WP Greet Box
// @namespace     http://filipsalomonsson.se/
// @description	  Removes the WP Greet Box on Wordpress sites that use it.
// @version       0.1
// ==/UserScript==

var greetbox = document.getElementById("greet_block");
if (greetbox) {
	greetbox.parentNode.removeChild(greetbox);
	console.log("Killed a WP Greet Box");
}
