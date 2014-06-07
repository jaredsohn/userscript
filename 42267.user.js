// ==UserScript==
// @name          YouTube Ads Remover
// @namespace     http://userstyles.org
// @description	  A great script specially for YouTube, showing no ads whatsoever. 
// @author        QuestionMarkFTW
// @homepage      http://userstyles.org/styles/6717
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==
(function() {
var css = "/* * Youtube - No Advertisements * * Author : QuestionMarkFTW * Updated : Mat 3, 2008 * Description : Removes the advertisements above the videos information. * Usage : Use with the Stylish Firefox extension (http://userstyles.org/) or copy to your Firefox userContent.css file */ @namespace url(http://www.w3.org/1999/xhtml); #watch-channel-brand-div { padding-top: 0px !important; padding-right: 0px !important; padding-bottom: 0px !important; padding-left: 0px !important; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; margin-left: 0px !important; background-color: #ffffff !important; border-top-width: 0px !important; border-right-width: 0px !important; border-bottom-width: 0px !important; border-left-width: 0px !important; border-top-style: solid !important; border-right-style: solid !important; border-bottom-style: solid !important; border-left-style: solid !important; border-top-color: #ffffff !important; border-right-color: #ffffff !important; border-bottom-color: #ffffff !important; border-left-color: #ffffff !important; } .alignC { display: none !important; }";
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