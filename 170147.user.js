// ==UserScript==
// @name          ex.ua dark
// @icon        http://i.imgur.com/NVtfrl0.png
// @namespace     http://userstyles.org
// @description	  top menu will show up on mouse hover
// @author        BskyB
// @version		2013.10.14
// @homepage      http://userstyles.org/styles/85741
// @require    http://usocheckup.dune.net/170147.js
// @downloadURL		https://userscripts.org/scripts/source/170147.user.js
// @updateURL		https://userscripts.org/scripts/source/170147.meta.js
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
var css = "BODY {\nbackground-image: url('http://www.ex.ua/load/77453146') !important;\n background-attachment: fixed !important; \n background-repeat: no-repeat !important; \n background-position: center center !important;\n  background-size: cover !important; \n }\n*[style=\"margin-top: 24px;\"] {\nmargin-top: 0 !important;\n}\ntbody tr td {\nheight: 15px !important;\n}\ntbody tr td img, tbody tr td a img, object#SWFUpload_0.swfupload {\n border-radius: 10px 10px 10px 10px;\n}\na[onClick*=\"social\"], div[id*=\"plusone\"], #announce, #ad_block, #ad_block_1, #ad_block_2, #ad_block_3, #ad_block_4, a[href*=\"ad_click\"], a[href*=\"b.ex.ua/*/index.css\"], #index_box {\ndisplay: none !important;\n}\n.menu {\nposition: fixed !important;\n opacity: 0.9;\n z-index: 99999;\n border-bottom: 10px !important;\n margin-top:-25px !important;\n padding-top: 0px !important;\nheight:10px !important;\nwidth:100% !important;\nbox-shadow:0px 1px 10px rgba(100,100,100,0.3);\nborder-radius: 10px 10px 10px 10px;\n-webkit-transform: translateZ(0);\n-webkit-transition:padding-top 0.2s !important;\n-moz-transform: translateZ(0) !important;\n-moz-transition:padding-top 0.2s !important;\n}\n.menu:hover {\npadding-top: 20px !important;\n}\n\n#search_box {\n opacity: 0.9;\nbackground: #fff !important;\nheight: 50px !important;\nwidth: 700px !important;\ntop: 0;\nleft: 0;\nborder-radius: 10px 10px 10px 10px;\n}\n#search_help {\nwidth: 300px !important;\ndisplay: block !important;\ntop: 10px !important;\ntext-align: left !important;\nleft: 50%;\n}\n#search_line {\ndisplay: block !important;\nleft: 20px !important;\ntop: 11px !important;\n}\n\n.panel tr td  {\nbackground: #fff;\n opacity: 0.95;\n border-radius: 10px 10px 10px 10px;\n}\n\ndiv[style*=\"height: 28px;\"] {\ndisplay: none !important;\n}\n\ninput[type=\"text\"], #search_text {\nwidth: 300px;\n}\n\n.small_button {\npadding: 2px 20px;\n}\n\n.button {\npadding: 2px 20px;\n}\n\nselect.small {\npadding: 4px 5px;\n}\n\n#search_button {\npadding: 2px 20px;\nleft: 280px !important;\ntop: 8px !important;\n}\n\n.r_button a, .small a, a, .small, small, .upload_success, .upload_progress, #uploadTable.list tbody tr td{\nbackground: #fff;\n opacity: 0.9;\n border-radius: 10px 10px 10px 10px;\n}\ntbody tr td p {\nbackground: #fff;\n opacity: 0.9;\n border-radius: 10px 10px 10px 10px;\n float: left !important;\n}\ntable {\nmargin: 0 auto;\n}\n\ntable.include_0 td {\nbackground: #fff;\n opacity: 0.95;\n border-radius: 10px 10px 10px 10px;\n}\n.copyright {\ndisplay: none !important;\n}\ntable.include_1 td {\nbackground: #fff;\n opacity: 0.9;\n}\nh1, h2 {\nborder-bottom: 1px solid #ccc;\nbackground: #fff;\n opacity: 0.9;\npadding: 8px 15px 10px 15px;\nborder-radius: 10px 10px 10px 10px;\n float: left !important;\n}\n#search_help{\n display:none;\n}\n\na[id*=\"play\"] {\nbackground: #eee;\n opacity: 0.9;\npadding: 8px 20px;\nborder-radius: 10px 10px 10px 10px;\n}";
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