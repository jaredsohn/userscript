// ==UserScript==
// @name          it's new google, lol
// @namespace     http://userstyles.org
// @description	  it's new google, lol
// @author        lol_wut
// @homepage      http://userstyles.org/styles/29530
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @include       http://*.google.ru/*
// @include       https://*.google.ru/*
// @include       http://*.google.com.ua/*
// @include       https://*.google.com.ua/*
// ==/UserScript==
(function() {
var css = "#leftnav:hover {\n	width:151px!important;\n	padding-left:10px;\n	padding:0px;\n	background:none #fff!important;\n\n}\n#leftnav{\n	width:0px!important;\n	overflow:hidden;\n	padding-left:11px!important;\n	background:none #eee!important;\n}\n#center_col{\n	margin:0px!important;\n}\n.s{\n	max-width: none!important;\n}";
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