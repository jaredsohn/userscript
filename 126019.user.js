// ==UserScript==
// @name           TA - Link External Images
// @namespace      http://userscripts.org/users/176320
// @description    Click external images to open them in full view
// @include        http://*.trueachievements.com/*
// @version        0.1
// ==/UserScript==

var imgs = document.evaluate("//img[@class='externalimage' or @class='customimage']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < imgs.snapshotLength; i++) {

	var img = imgs.snapshotItem(i);
	var root = img.parentNode;
	var parent = document.createElement('a');
	parent.href = img.src;
	root.insertBefore(parent, img);
	parent.appendChild(img);

}