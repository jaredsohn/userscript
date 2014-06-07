// ==UserScript==
// @name           DTA! - MySpace Photos 2
// @description    Will now get images stored on ac-images.myspacecdn.com as well. Use this together with Insane Ninjas original to get all pics
// @include        *.myspace.com/*
// @include        */myspace.com/*
// ==/UserScript==

var selectedLinks = document.evaluate("//a/img[contains(@src, 's_') or contains(@src, 'm_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var snapshotIndex = 0; snapshotIndex < selectedLinks.snapshotLength; ++snapshotIndex ) {
	var imageLink = selectedLinks.snapshotItem(snapshotIndex);

	var newLink = document.createElement('a');
		newLink.setAttribute('href', imageLink.getAttribute('src').replace(/(s|m)\_/, 'l_') )

		imageLink.parentNode.parentNode.appendChild(newLink)
}
