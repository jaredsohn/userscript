// ==UserScript==
// @name           Player Season Highs
// @namespace      http://www.courtrivals.com/
// @description    Displays the Season Highs on the Player Page
// @include        http://www.courtrivals.com/showPlayerProfile.php?pid=*
// ==/UserScript==

var x = 0, fgm = 0, fga = 0, threem = 0, threea = 0, ftm = 0, fta = 0, reb = 0, ast = 0, stl = 0, blk = 0, pts = 0;
var date = 0, fgmdate = 0, fgadate = 0, threemdate = 0, threeadate = 0, ftmdate = 0, ftadate = 0, rebdate = 0, astdate = 0, stldate = 0, blkdate = 0, ptsdate = 0;
var fgmseason = 0, fgaseason = 0, threemseason = 0, threeaseason = 0, ftmseason = 0, ftaseason = 0, rebseason = 0, astseason = 0, stlseason = 0, blkseason = 0, ptsseason = 0;

var currentseason = document.getElementById("frmSeason").innerHTML.slice(document.getElementById("frmSeason").innerHTML.indexOf('"') + 1);
currentseason = currentseason.slice(0,currentseason.indexOf('"')) * 1;

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
	date = cells.snapshotItem(10 * i).innerHTML;
	fgm = dice1(cells.snapshotItem(10 * i + 1).innerHTML,fgm,'fgm',date,currentseason);
	fga = dice2(cells.snapshotItem(10 * i + 1).innerHTML,fga,'fga',date,currentseason);
	threem = dice1(cells.snapshotItem(10 * i + 2).innerHTML,threem,'threem',date,currentseason);
	threea = dice2(cells.snapshotItem(10 * i + 2).innerHTML,threea,'threea',date,currentseason);
	ftm = dice1(cells.snapshotItem(10 * i + 3).innerHTML,ftm,'ftm',date,currentseason);
	fta = dice2(cells.snapshotItem(10 * i + 3).innerHTML,fta,'fta',date,currentseason);
	reb = dice4(cells.snapshotItem(10 * i + 4).innerHTML * 1,reb,'reb',date,currentseason);
	ast = dice4(cells.snapshotItem(10 * i + 5).innerHTML * 1,ast,'ast',date,currentseason);
	stl = dice4(cells.snapshotItem(10 * i + 6).innerHTML * 1,stl,'stl',date,currentseason);
	blk = dice4(cells.snapshotItem(10 * i + 7).innerHTML * 1,blk,'blk',date,currentseason);
	pts = dice4(cells.snapshotItem(10 * i + 9).innerHTML * 1,pts,'pts',date,currentseason);
}

// ********************************************************************
// Current Season Functions
// ********************************************************************

function dice1(cell, old, category, date, season)
{
	var a = cell.slice(0,cell.indexOf('-')-1) * 1;

	if(a < old)
	{
		a = old;
	}
	else
	{
		if(category == 'fgm')
		{
			fgmdate = date;
			fgmseason = season;
		}
		else if(category == 'threem')
		{
			threemdate = date;
			threemseason = season;
		}
		else if(category == 'ftm')
		{
			ftmdate = date;
			ftmseason = season;
		}
	}

	return a;
}

function dice2(cell, old, category, date, season)
{
	var a = cell.slice(cell.indexOf('-')+1) * 1;

	if(a < old)
	{
		a = old;
	}
	else
	{
		if(category == 'fga')
		{
			fgadate = date;
			fgaseason = season;
		}
		else if(category == 'threea')
		{
			threeadate = date;
			threeaseason = season;
		}
		else if(category == 'fta')
		{
			ftadate = date;
			ftaseason = season;
		}
	}

	return a;
}

function dice4(a, old, category, date, season)
{
	if(a < old)
	{
		a = old;
	}
	else
	{
		if(category == 'reb')
		{
			rebdate = date;
			rebseason = season;
		}
		else if(category == 'ast')
		{
			astdate = date;
			astseason = season;
		}
		else if(category == 'stl')
		{
			stldate = date;
			stlseason = season;
		}
		else if(category == 'blk')
		{
			blkdate = date;
			blkseason = season;
		}
		else if(category == 'pts')
		{
			ptsdate = date;
			ptsseason = season;
		}
	}

	return a;
}

accomplishments = document.getElementById('gamelogpane');

var seasonhightable = document.createElement('div');
seasonhightable.innerHTML = '<br/><table width="80%" border="0" align="center" cellpadding="2" cellspacing="1" bgcolor="#000000">' +
			'<tr><td colspan="2" bgcolor="#0099CC" class="tableHeader2"><div align="left" class="tableHeader2">Season Highs <a href="javascript:toggleDiv(' + "'shdiv');" + '"><img src="images/collapsearrow.gif" width="16" height="16" border="0" /></a></div></td></tr></table>' +
		'<div id="shdiv" align="center" style="display:block">' +
		'<table width="80%" border="0" align="center" cellpadding="2" cellspacing="1" bgcolor="#000000">' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Points  :</strong></div></td>' +
			'<td class="loginBottomText">' + pts + '</td>' +
			'<td class="loginBottomText">' + ptsdate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Rebounds  :</strong></div></td>' +
			'<td class="loginBottomText">' + reb + '</td>' +
			'<td class="loginBottomText">' + rebdate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Assists  :</strong></div></td>' +
			'<td class="loginBottomText">' + ast + '</td>' +
			'<td class="loginBottomText">' + astdate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Field Goals Made  :</strong></div></td>' +
			'<td class="loginBottomText">' + fgm + '</td>' +
			'<td class="loginBottomText">' + fgmdate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Field Goals Attempted  :</strong></div></td>' +
			'<td class="loginBottomText">' + fga + '</td>' +
			'<td class="loginBottomText">' + fgadate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>3pt Made  :</strong></div></td>' +
			'<td class="loginBottomText">' + threem + '</td>' +
			'<td class="loginBottomText">' + threemdate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>3pt Attempted  :</strong></div></td>' +
			'<td class="loginBottomText">' + threea + '</td>' +
			'<td class="loginBottomText">' + threeadate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Free Throws Made  :</strong></div></td>' +
			'<td class="loginBottomText">' + ftm + '</td>' +
			'<td class="loginBottomText">' + ftmdate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Free Throws Attempted  :</strong></div></td>' +
			'<td class="loginBottomText">' + fta + '</td>' +
			'<td class="loginBottomText">' + ftadate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Steals  :</strong></div></td>' +
			'<td class="loginBottomText">' + stl + '</td>' +
			'<td class="loginBottomText">' + stldate + '</td></tr>' +
		'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Blocks  :</strong></div></td>' +
			'<td class="loginBottomText">' + blk + '</td>' +
			'<td class="loginBottomText">' + blkdate + '</td></tr>' +
		'</table></div>';

accomplishments.parentNode.insertBefore(seasonhightable, accomplishments.nextSibling);