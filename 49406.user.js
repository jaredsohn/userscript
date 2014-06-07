// ==UserScript==
// @name           PBP Analysis
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/viewRecap.php?gid=*
// ==/UserScript==

var quarter = 1, scores = new Array('0-0'), team1 = new Array(0), team2 = new Array(0), row1 = new Array(0), row2 = new Array(), row1b = new Array(0), row2b = new Array();

var cells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var tables = document.evaluate(
	'//table',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var p = document.evaluate(
	'//p',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var teamA = p.snapshotItem(3).innerHTML;
var teamB = p.snapshotItem(5).innerHTML;

for(var i = 0; i < cells.snapshotLength; i++)
{
	if(cells.snapshotItem(i).innerHTML == '<b>*** Substitutions!  Starters benched for second unit! ***</b>')
	{
		if(quarter == 1)
		{
			scores[1] = cells.snapshotItem(i - 2).innerHTML;
			quarter += 1;
		}
		else
		{
			scores[5] = cells.snapshotItem(i - 2).innerHTML;
			quarter += 1;
		}
	}

	if(cells.snapshotItem(i).innerHTML == '<b>*** Substitutions!  Second unit benched in favor of starters! ***</b>')
	{
		if(quarter == 2)
		{
			scores[3] = cells.snapshotItem(i - 2).innerHTML;
			quarter += 1;
		}
		else
		{
			scores[7] = cells.snapshotItem(i - 2).innerHTML;
		}
	}

	if(cells.snapshotItem(i).innerHTML == '<b>--- END OF QUARTER 1 ---</b>')
	{
		scores[2] = cells.snapshotItem(i - 2).innerHTML;
	}

	if(cells.snapshotItem(i).innerHTML == '<b>--- END OF QUARTER 2 ---</b>')
	{
		scores[4] = cells.snapshotItem(i - 2).innerHTML;
	}

	if(cells.snapshotItem(i).innerHTML == '<b>--- END OF QUARTER 3 ---</b>')
	{
		scores[6] = cells.snapshotItem(i - 2).innerHTML;
	}

	if(cells.snapshotItem(i).innerHTML == '<b>--- END OF QUARTER 4 ---</b>')
	{
		scores[8] = cells.snapshotItem(i - 2).innerHTML;
	}
}

for(i = 1; i < 9; i++)
{
	team1[i] = scores[i].slice(0,scores[i].indexOf('-')) * 1;
	team2[i] = scores[i].slice(scores[i].indexOf('-') + 1) * 1;
}

row1[1] = team1[1];
row1[2] = team1[4] - team1[3];
row1[3] = team1[5] - team1[4];
row1[4] = team1[8] - team1[7];
row1[5] = row1[1] + row1[2] + row1[3] + row1[4];

row2[1] = team2[1];
row2[2] = team2[4] - team2[3];
row2[3] = team2[5] - team2[4];
row2[4] = team2[8] - team2[7];
row2[5] = row2[1] + row2[2] + row2[3] + row2[4];

row1b[1] = team1[2] - team1[1];
row1b[2] = team1[3] - team1[2];
row1b[3] = team1[6] - team1[5];
row1b[4] = team1[7] - team1[6];
row1b[5] = row1b[1] + row1b[2] + row1b[3] + row1b[4];

row2b[1] = team2[2] - team2[1];
row2b[2] = team2[3] - team2[2];
row2b[3] = team2[6] - team2[5];
row2b[4] = team2[7] - team2[6];
row2b[5] = row2b[1] + row2b[2] + row2b[3] + row2b[4];

var starters = document.createElement('p');
starters.innerHTML = '<table width="400" border="0" cellpadding="3" cellspacing="1" bgcolor="#BA9E86"><tr><td width="40%" bgcolor="#3E3013" class="tableHeader2">Starters</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">1</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">2</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">3</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">4</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">Total</td></tr>' +
			'<tr><td width="40%" bgcolor="#F1E7C5">' + teamA + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1[1] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1[2] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1[3] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1[4] + '</td>' +
				'<td width="12%" bgcolor="#C6C6A8">' + row1[5] + '</td>' +
			'<tr><td width="40%" bgcolor="#F1E7C5">' + teamB + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2[1] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2[2] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2[3] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2[4] + '</td>' +
				'<td width="12%" bgcolor="#C6C6A8">' + row2[5] + '</td></tr></table>';

var bench = document.createElement('p');
bench.innerHTML = '<table width="400" border="0" cellpadding="3" cellspacing="1" bgcolor="#BA9E86"><tr><td width="40%" bgcolor="#3E3013" class="tableHeader2">Bench</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">1</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">2</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">3</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">4</td>' +
				'<td width="12%" bgcolor="#3E3013" class="tableHeader2">Total</td></tr>' +
			'<tr><td width="40%" bgcolor="#F1E7C5">' + teamA + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1b[1] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1b[2] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1b[3] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row1b[4] + '</td>' +
				'<td width="12%" bgcolor="#C6C6A8">' + row1b[5] + '</td>' +
			'<tr><td width="40%" bgcolor="#F1E7C5">' + teamB + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2b[1] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2b[2] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2b[3] + '</td>' +
				'<td width="12%" bgcolor="#F1E7C5">' + row2b[4] + '</td>' +
				'<td width="12%" bgcolor="#C6C6A8">' + row2b[5] + '</td>' +
			'</tr></table>';

tables.snapshotItem(6).parentNode.insertBefore(starters, tables.snapshotItem(6).nextSibling);
starters.parentNode.insertBefore(bench, starters.nextSibling);