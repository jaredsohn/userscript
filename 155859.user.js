// ==UserScript==
// @name          Unfuck facebook
// @namespace     http://vozzel.net
// @version       1.0
// @description	  Simple script to hide some annoying panels 
// @author        Dread_Boy
// @include       https://www.facebook.com*
// @include       http://www.facebook.com*
// @run-at        document-start
// ==/UserScript==

(function() {
    var css = "#rightCol, #listsNav, #appsNav, #interestsNav, #developerNav{display:none;}._51mx:nth-child(2){display: none;}#admin_panel_body{min-height: 0px!important;max-height: 0px!important;transition: max-height 1s;}#admin_panel:hover #admin_panel_body{max-height: 1000px!important;}#admin_panel .uiHeader.mlm.uiHeaderPage{cursor:pointer;}#contentArea{width:100%!important;}";
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
