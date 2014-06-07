// ==UserScript==
// @name          livejournal.com - Remove ads
// @namespace     http://userstyles.org
// @description	  livejournal.com - Remove ads and text "Advertisement, Customize, Feedback
// @author        Kyller
// @homepage      http://userstyles.org/styles/307
// @include       http://livejournal.com/*
// @include       https://livejournal.com/*
// @include       http://*.livejournal.com/*
// @include       https://*.livejournal.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); div.ljad { display:none !important } div#Content div[style=\"margin-right:220px;height:1%;\"] { margin:0px !important }";
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
