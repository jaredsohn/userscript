// ==UserScript==
// @name          Neon Darkness
// @namespace     http://http://sataniskenetwork.wordpress.com/
// @description	  Based on last dark by 666threesixes666
// @author        bulletfreak
// @homepage      http://sataniskenetwork.wordpress.com/2013/05/20/last-fm-neon-darkness-layout-script/
// @include       http://last.fm/*
// @include       https://last.fm/*
// @include       http://*.last.fm/*
// @include       https://*.last.fm/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "html, body, tbody, thead, th, tr, td, blockquote, li, ul, h1, h2, h3, h4, h5, h6, font, strong, p, form, footer\n\n{\ncolor: midnightblue !important;\nbackground: black !important;\n}\n\nbutton, select, div, #secondaryNavigation li a\n\n{\nbackground: black !important;\n}\n\na\n\n{\nbackground-color: black !important;\n}\n\ninput, code, textarea, pre, label, div, dd\n\n{\ncolor: purple !important;\n}\n\n\n\n\na\n\n{\ncolor: #800080 !important;\n}\n\na:visited\n\n{\ncolor: #191970 !important;\n}\n\n\n\ntextarea, pre, input, code\n\n{\nbackground: #333333 !important;\n}";
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
