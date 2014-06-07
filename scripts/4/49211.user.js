// ==UserScript==
// @name          Gmail 3: No Ads
// @namespace     http://userstyles.org
// @description	  Hides ads (as found on the right side-bar on every message) on Gmail version 3; enjoy
// @author        war59312
// @homepage      http://userstyles.org/styles/15794
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "/* * Author: Will (war59312@gmail.com) * Description: Hides ads on Gmail version 3 * Based On: Huge thanks goes to: Gmail 3: multiple adjustments (http://userstyles.org/styles/15636) * Based On: Ad Removal for Gmail Redesigned: http://userstyles.org/styles/7757 */ /* +++ changelog +++ March 28, 2009 - fixed right side-bar entires, no longer hides everything, perfect! :) March 10, 2009 - original release */ @namespace url(http://www.w3.org/1999/xhtml); /* Hide Ads In Right Side Bar */ .u5,.u8{display:none!important;}.hj{margin:5px 0 0 0!important;position:absolute!important;right:2px!important;}.hk{display:inline!important;margin:0 0 0 2px!important;padding:0 4px 4px 4px!important;}.hk img{margin:0!important;}.hk u{position:relative!important;top:1px!important;}.hk[style=\"display: none;\"]{display:none!important;}.ha{margin:32px 0 0 10px!important;}.ha span{display:inline!important;} .hx{margin:4px 0 0 8px!important;}.ii.gt{font-size:100%!important;}div[style=\"width: 189px;\"]{width:0!important;} /* Collapse Right Side Bar */ .iY .tELAdc:last-child > .nH {height: 0px !important; overflow: hidden !important; width: 0px !important;}";
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