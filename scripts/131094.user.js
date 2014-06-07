// ==UserScript==
// @name       pingas
// @namespace  rok hogan
// @version    4.20
// @description  makes some shit widescreen or some shit
// @include        http://planetfreedom.freeforums.org*
// ==/UserScript==

// Initiate custom CSS function
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}

// Custom CSS interface styling
GM_addStyle(" \
#wrap {width: 100%; } \

\ ");