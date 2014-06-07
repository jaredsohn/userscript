// ==UserScript==
// @name          App Annie
// @namespace     http://userstyles.org
// @description	  big images
// @author        ytzong
// @homepage      http://userstyles.org/styles/16594
// @include       http://appannie.com/*
// @include       https://appannie.com/*
// @include       http://*.appannie.com/*
// @include       https://*.appannie.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".change_up {background-color:lightcoral}\n.change_new {background-color:yellow}\n.app_details #screenshots,\n.app_details #app_related ul{height:auto !important;white-space:normal !important}\n.app_details #screenshots img,\n#app_description {height:auto !important}\n.read_more{display:none !important}";
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