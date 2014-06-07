// ==UserScript==
// @name           Game Analysis Upgrade
// @namespace      www.courtrivals.com/
// @include        http://www.courtrivals.com/showBoxscore.php?gid=*
// ==/UserScript==

var bullets = new Array(), line = new Array(), team = new Array(), attributes = new Array(), team1s = new Array(), team2s = new Array(), team1b = new Array(), team2b = new Array();

var analysis = document.evaluate(
	'//li',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i = 0; i < analysis.snapshotLength; i++)
{
	bullets[i] = analysis.snapshotItem(i).innerHTML.slice(analysis.snapshotItem(i).innerHTML.indexOf('"UnTip()">')+10).slice(analysis.snapshotItem(i).innerHTML.slice(analysis.snapshotItem(i).innerHTML.indexOf('"UnTip()">')+10).indexOf('<b>')+3);
	if(bullets[i].slice(0,8) == 'starters')
	{
		line[i] = 's';
		team[i] = bullets[i].slice(13,bullets[i].indexOf('</b>'));
	}
	else
	{
		line[i] = 'b';
		team[i] = bullets[i].slice(18,bullets[i].indexOf('</b>'));
	}

	bullets[i] = bullets[i].slice(bullets[i].indexOf('</b>')+4,bullets[i].indexOf('<b>'));

	if(bullets[i] == ' appeared quicker than the ')
	{
		attributes[i] = 'Speed';
	}
	else if(bullets[i] == ' were able to push the ball up the floor faster thanks to their superior ball handling and create more scoring opportunities.  The missed three pointers by the ')
	{
		attributes[i] = 'Ball Handling';
	}
	else if(bullets[i] == ' were able to move the ball extremely effectively on the offensive end of the floor due to their superior passing ability. This led to long possessions which tired out the defense of the ')
	{
		attributes[i] = 'Passing';
	}
	else if(bullets[i] == ' had a superior mid-range game today when compared to the ')
	{
		attributes[i] = 'Shooting';
	}
	else if(bullets[i] == ' were able to exploit the defense of the ')
	{
		attributes[i] = '3pt Shooting';
	}
	else if(bullets[i] == ' were more active attacking the basket and attempting to draw fouls than the ')
	{
		attributes[i] = 'Free Throw Shooting';
	}
	else if(bullets[i] == ' had a dominant inside-game today. On the other hand, the ')
	{
		attributes[i] = 'Dunking';
	}
	else if(bullets[i] == ' outperformed the rebounders for the ')
	{
		attributes[i] = 'Rebounding';
	}
	else if(bullets[i] == ' had shot blockers clogging the lane that intimidated the shooters of the ')
	{
		attributes[i] = 'Blocking';
	}
	else if(bullets[i] == ' had superior defenders which generated many missed opportunities for the ')
	{
		attributes[i] = 'Defense';
	}
	else if(bullets[i] == ' exhibited superior leadership and acted like the more composed team when compared to the ')
	{
		attributes[i] = 'Leadership';
	}
}

var teams = document.evaluate(
	'//p[@class="registerNow"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

team1a = teams.snapshotItem(0).innerHTML;
team2a = teams.snapshotItem(1).innerHTML;

var team1 = teams.snapshotItem(0).innerHTML.slice(teams.snapshotItem(0).innerHTML.indexOf('">')+2,teams.snapshotItem(0).innerHTML.indexOf('</a>'));
var team2 = teams.snapshotItem(1).innerHTML.slice(teams.snapshotItem(1).innerHTML.indexOf('">')+2,teams.snapshotItem(1).innerHTML.indexOf('</a>'));

/*
var team1 = teams.snapshotItem(0).innerHTML.slice(teams.snapshotItem(0).innerHTML.indexOf('tid=')+4,teams.snapshotItem(0).innerHTML.indexOf('">'));
var team2 = teams.snapshotItem(1).innerHTML.slice(teams.snapshotItem(1).innerHTML.indexOf('tid=')+4,teams.snapshotItem(1).innerHTML.indexOf('">'));

team1 = 'http://www.courtrivals.com/showTeamStats.php?tid=' + team1;
team2 = 'http://www.courtrivals.com/showTeamStats.php?tid=' + team2;

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

	}
})*/

var a = 0, b = 0, c = 0, d = 0;

for(var i = 0; i < attributes.length; i++)
{
	if(line[i] == 's' && team[i] == team1)
	{
		team1s[a] = attributes[i];
		a++;
	}
	else if(line[i] == 's' && team[i] == team2)
	{
		team2s[b] = attributes[i];
		b++;
	}
	else if(line[i] == 'b' && team[i] == team1)
	{
		team1b[c] = attributes[i];
		c++;
	}
	else if(line[i] == 'b' && team[i] == team2)
	{
		team2b[d] = attributes[i];
		d++;
	}
}

var team1s2 = stack(team1s);
var team2s2 = stack(team2s);
var team1b2 = stack(team1b);
var team2b2 = stack(team2b);

var newanalysis = document.evaluate(
	'//table[@width="80%"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

newanalysis.snapshotItem(0).innerHTML = 	'<tr><td bgcolor="#000000" colspan="3"><div align="center" class="tableHeader2">Analysis **BETA**</div></td></tr>' +
						'<tr><td bgcolor="#C6C6A8" width="10%" align="center"></td>' +
							'<td bgcolor="#C6C6A8" width="45%" align="center"><b>' + team1a + '</b></td>' +
							'<td bgcolor="#C6C6A8" width="45%" align="center"><b>' + team2a + '</b></td></tr>' +
						'<tr><td bgcolor="#C6C6A8" width="10%" align="center"><b>Starters</b></td>' +
							'<td bgcolor="#F1E7C5" width="45%" align="center"><b>' + team1s2 + '</b></td>' +
							'<td bgcolor="#F1E7C5" width="45%" align="center"><b>' + team2s2 + '</b></td></tr>' +
						'<tr><td bgcolor="#C6C6A8" width="10%" align="center"><b>Bench</b></td>' +
							'<td bgcolor="#F1E7C5" width="45%" align="center"><b>' + team1b2 + '</b></td>' +
							'<td bgcolor="#F1E7C5" width="45%" align="center"><b>' + team2b2 + '</b></td></tr>';

function stack(team)
{
	var x;

	if(team.length == 0)
	{
		x = team;
	}
	else
	{
		for(var i = 0; i < team.length; i++)
		{
			if(i == 0)
			{
				x = team[0];
			}
			else
			{
				x = x + '<br>' + team[i];
			}
		}
	}

	return x;
}
