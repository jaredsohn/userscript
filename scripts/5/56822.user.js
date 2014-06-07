// ==UserScript==
// @name          Gmail AD Killer
// @description	  The tiniest script can remove the ads from your Gmail sidebar.    WARNING:It was forbidden by Google to remove ads from Gmail. You should decide it discreetly.
// @author        Calvin Wang
// @homepage      http://calvinwang.com/archives/92
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = ".ii.gt,.ii.gt *{font-size:14px !important;line-height:150% !important;}table.Bs.nH.iY td.Bu:last-child{position:absolute !important;top:-99999px !important;right:0 !important;}.nH.pp.ps .pY{display: none !important;}table tbody tr.yO{line-height:150% !important;}table tbody tr.zE{line-height:150% !important;}";
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