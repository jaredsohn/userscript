// ==UserScript==
// @name          TSH Script
// @namespace     http://userscripts.org/scripts/show/87423
// @description   Makes TSH Life better :)
// @version       0.01
// @include       http://*.tangosierrah3aven.net/forum/*
// ==/UserScript==

for (var i = 0; i < document.links.length; i++) {
  linkx = document.links[i];
  switch(0) {
    case linkx.href.indexOf("http://www.hiderefer.com/?") : linkx.href = decodeURIComponent(unescape(linkx.href.substring(linkx.href.indexOf("") + 26)));break;
  }
}


(function() {
var css = ".post {\noverflow:visible !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
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
})();
