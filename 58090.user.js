// ==UserScript==
// @name           Toggleable thread admin
// @namespace      http://*.facepunch*.com/*
// @include        http://*.facepunch*.com/*
// ==/UserScript==

pageelem=document.evaluate("//div[@class='threadadmin']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < pageelem.snapshotLength; i++) {
	thispageelem = pageelem.snapshotItem(i);
	toggleid = "tadmin_" + Math.floor(Math.random()*10001)
	newdiv = document.createElement('div');
	newdiv.align = "center";
	newdiv.innerHTML = '<a style="font-size: 10px; padding: 5px; width: 50px; background-color: #cfa; border: 1px solid #888; margin: 2px; line-height: 28px;" href="javascript:;" onclick="$(\'#' + toggleid + '\').toggle(\'fast\');">Toggle Thread Admin</a>';
	thispageelem.parentNode.insertBefore(newdiv, thispageelem);
	thispageelem.style.display = "none";
	thispageelem.id = toggleid;
}