// ==UserScript==
// @name          Remove Ads: Grooveshark.com
// @namespace     http://userstyles.org
// @description	  This will remove the ads on grooveshark. And also the white empty space
// @author        AllanKJ, Saturate.dk
// @homepage      http://userstyles.org/styles/16986
// @include       http://grooveshark.com/*
// @include       http://listen.grooveshark.com/*
// @include       https://listen.grooveshark.com/*
// @include       http://*.listen.grooveshark.com/*
// @include       https://*.listen.grooveshark.com/*
// ==/UserScript==
(function() {
var css = "#capital_header, #capital { display:none!important;}#application {margin-right: 0!important;}";
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