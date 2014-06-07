// ==UserScript==
// @name           Anti-Rickroll
// @namespace      http://www.courtrivals.com/
// @include        *
// ==/UserScript==

var rickrolls = new Array('http://www.rickrolling.com/','http://www.rickrolling.com','http://rickrolling.com','http://rickrolling.com/');
var warning = 0;

var scan, thisLink;
scan = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < scan.snapshotLength; i++)
{
	thisLink = scan.snapshotItem(i);
	for(var j = 0; j < rickrolls.length; j++)
	{
		if(thisLink == rickrolls[j])
		{
			thisLink.style.textDecoration = 'line-through';
		}
	}
}