// ==UserScript==
// @name           Google Search Results No Freaking Stars
// @namespace      http://userscripts.org
// @description    Hides inactive star buttons in Google search results. Results you've favorited still will still display as such.
// @include        http://www.google.com/search*
// @include        http://www.google.com/webhp*
// @include        http://www.google.com/#*
// @include        http://www.google.com/
// ==/UserScript==

/* version 3/19/2010 */

var style = "\
.ws{display: none}\
.w1 .wsa {display: inline-block}\
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