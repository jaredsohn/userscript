// ==UserScript==
// @name		Locker Room Chatter Plus
// @namespace		http://www.courtrivals.com/
// @description		Jumps to the actual post from the Latest Locker Room Chatter section.
// @include		http://www.courtrivals.com/maingame.php
// @include		http://courtrivals.com/maingame.php
// ==/UserScript==

var scan2;
scan2 = document.evaluate(
	'//td[@class="loginBottomText"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var scan3 = document.evaluate(
		'//html',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

var reference = scan3.snapshotItem(0).innerHTML;
reference = reference.indexOf("Watch live play-by-play now!");

if(reference == -1)
{
	var i = 11;
}
else
{
	var i = 10;
}
scan2.snapshotItem(i + 1).innerHTML = '<a href="' + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")) + "#p" + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).slice(scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).indexOf("=")+1) + '">' + scan2.snapshotItem(i + 1).innerHTML;
i += 2;
scan2.snapshotItem(i + 1).innerHTML = '<a href="' + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")) + "#p" + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).slice(scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).indexOf("=")+1) + '">' + scan2.snapshotItem(i + 1).innerHTML;
i += 2;
scan2.snapshotItem(i + 1).innerHTML = '<a href="' + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")) + "#p" + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).slice(scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).indexOf("=")+1) + '">' + scan2.snapshotItem(i + 1).innerHTML;
i += 2;
scan2.snapshotItem(i + 1).innerHTML = '<a href="' + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")) + "#p" + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).slice(scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).indexOf("=")+1) + '">' + scan2.snapshotItem(i + 1).innerHTML;
i += 2;
scan2.snapshotItem(i + 1).innerHTML = '<a href="' + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")) + "#p" + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).slice(scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).indexOf("=")+1) + '">' + scan2.snapshotItem(i + 1).innerHTML;
i += 2;
scan2.snapshotItem(i + 1).innerHTML = '<a href="' + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")) + "#p" + scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).slice(scan2.snapshotItem(i).innerHTML.slice(scan2.snapshotItem(i).innerHTML.indexOf("\"") + 1,scan2.snapshotItem(i).innerHTML.lastIndexOf("\"")).indexOf("=")+1) + '">' + scan2.snapshotItem(i + 1).innerHTML;

