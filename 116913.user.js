// ==UserScript==
// @name           Google Reader ++
// @description    Tries to fix the awful new Reader Update
// @namespace      com.valentin.galea
// @include        http://www.google.com/reader*
// ==/UserScript==

// taken from http://userscripts.org/scripts/review/116931
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

GM_addStyle(" \
#top-bar { height: 0px; } \
#lhn-add-subscription { display: none; } \
#title-and-status-holder { display: none; } \
#lhn-add-subscription-section { height: 40px; } \
#viewer-header { height: 40px; } \
#chrome-title { color: black; font-size: 20px; } \
#chrome-title a { color: #0000CC; font-size: 20px; } \
a.entry-title-link { color: #0000CC !important; } \
.read .card { border: #ccc solid 2px; background: transparent; } \
.card { margin-left: 10px; padding-right: 8px; -webkit-border-radius: 6px; -moz-border-radius: 6px; border-radius: 6px; -webkit-box-shadow: 3px 3px 3px #ccc; -moz-box-shadow: 3px 3px 3px #ccc; box-shadow: 3px 3px 3px #ccc; } \
");
