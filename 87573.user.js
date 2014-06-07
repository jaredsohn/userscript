// ==UserScript==
// @name          Destroy Who to Follow on New Twitter
// @namespace     http://userstyles.org
// @description	  Destroy Clusterfuck Recommend
// @author        ssig33
// @homepage      http://ssig3.com
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// ==/UserScript==
(function() {
var css = ".wtf-inner{display:none;}";
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
