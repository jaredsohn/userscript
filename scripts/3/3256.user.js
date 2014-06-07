// ==UserScript==
// @name          ComputerWorld Block
// @namespace     http://cwblock.quovadis.dk/
// @description   Hide posts from obnoxious posters
// @include       http://*computerworld.dk/debat*
// ==/UserScript==

var kegler = new Array('Karen Lassen', 'S. asad', 'Brian Rasmussen (2)', 'Poul Christiansen');

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

kegler.sort();
var posts = xpath('//div[@class="agora-post"]');
for (var i = 0; i < posts.snapshotLength; i++)
{
	var header = posts.snapshotItem(i);
	var uid = header.getElementsByTagName('a').item(1).innerHTML;
	if (inArray(uid, kegler))
	{
		header.style.display = "none";
	}
}

