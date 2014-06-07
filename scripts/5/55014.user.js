// ==UserScript==
// @name           Reddit comment feeds
// @namespace      tag:brainonfire.net,2009-08-03:reddit-comment-feeds
// @description    Provide smart comment feeds links for reddit posts, using some Yahoo Pipes I've also built. The links are placed just below the post header block, after "save" and "report".
// @include        http://www.reddit.com/r/*/comments/*
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


function getFullFeed(url) {
	return 'http://pipes.yahoo.com/pipes/pipe.run?_id=kjDQPpaA3hGodUXToBWqPg&_render=rss&feed=' + encodeURIComponent(url);
}

function getSelectiveFeed(url, opname) {
	return 'http://pipes.yahoo.com/pipes/pipe.run?_id=cgqOTJiA3hGesy9ZpJDuew&_render=rss&commenter=' + encodeURIComponent(opname) + '&feed=' + encodeURIComponent(url);
}

function addButton(url, text, explain) {
	var li = document.createElement('li');
	buttons.appendChild(li);
	var a = document.createElement('a');
	a.appendChild(document.createTextNode(text));
	a.setAttribute('href', url);
	a.setAttribute('title', explain);
	li.appendChild(a);
}

var buttons = $xpath("//div[@id='siteTable']//ul[contains(@class, 'buttons')]")[0];
var author = $xpath("//div[@id='siteTable']//a[contains(@class, 'author')]/text()")[0].nodeValue;

// Is this a thread or the full page?
var commentsFeed;
var matchThread = /(http:\/\/www\.reddit\.com\/r\/.+\/comments\/.+\/.+\/.+)(#.*)?/.exec(location);
if(matchThread == null) { // full page
	commentsFeed = $xpath("//div[@id='siteTable']//li/a[contains(@class, 'comments')]")[0].getAttribute('href');
} else { // thread, grab top permalink
	commentsFeed = $xpath("//div[contains(@class, 'commentarea')]//div[contains(@class, 'entry')][1]//ul[contains(@class, 'buttons')]/li[1]/a")[0].getAttribute('href');
}

if(commentsFeed.substr(0, 1) == '/')
	commentsFeed = 'http://wwww.reddit.com' + commentsFeed;
if(commentsFeed.substr(-1) != '/')
	commentsFeed += '/';
commentsFeed += '.rss';

addButton(getFullFeed(commentsFeed), 'Comments (all)', "All comments in thread/page");
addButton(getSelectiveFeed(commentsFeed, author), 'Comments (OP)', "OP's comments in thread/page");
