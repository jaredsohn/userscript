// ==UserScript==
// @name          zeedasia : disable ads
// @namespace     http://userstyles.org
// @description	  Use this to disable ads from http://www.zeedasia.com/
// @author        ahha00001
// @version       1.0.5
// @license       MIT License
// @include       http://www.zeedasia.com/*
// ==/UserScript==
(function() {
	// remove pop-up ads
	var target = document.evaluate('/html/body/center/iframe', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);

	// remove ads "ad_thread1_0"
	var target = document.evaluate('//*[@id="ad_thread1_0"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);

	// remove ads "ad_thread2_0"
	var target = document.evaluate('//*[@id="ad_thread2_0"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);

	// remove ads "ad_thread3_0"
	var target = document.evaluate('//*[@id="ad_thread3_0"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);

	// remove ads "ad_thread4_0"
	var target = document.evaluate('//*[@id="ad_thread4_0"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);

	// remove un-wrap text block
	var target = document.evaluate('//*[@class="t_msgfontfix"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.className = "";

})();
