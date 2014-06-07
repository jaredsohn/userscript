// ==UserScript==
// @name          www.ruenglau.com : disable ads
// @namespace     http://userstyles.org
// @description	  Use this to disable ads from http://www.ruenglau.com/
// @author        ahha00001
// @version       1.0.4
// @license       MIT License
// @include       http://www.ruenglau.com/*
// ==/UserScript==
(function() {
	var target = document.evaluate('/html/body/div[3]/table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	target.parentNode.removeChild(target);

	var target2 = document.getElementsByTagName("DIV")[2].getElementsByTagName("BR");
	for (var i = target2.length - 1; i >= 0; i--) {
		if(target2[i].parentNode.nodeName == "DIV") {
			target2[i].parentNode.removeChild(target2[i]); 
		}
	}
})();
