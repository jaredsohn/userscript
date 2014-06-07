// ==UserScript==
// @name          resize new twitter
// @namespace     http://ssig33.com/
// @description	  resize
// @author        ssig33
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// ==/UserScript==
(function() {
var css = ".wtf-inner, .trends-inner, .definition{display:none !important;}\n  .your-activity{clear:both; width:100% !important;}\n  .dashboard{width:270px !important;}\n  .main-content{width:730px !important;}\n  .dashboard div.component{width:270px !important; max-width:270px !important; min-width:270px !important;}\n  .tweet-box textarea{max-width:680px !important;}\n  .twitter-anywhere-tweet-box-editor{width:680px !important;}\n  .messages-main-content{width:400px !important;}\n  .send-message-box .tweet-box .twttr-editor .twitter-anywhere-tweet-box-editor{width:452px !important}";
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
