// ==UserScript==
// @name          ex.ua - white & orange
// @icon        http://i.imgur.com/NVtfrl0.png
// @namespace     http://userstyles.org
// @description	  new look for ex.ua
// @author        BskyB
// @version	2013.10.14
// @homepage      http://userstyles.org/styles/55103
// @include       http://ex.ua/*
// @include       https://ex.ua/*
// @include       http://*.ex.ua/*
// @include       https://*.ex.ua/*
// @include       http://www.ex.ua/*
// @include       https://www.ex.ua/*
// @include       http://*.www.ex.ua/*
// @include       https://*.www.ex.ua/*
// @require    http://usocheckup.dune.net/115715.js
// @downloadURL		https://userscripts.org/scripts/source/115715.user.js
// @updateURL		https://userscripts.org/scripts/source/115715.meta.js
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "BODY{background-image: url('http://www.ex.ua/load/20735052') !important;\n background-attachment: fixed !important; \n background-repeat: no-repeat !important; \n background-position: center center !important;\n  background-size: cover !important; \n}\n\n*[style=\"margin-top: 24px;\"] {\nmargin-top: 0 !important;\n}\n\na[onClick*=\"social\"], div[id*=\"plusone\"], #announce, #ad_block, #ad_block_1, #ad_block_2, #ad_block_3, #ad_block_4, a[href*=\"ad_click\"], a[href*=\"b.ex.ua/*/index.css\"], #index_box {\ndisplay: none !important;\n}\n.menu {\nposition: fixed !important;\n opacity: 0.9;\n z-index: 99999;\n}\n#search_box {\nbackground: #d2dfe7 !important;\nheight: 50px !important;\nwidth: 300px !important;\ntop: 0;\nleft: 0;\n}\n#search_help {\nwidth: 300px !important;\ndisplay: block !important;\ntop: 10px !important;\ntext-align: left !important;\nleft: 50%;\n}\n#search_line {\ndisplay: block !important;\nleft: 20px !important;\ntop: 11px !important;\n}\n\n.panel tr td  {\nbackground: #fff;\n opacity: 0.9;\n}\n\ndiv[style*=\"height: 28px;\"] {\ndisplay: none !important;\n}\n\ninput[type=\"text\"], #search_text {\nwidth: 300px;\n}\n\n.small_button {\npadding: 2px 20px;\n}\n\n.button {\npadding: 2px 20px;\n}\n\nselect.small {\npadding: 4px 5px;\n}\n\n#search_button {\npadding: 2px 20px;\nleft: 280px !important;\ntop: 8px !important;\n}\n\n.r_button a {\nbackground: #fff;\n opacity: 0.9;\n}\n\ntable {\nmargin: 0 auto;\n}\n\n.copyright, table.include_0 td {\nbackground: #fff;\n opacity: 0.9;\n}\ntable.include_1 td {\nbackground: #fff;\n opacity: 0.9;\n}\nh1, h2 {\nborder-bottom: 1px solid #ccc;\nbackground: #fff;\n opacity: 0.9;\npadding: 8px 15px 10px 15px;\n}\n#search_help{\n display:none;\n}\n\na[id*=\"play\"] {\nbackground: #eee;\n opacity: 0.9;\npadding: 8px 20px;\n}";
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