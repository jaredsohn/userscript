// ==UserScript==
// @name           Dashboard Un-military Time
// @namespace      www.courtrivals.com/
// @include        http://www.courtrivals.com/dashboard.php
// @description    Converts the times on the Dashboard to AM/PM and formats the Items in Queue column to highlight queues that are not full.
// ==/UserScript==

var nowtrainingcells = new Array(), itemsinqueuecells = new Array(), tccells = new Array(), x = 0, y = 0, z = 0;

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
			nowtrainingcells[j] = cells.snapshotItem(i + 7 * (j + 1));
			itemsinqueuecells[j] = cells.snapshotItem(i + 7 * (j + 1) + 1);
			tccells[j] = cells.snapshotItem(i + 7 * (j + 1) + 2);
		}
	}
}

for(var i = 0; i < x; i++)
{
	if(nowtrainingcells[i].innerHTML.indexOf('<i>None</i>') == -1)
	{
		nowtrainingcells[i].innerHTML = nowtrainingcells[i].innerHTML.slice(0,nowtrainingcells[i].innerHTML.indexOf('(')+1) + convert(nowtrainingcells[i].innerHTML.slice(nowtrainingcells[i].innerHTML.indexOf('(')+1,nowtrainingcells[i].innerHTML.indexOf(')'))) + nowtrainingcells[i].innerHTML.slice(nowtrainingcells[i].innerHTML.indexOf(')'));
	}
	itemsinqueuecells[i].innerHTML = queueformat(itemsinqueuecells[i].innerHTML.slice(0,itemsinqueuecells[i].innerHTML.indexOf('(')+1) + convert(itemsinqueuecells[i].innerHTML.slice(itemsinqueuecells[i].innerHTML.indexOf('(')+1,itemsinqueuecells[i].innerHTML.indexOf(')'))) + itemsinqueuecells[i].innerHTML.slice(itemsinqueuecells[i].innerHTML.indexOf(')')), tccells[i].innerHTML.slice(0,tccells[i].innerHTML.indexOf('<img'))*1);
}

function convert(time)
{
	var x, suffix;

	var hour = time.slice(0,2) * 1;

	if(hour > 11)
	{
		suffix = 'PM';
	}
	else
	{
		suffix = 'AM';
	}

	if(hour > 12)
	{
		hour -= 12;
	}
	else if(hour < 1)
	{
		hour = 12
	}

	x = hour + time.slice(2) + ' ' + suffix;

	return x;
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