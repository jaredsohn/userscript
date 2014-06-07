// ==UserScript==
// @name          GMail Without Ads and Hidden Spam count!
// @version       1.07
// @description   Html structure change because of gmail，GMail without ads, simple as it!
// @author 	  MDK (http://www.d5s.cn/archives/126) - based on original GMail in Blue: Professional skin from jbmarteau
//    * 1.01 - Thanks to kris7topher for fix the border on the right
//    * 1.02 - Fixed the overriding problem with large subjects
//    * 1.03 - Fixed the overriding problem with Html structure change because of gmail
//    * 1.04 - Add Hidden spam count 
//    * 1.05 - Fix bug with gmail html changed
//    * 1.06 - Gmail update, we only need to hide the ad, the spam count has been hided.
//    * 1.07 - Gmail change their html code, so we also change the css style.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==

(function() {
  var css = "div[role='main'] div.mq, div[role='main'] div.AT, div[role='main'] td[class='Bu y3']:last-child, div[role='main'] div[class='nH hx'] div[class='nH']:last-child{display:none !important;}";


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
