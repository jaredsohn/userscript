// ==UserScript==
// @name		Locker Room Chatter Plus
// @namespace		http://www.courtrivals.com/
// @summary		Jumps to the actual post from the Latest Locker Room Chatter section. UPDATE: Now more efficient and sporadic punctuation-related error corrected
// @include		http://www.courtrivals.com/maingame.php
// @include		http://courtrivals.com/maingame.php
// ==/UserScript==

var cells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < cells.snapshotLength; i++)
{
	if(cells.snapshotItem(i).innerHTML == "Thread" && cells.snapshotItem(i + 1).innerHTML == "Author")
	{
		for(var j = 0; j < 6; j++)
		{
			cells.snapshotItem(i + 3 + 2 * j).innerHTML = '<a href="' + cells.snapshotItem(i + 2 + 2 * j).innerHTML.slice(cells.snapshotItem(i + 2 + 2 * j).innerHTML.indexOf('="') + 2,cells.snapshotItem(i + 2 + 2 * j).innerHTML.indexOf('">')) + '#p' + cells.snapshotItem(i + 2 + 2 * j).innerHTML.slice(cells.snapshotItem(i + 2 + 2 * j).innerHTML.indexOf('pid=') + 4,cells.snapshotItem(i + 2 + 2 * j).innerHTML.indexOf('">')) + '">' + cells.snapshotItem(i + 3 + 2 * j).innerHTML;
		}
	}
}