// ==UserScript==
// @name          bokumono clean and wide
// @namespace     http://userscripts.org
// @include       http://pc.bokumono.com/*
// @include       https://pc.bokumono.com/*
// @include       http://*.pc.bokumono.com/*
// @include       https://*.pc.bokumono.com/*
// ==/UserScript==
(function() {
var wide = document.getElementsByName("general_swf_publish").item(0).setAttribute("width","1000");
var css = "#header,#logo,#footer{display:none !important;}#game_content{height: 620px;width: 1000px;margin-top: 0px !important;margin-right: auto;margin-bottom: 0;margin-left: auto;}";
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
