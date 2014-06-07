// ==UserScript==
// @name          RTLtweets
// @version       0.2
// @description   Right to left tweets (on mouse over you can see them left to right) / for RTL languages like persian(farsi) and arabic
// @author        Siavash Keshmiri www.tenet.ir
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==
 (function() {
var css = ".info textarea{font-family:tahoma; direction:rtl; font-size:12px;}  .status-body .actions-hover{ left:50px; width:120px;} .status-body{font-family:tahoma;font-size:12px;direction:rtl;text-align:right;}; ";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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