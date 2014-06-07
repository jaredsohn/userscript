// ==UserScript==
// @name          xstory (thaiautodetailing.110mb.com/xstory) : easy read
// @namespace     http://userstyles.org
// @description	  Use this script to read post easier on http://thaiautodetailing.110mb.com/xstory/
// @author        ahha00001
// @version       1.0.6
// @license       MIT License
// @include       http://thaiautodetailing.110mb.com/xstory/*
// ==/UserScript==
(function() {
	
	var list = new Array(
		"/html/body/div/div[2]/div/div/div[3]/form/div/div/div[2]",
		"/html/body/div/div[2]/div/div/div[3]/form/div/div/div[2]/div[2]"
	);
	
	for(var i = list.length - 1; i >= 0; i--) {
		// remove classes
		var target = document.evaluate(list[i], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		target.className = "";
	}
	
	list.length = 0; // clear array

})();