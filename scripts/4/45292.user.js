// ==UserScript==

// @name           Google Speed Dial

// @namespace      http://userscripts.org/users/14536

// @description    Use the numbers 1-9, and 0 as shortcuts for the top 10 search results on Google

// @include        http://www.google.tld/search?*q=*

// @author         Vaughan Chandler

// ==/UserScript==



// Last updated 2009-09-26



window.addEventListener('keyup', function(e) {

	if (e.keyCode>=48 && e.keyCode<=57 && e.target.tagName!='INPUT') {

		var i = e.keyCode==48 ? 9 : e.keyCode-49;

		var elms = document.evaluate("//h3[@class='r']/a[@class='l'][1]|//table[@class='ts']//table[@class='ts']//a[@class='l'][1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null);

		if (i<elms.snapshotLength) {

			if (e.ctrlKey) { GM_openInTab(elms.snapshotItem(i).href); }

			else { location.href = elms.snapshotItem(i).href; }

		}

	}

}, false);

