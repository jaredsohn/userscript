// ==UserScript==
// @name           Google Search Results Less Whitespace
// @namespace      http://userscripts.org
// @description    Removes extra whitespace from the top and sides of Google search results.
// @include        http://www.google.com/search*
// @include        http://www.google.com/webhp*
// @include        http://www.google.com/#*
// @include        http://www.google.com/
// ==/UserScript==

/* version 2/18/2010 */

var style = "\
h1 > img {z-index: 1}\
.gbh {z-index: 2}\
#gbar {padding-left: 8px}\
#guser {padding-right: 8px}\
body {margin-left: 0px; margin-right: 0px}\
#res {margin-left: 12px}\
#sft {margin: -3px 0 0 12px !important;}\
div.nj {margin-right: 0 !important; margin-left: 0 !important}\
";

//style injection code coppied from "google Enhanced BLACK" by "gabedibble"
if (typeof GM_addStyle != "undefined") {GM_addStyle(style);}
else if (typeof addStyle != "undefined") {addStyle(style);}
else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = style;
		heads[0].appendChild(node); 
	};
};