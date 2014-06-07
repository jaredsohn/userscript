// ==UserScript==
// @name       Fringe Division Tumblr Dash logo
// @namespace  http://subject13fringe.tumblr.com/
// @version    0.1
// @description  fringe Division home logo
// @include      http://www.tumblr.com*
// @copyright  2012+, You
// ==/UserScript==
(function() {
var css = "#popover_blogs .tab_notice:after{display:none}#header .iconic>a{background-image:url('http://media.tumblr.com/tumblr_mbliwb7U171qhk6l1.png') !important;}";
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