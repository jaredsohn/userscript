// ==UserScript==
// @name           Career Averages
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/showPlayerProfile.php?pid=*
// ==/UserScript==

var cell, gmplayed;

var cells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < cells.snapshotLength; i++)
{
	if(cells.snapshotItem(i).innerHTML == '<div class="tableHeader" align="right"><strong>Games Played  :</strong></div>')
	{
		gmplayed = cells.snapshotItem(i + 1).innerHTML;
	}
	if(cells.snapshotItem(i).innerHTML == '<div class="tableHeader" align="right"><strong>Points  :</strong></div>')
	{
		var avgpts = cells.snapshotItem(i + 1).innerHTML / gmplayed;
		cells.snapshotItem(i + 1).innerHTML = cells.snapshotItem(i + 1).innerHTML + ' (' + avgpts.toFixed(1) + ')';
	}
	if(cells.snapshotItem(i).innerHTML == '<div align="right"><strong>Off Rebounds  :</strong></div>')
	{
		var avgoreb = cells.snapshotItem(i + 1).innerHTML / gmplayed;
		cells.snapshotItem(i + 1).innerHTML = cells.snapshotItem(i + 1).innerHTML + ' (' + avgoreb.toFixed(1) + ')';
	}
	if(cells.snapshotItem(i).innerHTML == '<div align="right"><strong>Total Rebounds  :</strong></div>')
	{
		var avgreb = cells.snapshotItem(i + 1).innerHTML / gmplayed;
		cells.snapshotItem(i + 1).innerHTML = cells.snapshotItem(i + 1).innerHTML + ' (' + avgreb.toFixed(1) + ')';
	}
	if(cells.snapshotItem(i).innerHTML == '<div align="right"><strong>Assists  :</strong></div>')
	{
		var avgast = cells.snapshotItem(i + 1).innerHTML / gmplayed;
		cells.snapshotItem(i + 1).innerHTML = cells.snapshotItem(i + 1).innerHTML + ' (' + avgast.toFixed(1) + ')';
	}
	if(cells.snapshotItem(i).innerHTML == '<div align="right"><strong>Steals :</strong></div>')
	{
		var avgstl = cells.snapshotItem(i + 1).innerHTML / gmplayed;
		cells.snapshotItem(i + 1).innerHTML = cells.snapshotItem(i + 1).innerHTML + ' (' + avgstl.toFixed(1) + ')';
	}
	if(cells.snapshotItem(i).innerHTML == '<div align="right"><strong>Blocks :</strong></div>')
	{
		var avgblk = cells.snapshotItem(i + 1).innerHTML / gmplayed;
		cells.snapshotItem(i + 1).innerHTML = cells.snapshotItem(i + 1).innerHTML + ' (' + avgblk.toFixed(1) + ')';
	}
	if(cells.snapshotItem(i).innerHTML == '<div align="right"><strong>Turnovers :</strong></div>')
	{
		var avgto = cells.snapshotItem(i + 1).innerHTML / gmplayed;
		cells.snapshotItem(i + 1).innerHTML = cells.snapshotItem(i + 1).innerHTML + ' (' + avgto.toFixed(1) + ')';
	}
}