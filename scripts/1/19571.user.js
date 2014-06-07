// ==UserScript==
// @name           Gazeta.pl - NO CLUTTER
// @namespace      http://www.w3.org/1999/xhtml
// @description    Less cluttered home page of Polish news portal, Gazeta.pl
// @author         bzikofski@gmail.com
// @include        http://www.gazeta.pl/0,0.html
// ==/UserScript==

/*
	Please note that this is just for the main page of the portal.

	I removed boxes which I don't ever use and the page is less cluttered.
	I left alone the "alert box" (gray bar above news boxes) - sometimes it's useful.
	
	---
	
	Here's the list of affected stuff:

	HEADER:
	div[id=hpv_col1] -- icons on top (Poczta, Forum, Randki, etc)

	MIDDLE COLUMN
	div[id=MTbox] -- big box on top of news boxes
	div[id=moveable4] -- recently introduced news box "Rozrywka"

	RIGHT COLUMN:
	div[id=finder] -- search box
	div[id=videoBox_outer] -- video box
	div[id=banP76] -- some banner box, blocked by AdBlock anyway, but had to remove it as it created whitespace
	div[class$=ludziePisza] -- forum links

	OTHER:
	div[class=multishow] -- some links..
	div[id=autopromo1] -- some link in left column
	div[class=HP_ad] -- bottom links, content blocked by adblock but the container with label was visible

	All the above are hidden.

	div[id=hpv_col2] -- weather box, just floated right.
	
	---
	
	Enjoy!
*/

var css = "@namespace url(http://www.w3.org/1999/xhtml); div[id=hpv_col1], div[id=MTbox], div[id=moveable4], div[id=finder], div[id=videoBox_outer], div[id=banP76], div[class$=ludziePisza], div[class=multishow], div[id=autopromo1], div[class=HP_ad] { display: none !important; } div[id=hpv_col2] { float:right !important; } /* @end */";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}