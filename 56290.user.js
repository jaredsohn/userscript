// ==UserScript==
// @name           FacebookNoSponsored
// @namespace      http://www.vikaskumar.org
// @description    Remove Sponsored Links on Facebook
// @include        http://*.facebook.*/*
// @license        Public Domain
// @version        0.0.1
// @author         Vikas N Kumar
// ==/UserScript==
//

if (typeof FBK_NOSPON == "undefined" || !FBK_NOSPON) {
	var FBK_NOSPON = {};
}

FBK_NOSPON.runtime = (function() {
FBK_NOSPON.onload = function() {
	var sponsored = "UIHomeBox_Sponsored";
	var el_arr = document.getElementsByTagName("div");
	var rex = new RegExp("\\b" + sponsored + "\\b", "gi");
	for (var i = 0; i < el_arr.length; ++i) {
		if (rex.test(el_arr[i].className)) {
			el_arr[i].style.visibility = "hidden";
		}
	}
};
if (document.addEventListener) {
	document.addEventListener("onload", FBK_NOSPON.onload(), false);
}

})();	
