// ==UserScript==
// @name          mtube_img
// @namespace     http://userstyles.org
// @description	  Zoom the picture for 7" OLED screen
// @author        mtube
// @homepage      http://userstyles.org/styles/12648

// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); img {max-width: 200px !important; height:auto !important;} img:hover {max-width:40000px !important; }";
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
