// ==UserScript==
// @name          Yahoo Mail Wide Messages List
// @icon        http://i.imgur.com/SCXj3aS.png
// @namespace     http://userstyles.org
// @description	  remove right sidebar, keep message list as wide as browser window is
// @author        BskyB
// @version	2013.11.2
// @homepage      http://userstyles.org/styles/86752
// @require    http://usocheckup.dune.net/170161.js
// @downloadURL		https://userscripts.org/scripts/source/170161.user.js
// @updateURL		https://userscripts.org/scripts/source/170161.meta.js
// @include       http://mail.yahoo.com/*
// @include       https://mail.yahoo.com/*
// @include       http://*.mail.yahoo.com/*
// @include       https://*.mail.yahoo.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#yucs-top-bar {\n    background-color: rgba(45, 17, 82,0.6) !important;\n}\n.pc #shellnavigation.unselectable, .pc #shellcontent.threaded {\n    top: 0px !important;\n}\n.wide-right-rail #shellcontent {\n    right: 0px !important;\n}\n#shellcontent {\n    right: 0px !important;\n}\n#main {\nwidth: 100% !important;\n}\n#theAd, #slot_REC, .darla {\ndisplay: none !important;\n}\n.panescroll #toolbar {\n    right: 0px !important;\n    }\n    .panescroll #shellcontent {\n    right: 0px !important;\n}\n#main, #yucs, #yuhead-bucket {\n    max-width: 100% !important;\n}";
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