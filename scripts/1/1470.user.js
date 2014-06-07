// ==UserScript==
// @name	Google Personalized Home
// @namespace	http://shiwej.com/devcenter/
// @description	Rewrites Google homepage links to point to their Personalized Homepage
// @include        http://www.google.com*
// @include        http://labs.google.com*
// ==/UserScript==

(function() {
	var xpath = "//a[@href]";
	var res = document.evaluate(xpath, document, null,
	                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var i, link;
	for (i = 0; link = res.snapshotItem(i); i++) {
		var iBefore = link.href.indexOf("webhp");
		var iAfter = iBefore + 5;
		if(iBefore > 0){
			link.href = link.href.substring(0, iBefore) + "ig" + link.href.substring(iAfter, link.href.length);
		} else if(link.href == "/") {
			link.href = "/ig";
		} else if(link.href == "http://www.google.com/") {
			link.href = "http://www.google.com/ig";
		} else if(link.href == "http://www.google.com") {
			link.href = "http://www.google.com/ig";
		}
	}
})();