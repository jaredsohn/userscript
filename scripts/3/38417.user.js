// ==UserScript==
// @name           Highlight OP's comments on Reddit self-posts
// @namespace      tag:brainonfire.net,2008-12-10:reddit-selfpost-highlight-OP
// @description    On Reddit self-posts, put a light green background on the username of the submitter's comments, and bring their oldest top-level comment to the top of the page.
// @include        http://www.reddit.com/comments/*
// @include        http://www.reddit.com/r/*/comments/*
// @version        0.7
// @changelog      Since 0.6: Reddit now provides a text area on self-posts, and adds classnames to the submitter's comments. No need to hoist or search, now, but we'll still do it.
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

var authorName = $xpath("//div[@id='siteTable']//a[contains(@class, 'author')]/text()")[0].nodeValue;

var link_domain = $xpath("//div[@id='siteTable']//span[contains(@class, 'domain')]/a")[0].href
var isSelf = (link_domain.indexOf("http://www.reddit.com/r/") === 0);

if(!isSelf)
	return;

GM_addStyle("a.submitter { background-color: #af8; }");

//also bring OP's oldest top-level comment to top, if applicable

var isPermalink = $xpath("//div[contains(@class, 'permamessage')]").length;

if(isPermalink)
	return;

var topLevelByOP = $xpath("//div[@class='content']/div[contains(@class, 'commentarea')]/div[starts-with(@id, 'siteTable_')][contains(@class, 'nestedlisting')]/div[contains(@class, 'comment')][div[contains(@class, 'entry')]/div[contains(@class, 'noncollapsed')]/p[contains(@class, 'tagline')]/a[contains(@class, 'submitter')]]");

console.log(topLevelByOP);

var re_ID = /\bid-t1_(.+?)\b/;

function selectOlderComment(a, b)
{
	return re_ID.exec(a.className)[1] < re_ID.exec(b.className)[1] ? a : b;
}

if(topLevelByOP.length === 0)
	return;

topLevelByOP = topLevelByOP.reduce(selectOlderComment);

var siteTable = topLevelByOP.parentNode;
var clearer = topLevelByOP.nextSibling;

siteTable.removeChild(topLevelByOP);
siteTable.removeChild(clearer);

siteTable.insertBefore(clearer, siteTable.firstChild);
siteTable.insertBefore(topLevelByOP, siteTable.firstChild);

