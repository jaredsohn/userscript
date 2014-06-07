// ==UserScript==
// @name           Grand Theft auto IV : Facebook Theme
// @namespace      CloNEz
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @exclude        https://wiki.facebook.com/*
// ==/UserScript==

(function() {
var css = "";
	css += "html, body, .photo, #nonfooter, #booklet, #content, .UIFullPage_Container, .home, #facebook, .profile{background-image: url(http://i269.photobucket.com/albums/jj60/clonezer/gta_left.png),url(http://i269.photobucket.com/albums/jj60/clonezer/gta_right.png);background-repeat: no-repeat;	background-position: bottom left, bottom right; background-attachment:fixed;} .hasRightCol{ background-color:#fff } #pageFooter{display:none}  .UIStandardFrame_Content{ background-color:#fff; margin:0px 0px 0px 20px;} .adcolumn{display:none} .left_column, .right_column{background-color:#fff}";
if (false || (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") || (document.domain == "ilike.com" || document.domain.substring(document.domain.indexOf(".ilike.com") + 1) == "ilike.com"))
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