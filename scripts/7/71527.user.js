/// ==UserScript==
// @name          tuenti sin algunos
// @namespace     Tuenti sin algunos Berti95
// @description	  Berti95
// @author        berti95
// @include       http://*.tuenti.com/*

// ==/UserScript==
(function() {
var css = ".mod.f .body.agenda.events {display:none;}\n\n\n\n  #invitations {display:none;}\n\n  #appointments {position:relative; top:-40px;}\n\n\n\n  #home_friends_importer {display:none;}";
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
