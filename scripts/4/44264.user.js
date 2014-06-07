// ==UserScript==
// @name           Unmilitary Time (AM/PM)
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/maingame.php
// ==/UserScript==

var links = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var j = 0;
for (var i = 0; i < links.snapshotLength; i++)
{
	var link = links.snapshotItem(i).href;
	if(link.indexOf("processing/canceltrain.php?id") != -1)
	{
		j++;
	}
}

var cells = document.evaluate(
	'//td[@bgcolor]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var times = new Array();
for(var i = 0; i < cells.snapshotLength; i++)
{
	var cell = cells.snapshotItem(i).innerHTML;
	if(cell.indexOf("processing/canceltrain.php?id") != -1)
	{
		if(cell.length < 200)
		{		
			var time = cells.snapshotItem(i - 1).innerHTML.slice(0,2) * 1;
			if(time < 1)
			{
				cells.snapshotItem(i - 1).innerHTML = "12" + cells.snapshotItem(i - 1).innerHTML.slice(2) + " AM";
			}
			else if(time < 10)
			{
				cells.snapshotItem(i - 1).innerHTML = cells.snapshotItem(i - 1).innerHTML.slice(1) + " AM";
			}
			else if(time < 12)
			{
				cells.snapshotItem(i - 1).innerHTML = cells.snapshotItem(i - 1).innerHTML + " AM";
			}
			else if(time < 13)
			{
				cells.snapshotItem(i - 1).innerHTML = cells.snapshotItem(i - 1).innerHTML + " PM";
			}
			else
			{
				cells.snapshotItem(i - 1).innerHTML = (cells.snapshotItem(i - 1).innerHTML.slice(0,2) * 1 - 12) + cells.snapshotItem(i - 1).innerHTML.slice(2) + " PM";
			}
		}
	}
}