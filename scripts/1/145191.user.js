// ==UserScript==
// @name          Disney Castle home icon for tumblr
// @namespace     http://userstyles.org
// @description	  Change the house icon at the top of your tumblr dashboard to the old Disneyland castle logo
// @author        KennyVee
// @homepage      http://userstyles.org/styles/72396
// @include       http://www.tumblr.com*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#popover_blogs .tab_notice:after{display:none}#header .iconic>a{background-image:url('http://i1107.photobucket.com/albums/h396/un1k3n/CastleIconTumblrBar.png') !important;}";
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