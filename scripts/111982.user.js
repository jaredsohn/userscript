// Stop clickosmedia redirects
//
// 2nd September, 2011
//
// Jason Friedman
// www.curiousjason.com
//
// This scripts removes the clickosmedia redirects from fave.co.il
//
// ==UserScript==
// @name           Stop clickosmedia redirects
// @namespace      http://www.curiousjason.com/greasemonkey/
// @description    Stop redirects via clickosMEDIA (e.g. on fave.co.il)
// @include        http://www.fave.co.il/*
// ==/UserScript==
//
var links;

links = document.evaluate("//a[contains(@href, '/ads.clickosmedia.com/go/to')]",
		        document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

for (var i = 0; i < links.snapshotLength; i++) {
	    a = links.snapshotItem(i);
	    a.href = a.href.replace(/http:\/\/ads.clickosmedia.com\/go\/to.php\?zone=[0-9]*&link=/,"");
}
