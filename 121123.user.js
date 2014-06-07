// ==UserScript==
// @name          Schemer Change Font
// @namespace     http://userscripts.org
// @description	  فونت فارسی تاهوما برای اسکیمر
// @author        Amir Story
// @homepage      http://userscripts.org
// @include       http://www.schemer.com/*
// @include       https://www.schemer.com/*
// @include       http://*.www.schemer.com/*
// @include       https://*.www.schemer.com/*
// @include       http://schemer.com/*
// @include       https://schemer.com/*
// @include       http://*.schemer.com/*
// @include       https://*.schemer.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".T8jiCd:focus, .T8jiCd:hover {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-size: 11pt !important;\n}\n.VIpgJd-TzA9Ye-eEGnhe {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-size: 11pt !important;\n}\n\n.zTpSzd {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-size: 10pt !important;\n}\n\n.LGjSc {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-size: 9pt !important;\n}\n\n#main_page, .lqYohb, .CAtfwb {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-size: 9pt !important;\n}\n\n.pczJyc {\nfont-family: \"Trebuchet MS\", Tahoma, sans-serif !important;\nfont-size: 10pt !important;\n}";
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
