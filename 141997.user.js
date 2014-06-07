// ==UserScript==
// @name          Google navigation bar - revert to light theme
// @namespace     http://userstyles.org
// @description	  This style reverts approximately from the new (and maybe temporary) Google dark navigation bar, to the former light theme.
// @author        NeryK
// @homepage      http://userstyles.org/styles/49951
// @include       http://google.com/*
// @include       https://google.com/*
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @include       http://www.google.*
// @include       https://www.google.*
// @include       http://maps.google.*
// @include       http://news.google.*
// @include       http://video.google.*
// @include       http://market.android.com/*
// @include       https://market.android.com/*
// @include       http://*.market.android.com/*
// @include       https://*.market.android.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#gbx3, #gbx4 {\n    background-color: #FFFFFF!important;\n    border-bottom: 1px solid #E5E5E5 !important;\n}\n\n#gbz .gbzt, #gbz .gbgt, #gbg .gbgt {\n    color: #3366CC !important;\n}\n\n.gbz0l .gbts {\n    color: #363636 !important;\n\n}\n\n.gbzt-hvr,.gbzt:focus,.gbgt-hvr,.gbgt:focus{\n    background-color:#E4E8F0 !important;\n    background: url(\"http://ssl.gstatic.com/gb/images/b_8d5afc09.png\") repeat scroll 0px -100px transparent !important;\n}\n\n#gbi5 {\n    background: url(\"http://ssl.gstatic.com/gb/images/b_8d5afc09.png\") repeat scroll -6px -22px transparent !important;\n}\n\n\n.gbtb .gbts {\n    background: url(\"http://ssl.gstatic.com/gb/images/b_8d5afc09.png\") repeat scroll 0 -22px transparent !important;\n}";
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
