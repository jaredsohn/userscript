// ==UserScript==
// @name          mtube_opacity
// @namespace     http://userstyles.org
// @description	  opacity method for 7" OLED
// @author        mtube
// @homepage      http://userstyles.org/styles/12660

// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); *{opacity:0.85;} *:hover{opacity:1;}";
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
})();
