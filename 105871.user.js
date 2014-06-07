// ==UserScript==
// @name           Google BlackToWhiteBar
// @namespace      http://www.techmonk.com
// @description     Changes the new Google Black Bar to the old white one
// @include        http://www.google.com/*
// @include        http://www.google.co.in/*
// @include        https://www.google.com/*
// @include        https://www.google.co.in/*
// @include        http://*.google.com/*
// @include        http://*.google.co.in/*
// ==/UserScript==

(function() {
var css = "#gbz .gbzt, #gbz .gbgt, #gbg .gbgt {\n    color: #3366CC!important;\n}\n\n#gbx4, #gbx3 {\nbackground-color: #ffffff!important;\n}\n\n\n\n.gbzt-hvr, .gbzt:focus, .gbgt-hvr, .gbgt:focus {\nbackground-color: #C2CFF1;\n}\n\n.gbz0l .gbts {\n    color: #3366CC;\n    font-weight: bold;\n}";
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
