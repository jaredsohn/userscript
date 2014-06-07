// ==UserScript==
// @name           Google Logo Replacer
// @namespace      http://userscripts.org
// @description    google homepage to match Air
// @author	   twofish@gmail.com
// @include        http://www.google.*/ig*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); #regular_logo {margin-right:5px;background:url(http://farm2.static.flickr.com/1020/529542330_45966691f8.jpg?v=0) right top no-repeat;width:166px;height:55px;} /* sonstiges */";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}