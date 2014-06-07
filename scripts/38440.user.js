// ==UserScript==
// @name           Outline message indicator on Reddit
// @namespace      tag:brainonfire.net,2008-12-10:outline-reddit-message-indicator
// @description    For colorblind folks, the orange "you've got mail" icon is hard to distinguish from the gray version. This script adds a bold border around the image.
// @include        http://www.reddit.com/*
// @version        0.1
// @changelog      First version
// ==/UserScript==


/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

$xpath("//a[@id='mail']/img[@src='/static/mail.png']").forEach(function(el)
{
	el.style.border = '3px solid black';
});
