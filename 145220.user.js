// ==UserScript==
// @name          Snail Dashboard icon
// @description   Changes your Tumblr dashboard/home icon to a snail
// @author        based-on-an-alacritr-script
// @homepage      alacritr.tumblr.com
// @include       http://www.tumblr.com*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#popover_blogs .tab_notice:after{display:none}#header .iconic>a{background-image:url('http://i45.tinypic.com/atx0fk.png') !important;}";
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