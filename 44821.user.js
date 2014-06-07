// ==UserScript==
// @name           Average Team Stats
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/showTeamProfile.php?tid=*
// ==/UserScript==

var link, table, roster, teamstats, team0pf = 0, team0pa = 0, j = 0;

var page = document.evaluate(
	'//body',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

page = page.snapshotItem(0).innerHTML;

if(page.indexOf("This team has not played any games so far this season") != -1)
{
	team0pf = "-";
	team0pa = "-";
}
else
{
	var links = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for(var i = 0; i < links.snapshotLength; i++)
	{
		link = links.snapshotItem(i).innerHTML;
		if(link.slice(0,2) == "W " || link.slice(0,2) == "L " && link.indexOf("-") != -1)
		{
			team0pa += link.slice(link.indexOf("-") + 1) * 1;
			team0pf += link.slice(2,link.indexOf("-")) * 1;
			j++;
		}
	}

	team0pa = team0pa / j;
	team0pf = team0pf / j;
	team0pf = team0pf.toFixed(1);
	team0pa = team0pa.toFixed(1);
}
	
var tables = document.evaluate(
	'//table[@cellpadding="2"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

roster = tables.snapshotItem(0);

teamstats = document.createElement('p');
teamstats.innerHTML = '<center><p>&nbsp;</p><table id="teamstats" width="350" align="center" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
		'<tr><td colspan="2" bgcolor="#1D3F06" class="tableHeader2"><strong>Team Stats</strong></td></tr>' +
		'<tr><td width="70%" align="center" bgcolor="#C6C6A8"><strong>Points For (per game)</strong></td>' +
			'<td width="30%" align="center" bgcolor="#F1E7C5"><strong>' + team0pf + '</strong></td></tr>' +
		'<tr><td width="70%" align="center" bgcolor="#C6C6A8"><strong>Points Against (per game)</strong></td>' +
			'<td width="30%" align="center" bgcolor="#F1E7C5"><strong>' + team0pa + '</strong></td></tr>' +
			'</table></center>';

roster.parentNode.insertBefore(teamstats, roster.nextSibling);
