// ==UserScript==
// @name		Next Matchup
// @namespace		http://www.courtrivals.com/
// @include		http://www.courtrivals.com/teams.php*
// ==/UserScript==

var l = 0, reference0, reference1, reference2, teams = new Array(), teamnames = new Array(), team0url, team1url, team1url2, team0pa = 0, team0pf = 0, link, tbd, cells, matchupPreview = "";

matchupbutton();
function matchupbutton()
{
	cells = document.evaluate(
		'//td[@width="100"]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for(var i = 0; i < cells.snapshotLength; i++)
	{
		if(cells.snapshotItem(i).innerHTML.slice(0,3) == "TBD")
		{
			tbd = cells.snapshotItem(i);
			tbd.innerHTML = '<input type="button" id="preview" value="Matchup"></input>';
			tbd.addEventListener('click', function()
			{
				l++;
				postclick();
			}, false);
		}
	}
}

function postclick()
{
	if(l == 1)
	{
		tbd.innerHTML = 'Loading ...';
		matchup();
	}
}

function matchup()
{
	var links = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);

	var j = 0;
	for(var i = 0; i < links.snapshotLength; i++)
	{
		var link = links.snapshotItem(i).href;
		if(link.indexOf("showTeamProfile") != -1)
		{
			teams[j] = links.snapshotItem(i);
			teamnames[j] = links.snapshotItem(i).innerHTML;
			j++;
		}
	}

	j = 0;
	for(var i = 0; i < links.snapshotLength; i++)
	{
		link = links.snapshotItem(i).innerHTML;
		if(link.slice(0,2) == "W " || link.slice(0,2) == "L ")
		{
			team0pa += link.slice(link.indexOf("-") + 1) * 1;
			team0pf += link.slice(2,link.indexOf("-")) * 1;
			j++;
		}
	}

	team0pa = team0pa / j;
	team0pf = team0pf / j;

	team0url = "http://www.courtrivals.com/showTeamStats.php?tid=" + teams[0].href.slice(teams[0].href.indexOf("=") + 1);
	team1url = "http://www.courtrivals.com/showTeamStats.php?tid=" + teams[1].href.slice(teams[1].href.indexOf("=") + 1);
	team1url2 = "http://www.courtrivals.com/showTeamProfile.php?tid=" + teams[1].href.slice(teams[1].href.indexOf("=") + 1);

	GM_xmlhttpRequest({
		method: 'GET',
		url: team0url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails)
		{
			reference0 = responseDetails.responseText;	
		}
	});

	GM_xmlhttpRequest({
		method: 'GET',
		url: team1url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails)
		{
			reference1 = responseDetails.responseText;	
		}
	});

	GM_xmlhttpRequest({
		method: 'GET',
		url: team1url2,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails)
		{
			reference2 = responseDetails.responseText;	
		}
	});

	reset();
}

function reset()
{
	window.setTimeout( function()
	{
		if(reference0 != undefined && reference1 != undefined && reference2 != undefined)
		{
			reference0 = reference0.slice(reference0.indexOf("TEAM :</b></td>") + 16);
			reference0 = reference0.slice(reference0.indexOf("</td>") + 5);
			reference0 = reference0.slice(reference0.indexOf(">") + 1);
			var fg0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference0 = trim(reference0);
			var threes0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference0 = trim(reference0);
			var ft0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference0 = trim(reference0);
			var reb0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference0 = trim(reference0);
			var ast0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference0 = trim(reference0);
			var stl0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference0 = trim(reference0);
			var blk0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference0 = trim(reference0);
			var to0 = reference0.slice(0,reference0.indexOf("<")) * 1;

			reference1 = reference1.slice(reference1.indexOf("TEAM :</b></td>") + 16);
			reference1 = reference1.slice(reference1.indexOf("</td>") + 5);
			reference1 = reference1.slice(reference1.indexOf(">") + 1);
			var fg1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference1 = trim(reference1);
			var threes1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference1 = trim(reference1);
			var ft1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference1 = trim(reference1);
			var reb1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference1 = trim(reference1);
			var ast1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference1 = trim(reference1);
			var stl1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference1 = trim(reference1);
			var blk1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference1 = trim(reference1);
			var to1 = reference1.slice(0,reference1.indexOf("<")) * 1;

			reference2 = reference2.slice(reference2.indexOf("showBoxscore.php?gid"));
			var team1pf = 0, team1pa = 0, j = 0; 

			for(var i = 1; i > 0; i++)
			{
				if(reference2.indexOf("showBoxscore.php?gid") != -1)
				{
					reference2 = reference2.slice(reference2.indexOf("showBoxscore.php?gid"));
					team1pf += reference2.slice(reference2.indexOf(" ") + 1,reference2.indexOf("-")) * 1;
					team1pa += reference2.slice(reference2.indexOf("-") + 1,reference2.indexOf("<")) * 1;
					reference2 = reference2.slice(1);
					j++
				}
				else
				{
					break;
				}
			}

			team1pf = team1pf / j;
			team1pa = team1pa / j;

			tbd.innerHTML = 'TBD';

			var icon1 = "", icon2 = "", icon3 = "", icon4 = "", icon5 = "", icon6 = "", icon7 = "", icon8 = "", icon9 = "", icon10 = "", icon11 = "", icon12 = "", icon13 = "", icon14 = "", icon15 = "", icon16 = "", icon17 = "", icon18 = "", icon19 = "", icon20 = "";

			if(team0pf > team1pf)
			{
				icon1 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(team0pf < team1pf)
			{
				icon2 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon1 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon2 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(team0pa > team1pa)
			{
				icon4 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(team0pa < team1pa)
			{
				icon3 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon3 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon4 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(fg0 > fg1)
			{
				icon5 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(fg0 < fg1)
			{
				icon6 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon5 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon6 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(threes0 > threes1)
			{
				icon7 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(threes0 < threes1)
			{
				icon8 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon7 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon8 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(ft0 > ft1)
			{
				icon9 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(ft0 < ft1)
			{
				icon10 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon9 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon10 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(reb0 > reb1)
			{
				icon11 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(reb0 < reb1)
			{
				icon12 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon11 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon12 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(ast0 > ast1)
			{
				icon13 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(ast0 < ast1)
			{
				icon14 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon13 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon14 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(stl0 > stl1)
			{
				icon15 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(stl0 < stl1)
			{
				icon16 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon15 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon16 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(blk0 > blk1)
			{
				icon17 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(blk0 < blk1)
			{
				icon18 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon17 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon18 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}

			if(to0 > to1)
			{
				icon20 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else if(to0 < to1)
			{
				icon19 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			else
			{
				icon19 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
				icon20 = '<img  src="http://www.courtrivals.com/images/challenge_W_icon.gif">';
			}
			 

			var schedule = document.getElementById('teamPage');
			matchupPreview = document.createElement('table');
			matchupPreview.innerHTML = '<center><table id="preview" width="400" border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
				'<tr><td colspan="6" bgcolor="#660000" class="tableHeader2"><strong>Next Matchup</strong></td></tr>' +
				'<tr><td colspan="3" width="50%" align="center" bgcolor="#C6C6A8"><strong><a href="' + teams[0] + '">' + teamnames[0] + '</a></strong></td>' +
					'<td colspan="3" width="50%" align="center" bgcolor="#C6C6A8"><strong><a href="' + teams[1] + '">' + teamnames[1] + '</a></strong></td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon1 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + team0pf.toFixed(1) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>PF</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + team1pf.toFixed(1) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon2 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon3 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + team0pa.toFixed(1) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>PA</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + team1pa.toFixed(1) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon4 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon5 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + fg0.toFixed(3) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>FG %</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + fg1.toFixed(3) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon6 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon7 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + threes0.toFixed(3) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>3Pt %</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + threes1.toFixed(3) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon8 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon9 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + ft0.toFixed(3) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>FT %</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + ft1.toFixed(3) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon10 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon11 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + reb0.toFixed(1) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>REB</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + reb1.toFixed(1) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon12 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon13 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + ast0.toFixed(1) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>AST</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + ast1.toFixed(1) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon14 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon15 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + stl0.toFixed(1) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>STL</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + stl1.toFixed(1) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon16 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon17 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + blk0.toFixed(1) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>BLK</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + blk1.toFixed(1) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon18 + '</td></tr>' +
				'<tr><td width="10%" align="center" bgcolor="#F1E7C5">' + icon19 + '</td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + to0.toFixed(1) + '</td>' +
					'<td colspan="2" width="20%" align="center" bgcolor="#C6C6A8"><strong>TO</strong></td>' +
					'<td width="30%" align="center" bgcolor="#F1E7C5">' + to1.toFixed(1) + '</td>' +
					'<td width="10%" align="center" bgcolor="#F1E7C5">' + icon20 + '</td></tr>' +
				'</table><p>&nbsp;</p></center>';

			matchupPreview.align = "center";
	
			schedule.parentNode.insertBefore(matchupPreview, schedule);
		}
		else
		{
			reset();
		}
	}, 500);
}

function trim(reference)
{
	var x;
	reference = reference.slice(reference.indexOf("</td>") + 5);
	x = reference.slice(reference.indexOf(">") + 1);
	return x;
}

var links = document.evaluate(
	'//td[@background="images/tab.gif"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);


for(var i = 0; i < links.snapshotLength; i++)
{
	var link = links.snapshotItem(i).href;
	if(i > 0)
	{
		links.snapshotItem(i).addEventListener('click', function()
		{
			if(matchupPreview.parentNode != null && matchupPreview.parentNode != undefined && matchupPreview.innerHTML != "")
			{
				matchupPreview.innerHTML = "";
			}
		}, false);
	}
}

links.snapshotItem(0).addEventListener('click', function()
{
	if(matchupPreview.parentNode != null && matchupPreview.parentNode != undefined && matchupPreview.innerHTML != "")
	{
		matchupPreview.innerHTML = "";
	}
	window.location.replace("teams.php");
}, false);
