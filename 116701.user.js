// ==UserScript==
// @name          temppic.com : disable ads
// @namespace     http://userstyles.org
// @description	  Use this to disable ads from http://www.temppic.com/
// @author        ahha00001
// @version       1.0.2
// @license       MIT License
// @include       http://www.temppic.com/*
// ==/UserScript==
(function() {
	
	var list = new Array(
		"/html/body/div[3]",
		"/html/body/center",
		"/html/body/center[2]",
		"/html/body/center[3]/table/tbody/tr/td",
		"/html/body/center[4]"
	);
	
	for(var i = list.length - 1; i >= 0; i--) {
		// remove pop-up ads
		var target = document.evaluate(list[i], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		target.parentNode.removeChild(target);
		
	}
	
	list.length = 0; // clear array

})();
