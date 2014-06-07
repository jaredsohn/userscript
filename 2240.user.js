// ==UserScript==
// @name          Fark Block
// @namespace     http://farkblock.quovadis.dk/
// @description   Hide posts from obnoxious Farkers
// @include       http://forums.fark.com/*
// ==/UserScript==

var farkers = new Array('Big Al', 'smoovement');

function xpath(query, context)
{
	var cx = (arguments.length < 2) ? document : context;
	return document.evaluate(query, cx, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function inArray(needle, haystack)
{
	for (var i = 0; i < haystack.length; i++)
	{
		if (needle == haystack[i]) return true;
		if (needle < haystack[i]) return false;
	}
	return false;
}

farkers.sort();
var posts = xpath('//table[@class="ctable"]');
for (var i = 0; i < posts.snapshotLength; i++)
{
	var header = posts.snapshotItem(i);
	var uid = header.getElementsByTagName('a').item(0).innerHTML;
	if (inArray(uid, farkers))
	{
		var br1 = header.nextSibling.nextSibling;
		var body = br1.nextSibling;
		var br2 = body.nextSibling;
		var p = header.parentNode;
		p.removeChild(header);
		p.removeChild(br1);
		p.removeChild(body);
		p.removeChild(br2);
	}
}

