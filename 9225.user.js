// ==UserScript==
// @name           Thottbot
// @namespace      http://userscripts.org/scripts/source/9225.user.js
// @description    Remove ads from thottbot
// @include        http://www.thottbot.com/*
// ==/UserScript==
//
// author: Blackout - blackout@drunkenlords.com
// 10:55 PM Sunday, May 13, 2007
//


// hide the ads
divs = ['ad1','ad2','ad3'];
for (i = 0; i < divs.length; i++) {
	x = document.getElementById(divs[i]);
	if (x) {
		x.innerHTML = '';
		//alert('hiding div: ' + divs[i]);
	}
}

// get rid of other ads
classes = ['adtxt'];
for (i = 0; i < classes.length; i++) {
	all = document.evaluate("//div[@class='"+classes[i]+"']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var j = 0; j < all.snapshotLength; j++) {
		x = all.snapshotItem(j);
		if (x) {
			x.innerHTML = '';
		}
	}
}