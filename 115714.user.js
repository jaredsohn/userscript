// ==UserScript==
// @name          ex.ua orange
// @icon        http://i.imgur.com/NVtfrl0.png
// @namespace     http://userstyles.org
// @description	  no ads 
// @author        BskyB
// @version	2013.10.14
// @homepage      http://userstyles.org/styles/55039
// @require    http://usocheckup.dune.net/115714.js
// @downloadURL		https://userscripts.org/scripts/source/115714.user.js
// @updateURL		https://userscripts.org/scripts/source/115714.meta.js
// @include       http://ex.ua/*
// @include       https://ex.ua/*
// @include       http://*.ex.ua/*
// @include       https://*.ex.ua/*
// @include       http://www.ex.ua/*
// @include       https://www.ex.ua/*
// @include       http://*.www.ex.ua/*
// @include       https://*.www.ex.ua/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "BODY{\nbackground-image: url('http://www.ex.ua/load/20735052') !important;\n background-attachment: fixed !important; \n background-repeat: no-repeat !important; \n background-position: center center !important;\n  background-size: cover !important; \n}\na[onClick*=\"social\"], div[id*=\"plusone\"], #announce, #ad_block, #ad_block_1, #ad_block_2, #ad_block_3, #ad_block_4, a[href*=\"ad_click\"], a[href*=\"b.ex.ua/*/index.css\"], #index_box {\ndisplay: none !important;\n}\n#search_box {\nbackground: #d2dfe7 !important;\nheight: 50px !important;\nwidth: 300px !important;\ntop: 0;\nleft: 0;\n}\n\n#search_line {\ndisplay: block !important;\nleft: 20px !important;\ntop: 11px !important;\n}\n\n#search_help {\nwidth: 300px !important;\ndisplay: block !important;\ntop: 10px !important;\ntext-align: left !important;\nleft: 50%;\n}\n#search_button {\npadding: 2px 20px;\nfont-size: 18px;\nleft: 280px !important;\ntop: 8px !important;\n}\n\n.menu {\nposition: fixed !important;\n opacity: 0.8;\n z-index: 99999;\n}\n#search_help{\n display:none;\n}\n.copyright .small,.copyright a{\n color: #fff !important;\n}";
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