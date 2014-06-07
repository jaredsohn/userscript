// ==UserScript==
// @name           Player Career Highs
// @namespace      http://www.courtrivals.com/
// @description    Adds Career Highs to the Player Page
// @include        http://www.courtrivals.com/showPlayerProfile.php?pid=*
// ==/UserScript==

// ********************************************************************
// Current Season
// ********************************************************************

var x = 0, fgm = 0, fga = 0, threem = 0, threea = 0, ftm = 0, fta = 0, reb = 0, ast = 0, stl = 0, blk = 0, pts = 0;
var date = 0, fgmdate = 0, fgadate = 0, threemdate = 0, threeadate = 0, ftmdate = 0, ftadate = 0, rebdate = 0, astdate = 0, stldate = 0, blkdate = 0, ptsdate = 0;
var fgmseason = 0, fgaseason = 0, threemseason = 0, threeaseason = 0, ftmseason = 0, ftaseason = 0, rebseason = 0, astseason = 0, stlseason = 0, blkseason = 0, ptsseason = 0;

var currentseason = document.getElementById("frmSeason").innerHTML.slice(document.getElementById("frmSeason").innerHTML.indexOf('"') + 1);
currentseason = currentseason.slice(0,currentseason.indexOf('"')) * 1;

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

// ********************************************************************
// Past Seasons
// ********************************************************************

var reference = new Array(), lastupdate2 = 0;

var lastupdate = GM_getValue('lastupdate',1);

if(currentseason == lastupdate)
{
	createtable();
}
else
{
	for(lastupdate; lastupdate < currentseason + 1; lastupdate++)
	{
		retrieve(lastupdate);
	}
}

function retrieve(season)
{
	var url = window.location.href;

	if(url.indexOf("&") != -1)
	{
		url = url.slice(0,url.indexOf('&'));
	}
	
	url += '&s=' + season;

	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: url,
		headers:
		{
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails)
		{
			reference[season] = responseDetails.responseText;
			pastseasondice(reference[season], season);
		}
	})
}

function pastseasondice(reference, season)
{
	reference = reference.slice(reference.indexOf('<th colspan="10" align="center" bgcolor="#996633" class="tableHeader2">Game Log</th>'));
	reference = reference.slice(reference.indexOf('<tbody>'),reference.indexOf('</tbody>'));

	for(var i = 0; i > -1; i++)
	{
		if(reference.indexOf('</tr>') != -1)
		{
			gamedice(reference.slice(0,reference.indexOf('</tr>')), season);
			reference = reference.slice(reference.indexOf('</tr>') + 5);
		}
		else
		{
			lastupdate2++;
			break;
		}
	}
}

function gamedice(text, season)
{
	if(text.indexOf('<i>Has not played in any games this season</i>') == -1)
	{
		date = text.slice(text.indexOf('">') + 2,text.indexOf('</td>'));
		text = text.slice(text.indexOf('</td>') + 4);

		fgm = dice1(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')),fgm,'fgm',date,season);
		fga = dice2(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')),fga,'fga',date,season);
		text = text.slice(text.indexOf('</td>') + 4);

		threem = dice1(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')),threem,'threem',date,season);
		threea = dice2(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')),threea,'threea',date,season);
		text = text.slice(text.indexOf('</td>') + 4);

		ftm = dice1(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')),ftm,'ftm',date,season);
		fta = dice2(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')),fta,'fta',date,season);
		text = text.slice(text.indexOf('</td>') + 4);
	
		reb = dice4(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')) * 1,reb,'reb',date,season);
		text = text.slice(text.indexOf('</td>') + 4);

		ast = dice4(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')) * 1,ast,'ast',date,season);
		text = text.slice(text.indexOf('</td>') + 4);

		stl = dice4(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')) * 1,stl,'stl',date,season);
		text = text.slice(text.indexOf('</td>') + 4);

		blk = dice4(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')) * 1,blk,'blk',date,season);
		text = text.slice(text.indexOf('</td>') + 4);
		text = text.slice(text.indexOf('</td>') + 4);

		pts = dice4(text.slice(text.indexOf('">') + 2,text.indexOf('</td>')) * 1,pts,'pts',date,season);
		
	}
}

timer();
function timer()
{
	if(lastupdate2 == currentseason)
	{
		//GM_setValue('lastupdate',currentseason);
		createtable();
	}
	else
	{
		window.setTimeout( function()
		{
			timer();
		}, 250);
	}
}

function createtable()
{
	accomplishments = document.getElementById('gamelogpane');

	var seasonhightable = document.createElement('div');
	seasonhightable.innerHTML = '<br/><table width="80%" border="0" align="center" cellpadding="2" cellspacing="1" bgcolor="#000000">' +
				'<tr><td colspan="2" bgcolor="#CC0000" class="tableHeader2"><div align="left" class="tableHeader2">Career Highs <a href="javascript:toggleDiv(' + "'chdiv');" + '"><img src="images/collapsearrow.gif" width="16" height="16" border="0" /></a></div></td></tr></table>' +
			'<div id="chdiv" align="center" style="display:block">' +
			'<table width="80%" border="0" align="center" cellpadding="2" cellspacing="1" bgcolor="#000000">' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Points  :</strong></div></td>' +
				'<td class="loginBottomText">' + pts + '</td>' +
				'<td class="loginBottomText">Season ' + ptsseason + ' (' + ptsdate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Rebounds  :</strong></div></td>' +
				'<td class="loginBottomText">' + reb + '</td>' +
				'<td class="loginBottomText">Season ' + rebseason + ' (' + rebdate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Assists  :</strong></div></td>' +
				'<td class="loginBottomText">' + ast + '</td>' +
				'<td class="loginBottomText">Season ' + astseason + ' (' + astdate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Field Goals Made  :</strong></div></td>' +
				'<td class="loginBottomText">' + fgm + '</td>' +
				'<td class="loginBottomText">Season ' + fgmseason + ' (' + fgmdate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Field Goals Attempted  :</strong></div></td>' +
				'<td class="loginBottomText">' + fga + '</td>' +
				'<td class="loginBottomText">Season ' + fgaseason + ' (' + fgadate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>3pt Made  :</strong></div></td>' +
				'<td class="loginBottomText">' + threem + '</td>' +
				'<td class="loginBottomText">Season ' + threemseason + ' (' + threemdate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>3pt Attempted  :</strong></div></td>' +
				'<td class="loginBottomText">' + threea + '</td>' +
				'<td class="loginBottomText">Season ' + threeaseason + ' (' + threeadate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Free Throws Made  :</strong></div></td>' +
				'<td class="loginBottomText">' + ftm + '</td>' +
				'<td class="loginBottomText">Season ' + ftmseason + ' (' + ftmdate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Free Throws Attempted  :</strong></div></td>' +
				'<td class="loginBottomText">' + fta + '</td>' +
				'<td class="loginBottomText">Season ' + ftaseason + ' (' + ftadate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Steals  :</strong></div></td>' +
				'<td class="loginBottomText">' + stl + '</td>' +
				'<td class="loginBottomText">Season ' + stlseason + ' (' + stldate + ')</td></tr>' +
			'<tr bgcolor="#EDEDDC"><td width="50%" class="loginBottomText"><div align="right" class="tableHeader"><strong>Blocks  :</strong></div></td>' +
				'<td class="loginBottomText">' + blk + '</td>' +
				'<td class="loginBottomText">Season ' + blkseason + ' (' + blkdate + ')</td></tr>' +
			'</table></div>';

	accomplishments.parentNode.insertBefore(seasonhightable, accomplishments.nextSibling);
}