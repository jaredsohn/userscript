// ==UserScript==
// @name           RSDN: Compact
// @namespace      http://yurikhan.livejournal.com/
// @include        http://www.rsdn.ru/*
// @include        http://rsdn.ru/*
// @grant GM_addStyle
// ==/UserScript==
(function() {
var css = "#banner-box, #logo, #profile-title { display: none !important; } " +
	"#login-box>div { display: inline !important; } " +
	"#profile-box { float: right !important; } " +
	"#left-block { float: inherit !important; } " +
	"#search-box { float: right !important; } " +
	".fix { line-height: inherit !important; height: inherit !important; }";
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

var topFrameset = document.getElementById('fsTop');
if (topFrameset)
{
	topFrameset.getElementsByTagName('frameset')[0].rows="28,*";
}
})();