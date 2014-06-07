// ==UserScript==
// @name          radio.i.ua
// @icon        http://i.imgur.com/IWHBnpi.png
// @namespace     http://userstyles.org
// @description	  wider list, no ads
// @author        BskyB
// @homepage      http://userstyles.org/styles/89144
// @version	2013.06.16
// @require    http://usocheckup.dune.net/171100.js
// @downloadURL		https://userscripts.org/scripts/source/171100.user.js
// @updateURL		https://userscripts.org/scripts/source/171100.meta.js
// @include       http://radio.i.ua/*
// @include       https://radio.i.ua/*
// @include       http://*.radio.i.ua/*
// @include       https://*.radio.i.ua/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#topRadios {\nwidth: 100% !important;\nheight: 100% !important;\n}\n\n#topRadios li {\nwidth: 200px !important;\nfloat: left !important;\n}\n\nbody {\nwidth: 99% !important;\nheight: 100% !important;\n}\n\n.baner {\ndisplay: none !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
