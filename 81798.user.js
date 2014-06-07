// ==UserScript==
// @name           Facebook Hackerz Mode
// @namespace      Shichemt Alen
// @description    Hackerz Mode for facebook.com
// @include        http*://*.facebook.com/*
// ==/UserScript==

(function() {
var css = "";
if (false || (document.domain == "facebook.com" || document.domain.substring(document.domain.indexOf(".facebook.com") + 1) == "facebook.com") )
	css += "html, body, .photo, #nonfooter, #booklet, #content, .UIFullPage_Container, .home, #facebook, .profile{background-image: url(http://i29.tinypic.com/2iuz3lv.png),url(http://i29.tinypic.com/2iuz3lv.png);background-repeat: no-repeat;	background-position: bottom left, bottom right; background-attachment:fixed;} .hasRightCol{ background-color:#fff } #pageFooter{display:none}  .UIStandardFrame_Content{ background-color:#fff; margin:0px 0px 0px 20px;} .adcolumn{display:none} .left_column, .right_column{background-color:#fff}";
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