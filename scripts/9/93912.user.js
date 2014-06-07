// ==UserScript==
// @name          Groveshark background (gibson)
// @namespace     http://userstyles.org
// @description	  it just simply changes grooveshark's background with a ibanez picture (html5)
// @author        brssnkl
// @include       http://*listen.grooveshark.com*
// ==/UserScript==
(function() {
var css = "#theme_home {background-image:url('http://i.imgur.com/jJyqg.jpg');}";
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