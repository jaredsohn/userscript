// ==UserScript==
// @name           Submit to any subreddit
// @namespace      tag:brainonfire.net,2008-09-28:submit-any-subreddit
// @description    Replace the subreddit dropdown on the Reddit.com submit page with a text input field
// @include        http://www.reddit.com/submit
// @version        0.1
// @changelog      First version.
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

var sel = $xpath('//form[@action="/submit"]//select[@name="sr"]');
if(sel.length !== 1)
	throw new Error("Unable to find subreddit dropdown.");

sel = sel[0];

var txt = document.createElement('input');
txt.setAttribute('type', 'text');
txt.setAttribute('name', 'sr');
txt.setAttribute('value', 'reddit.com');

sel.parentNode.insertBefore(txt, sel);
sel.parentNode.removeChild(sel);
