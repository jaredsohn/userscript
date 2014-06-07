// ==UserScript==
// @name           Jessamynimizer
// @namespace      http://userscripts.org/users/71401
// @description    Removes a user from My Contacts activity
// @include        http://www.metafilter.com/contribute/activity/contacts
// @include 	   http://www.metafilter.com/
// ==/UserScript==

	var imgElements, urlElements, thisElement;
	if (document.URL.match('http://www.metafilter.com/contribute/activity/contacts')) {
	imgElements = document.evaluate(
		"/html/body/div[@id='page']/div[2]/div[@class='copy']/a[@href='/user/292']/..",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);
     
	for (var i = 0; i < imgElements.snapshotLength; i++) {
		imgElement = imgElements.snapshotItem(i);
		// remove element
		imgElement.parentNode.removeChild(imgElement);
	}
	}
	else {
	imgElements = document.evaluate(
		"//*[@id='menufooter']/div//a[@href='/user/292']/..",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);
     
	for (var i = 0; i < imgElements.snapshotLength; i++) {
		imgElement = imgElements.snapshotItem(i);
		// remove element
		imgElement.parentNode.removeChild(imgElement);
	}
	}