// ==UserScript==
// @name           die in a fire plz?
// @namespace      http://www.facepunch.com/showthread.php?*
// @include        http://www.facepunch.com/showthread.php?*
// ==/UserScript==

pageelem=document.evaluate("//img[contains(@src,'/fp/rating/box.png')]",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < pageelem.snapshotLength; i++) {
	thispageelem = pageelem.snapshotItem(i);
	thispageelem.alt='Die';
	thispageelem.title='Die';
}

pageelem=document.evaluate("//div[contains(@id,'postratingresults_')]/span",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < pageelem.snapshotLength; i++) {
	thispageelem = pageelem.snapshotItem(i);
	stuffz = thispageelem.innerHTML.replace("Dumb x", 'Die in a fire x')
	thispageelem.innerHTML = stuffz;
}