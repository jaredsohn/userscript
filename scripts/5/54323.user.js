// ==UserScript==
// @name           Dashboard Queue Highlight
// @namespace      www.courtrivals.com/
// @description    Highlights players' queues when they aren't full
// @include        http://www.courtrivals.com/dashboard.php
// ==/UserScript==

var itemsinqueuecells = new Array(), tccells = new Array(), x = 0, y = 0, z = 0;

var cells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < cells.snapshotLength; i++)
{
	if(cells.snapshotItem(i).innerHTML.slice(0,22) == '<b><a href="processing')
	{
		x++;
	}
}

for(var i = 0; i < cells.snapshotLength; i++)
{
	if(cells.snapshotItem(i).innerHTML == 'Now Training' && cells.snapshotItem(i + 1).innerHTML == 'Items in Queue')
	{
		for(var j = 0; j < x; j++)
		{
			itemsinqueuecells[j] = cells.snapshotItem(i + 7 * (j + 1) + 1);
			tccells[j] = cells.snapshotItem(i + 7 * (j + 1) + 2);
		}
	}
}

for(var i = 0; i < x; i++)
{
	itemsinqueuecells[i].innerHTML = queueformat(itemsinqueuecells[i].innerHTML, tccells[i].innerHTML.slice(0,tccells[i].innerHTML.indexOf('<img'))*1);
}

function queueformat(queue, tcs)
{
	var y, number = queue.slice(0,1);

	if(tcs == 0)
	{
		y = '<font color="green"><b>' + queue + '</b></font>';
	}
	else if(number == 0)
	{
		y = '<font color="red"><b>EMPTY</b></font>';
	}
	else if(number < 5)
	{
		y = '<font color="orange"><b>' + queue + '</b></font>';
	}
	else
	{
		y = '<font color="green"><b>' + queue + '</b></font>';
	}

	return y;
}