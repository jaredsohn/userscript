// ==UserScript==
//
//Displayable Name of your script
// @name           Lucasblokker
//
// brief description
// @description    Blokkeert Lucas
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://www.kaas.nl/
//
// Your name, userscript userid link (optional)
// @author         gmfreaky
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http://www.gmot.nl/index.php?topic*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
//
// @history        1.0 first version
//
// ==/UserScript==

var items = document.getElementsByTagName("*");
var i=items.length-1;
var item;
do {
	item = items[i];
	tag = item.tagName.toLowerCase();
	if (tag == "table" || tag == "tbody") {
		
		heeftLucas = false;
		
		for(var c = item.childNodes.length-1;c>0;c--) {
			
			var ci = item.childNodes[c];
			
			if (ci.innerHTML!=undefined) {
				if (ci.innerHTML.indexOf('<a href="http://www.gmot.nl/index.php?action=profile;u=792"') != -1) {
					console.log('halp een lucas');
					heeftLucas = true;
				}
			}
		}
		if (heeftLucas) {
			item.parentNode.removeChild(item);
		}
	}
}
while (i--);