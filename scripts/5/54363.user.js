// ==UserScript==
// @name           mini-minerva
// @namespace      http://minerva.maine.edu
// @description    makes Minerva catalog smaller
// @include        http://minerva.maine.edu*
// @include		   http://mail.google.com*
// @exclude		   http://minerva.maine.edu/search~S81/X*
// ==/UserScript==

(function() {
var css = " td.pageNavArea, .notice, div.navigationRow form select,tr.pageMainArea, .unpadded p { display: none !important; } /* body, td.pageMainArea, tr.pageMainArea td, td.pageMainArea td, td.pageMainArea span, p.pageInfoAreaHeader, td.browseSaveJump {background: #f5f5f5 !important;} form.unpadded {margin-top:4px !important; margin-bottom: 4px !important;} tr.browseEntry, tr.briefCitRow td {background: #dfdfdf !important;}tr.browseHeader, tr.browseSuperEntry {#8f8f8f !important;} */";
var heads = document.getElementsByTagName("head");

	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}

})();