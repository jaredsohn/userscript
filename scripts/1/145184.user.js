// ==UserScript==
// @name          Impala Home Icon
// @namespace     http://userstyles.org
// @description	  Impala home icon for tumblr.
// @author        bonnay
// @homepage      http://userstyles.org/styles/72400
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#popover_blogs .tab_notice:after{display:none}#header .iconic>a{background-image:url('http://i.imgur.com/8qzgk.png') !important;}";
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