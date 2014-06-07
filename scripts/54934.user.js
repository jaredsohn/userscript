// ==UserScript==
// @name           Player Page Makes and Attempts
// @namespace      http://www.courtrivals.com/
// @description    Adds makes and attempts for Field Goals, 3 point shots, and Free Throws in the Season Statistics section of the Player Page
// @include        http://www.courtrivals.com/showPlayerProfile.php?pid=*
// ==/UserScript==

var x = 0, fgm = 0, fga = 0, threem = 0, threea = 0, ftm = 0, fta = 0;

var cells = document.evaluate(
	'//td[@class="loginBottomText"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var links = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < links.snapshotLength; i++)
{
	var link = new String(links.snapshotItem(i));
	if(link.indexOf('showBoxscore') != -1)
	{
		x++;
	}
}

for(var i = 0; i < x; i++)
{
	fgm += dice1(cells.snapshotItem(10 * i + 1).innerHTML);
	fga += dice2(cells.snapshotItem(10 * i + 1).innerHTML);
	threem += dice1(cells.snapshotItem(10 * i + 2).innerHTML);
	threea += dice2(cells.snapshotItem(10 * i + 2).innerHTML);
	ftm += dice1(cells.snapshotItem(10 * i + 3).innerHTML);
	fta += dice2(cells.snapshotItem(10 * i + 3).innerHTML);
}

var seasonstatcells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < seasonstatcells.snapshotLength; i++)
{
	if(seasonstatcells.snapshotItem(i).innerHTML == '<div align="right">Field Goal % :</div>')
	{
		seasonstatcells.snapshotItem(i + 1).innerHTML += ' (' + fgm + ' of ' + fga + ')';
	}
	if(seasonstatcells.snapshotItem(i).innerHTML == '<div align="right">3 Point % :</div>')
	{
		seasonstatcells.snapshotItem(i + 1).innerHTML += ' (' + threem + ' of ' + threea + ')';
	}
	if(seasonstatcells.snapshotItem(i).innerHTML == '<div align="right">Free Throw % :</div>')
	{
		seasonstatcells.snapshotItem(i + 1).innerHTML += ' (' + ftm + ' of ' + fta + ')';
	}
}

function dice1(cell)
{
	var a = cell.slice(0,cell.indexOf('-')-1) * 1;

	return a;
}

function dice2(cell)
{
	var a = cell.slice(cell.indexOf('-')+1) * 1;

	return a;
}

