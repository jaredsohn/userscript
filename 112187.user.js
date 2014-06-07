// ==UserScript==
// @name           PlayerOfTheGame
// @namespace      http://www.courtrivals.com/
// @include        http://*courtrivals.com/showBoxscore.php?gid=*
// ==/UserScript==

// ********************************************************************
// Formula Description
// ********************************************************************

/*
formula: 	pog = m_pts*pts + m_reb*reb + m_ast*ast + m_blk*blk + m_stl*stl - m_to*to - (fga-fgm)*m_missfg - (fta-ftm)*m_missft + dif*m_dif;

pog - player of the game score
pts - points
reb - rebounds
ast - assists
blk - blocked shots
stl - steals
to - turnover
missfg - missed field goal
missft - missed free throws
dif - points differential between both teams (negative for the losing team)

*/

// ********************************************************************
// Variables
// ********************************************************************
var players = new Array(20);
var team1Players = new Array(10);
var team2Players = new Array(10);

var fillerPlayer = new Player(0, "Filler Player", 0, 0);

// ********************************************************************
// Multipliers
// ********************************************************************

var m_pts = 1;
var m_reb = 0.8;
var m_ast = 2.2;
var m_blk = 2.5;
var m_stl = 3.5;
var m_to = 2;
var m_missfg = 0.5;
var m_missft = 0.5;
var m_dif = 0.2;

// ********************************************************************
// Types
// ********************************************************************

function Player(id, html, scoreDiff, teamID) {
	this.id = id;
	this.html = html;
	this.scoreDiff = scoreDiff;
	this.teamID = teamID;
	this.fgm = 0;
	this.fga = 0;
	this.threem = 0;
	this.threea = 0;
	this.ftm = 0;
	this.fta = 0;
	this.oreb = 0;
	this.dreb = 0;
	this.reb = 0;
	this.ast = 0;
	this.stl = 0;
	this.blk = 0;
	this.to = 0;
	this.pts = 0;
	this.setStats = function(fgm, fga, threem, threea, ftm, fta, oreb, dreb, reb, ast, stl, blk, to, pts) {
		this.fgm = fgm;
		this.fga = fga;
		this.threem = threem;
		this.threea = threea;
		this.ftm = ftm;
		this.fta = fta;
		this.oreb = oreb;
		this.dreb = dreb;
		this.reb = reb;
		this.ast = ast;
		this.stl = stl;
		this.blk = blk;
		this.to = to;
		this.pts = pts;
	}
}
	
function MapEntry(key, value) {
	this.key = key;
	this.value = value;
}

// ##############################################################################################################################################################
// ##############################################################################################################################################################

// ********************************************************************
// Retrieve Stats
// ********************************************************************

var teams = document.evaluate(
	'//p[@class="registerNow"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var team1 = teams.snapshotItem(0).innerHTML;
var team2 = teams.snapshotItem(1).innerHTML;

var scores = document.evaluate(
	'//p[@class="tableHeader"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
var score1 = scores.snapshotItem(0).textContent;
var score2 = scores.snapshotItem(1).textContent;

var scan = document.evaluate(
	'//td[@width="150"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

	

var idx = 0;
var scoreDiff = 0;
var teamID = 0;
var team1Count = 0;
var team2Count = 0;
for(x=1;x<=20;x++) {
	var tempPlayer
	if(x<=10) {
		scoreDiff = score1 - score2;
		idx = x + 2;
		teamID = 1;
		tempPlayer = new Player(x, scan.snapshotItem(idx).innerHTML, scoreDiff, teamID);
		team1Players[team1Count] = tempPlayer;
		team1Count++;
	} else {
		scoreDiff = score2 - score1;
		idx = x + 3;
		teamID = 2;
		tempPlayer = new Player(x, scan.snapshotItem(idx).innerHTML, scoreDiff, teamID);
		team2Players[team2Count] = tempPlayer;
		team2Count++;
	}
	
	players[x - 1] = tempPlayer;
}

var scan = document.evaluate(
	'//td[@class="loginBottomText"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
var i = 19;
for(x=0;x<20;x++) {
	players[x].setStats(
		makes(scan.snapshotItem(i).innerHTML) * 1,
		attempts(scan.snapshotItem(i).innerHTML) * 1,
		makes(scan.snapshotItem(i + 1).innerHTML) * 1,
		attempts(scan.snapshotItem(i + 1).innerHTML) * 1,
		makes(scan.snapshotItem(i + 2).innerHTML),
		attempts(scan.snapshotItem(i + 2).innerHTML) * 1,
		scan.snapshotItem(i + 3).innerHTML * 1,
		scan.snapshotItem(i + 4).innerHTML * 1,
		scan.snapshotItem(i + 5).innerHTML * 1,
		scan.snapshotItem(i + 6).innerHTML * 1,
		scan.snapshotItem(i + 7).innerHTML * 1,
		scan.snapshotItem(i + 8).innerHTML * 1,
		scan.snapshotItem(i + 9).innerHTML * 1,
		scan.snapshotItem(i + 10).innerHTML * 1);
	i += 13;
	if(x==9) {
		i += 29;
	}
}

// ********************************************************************
// Determine Highest Score
// ********************************************************************
var highScores = new Array(20);
for(x=0;x<players.length;x++) {
	highScores[x] = players[x];
}

highScores.sort(pogSort);

var team1Scores = new Array(10);
var team2Scores = new Array(10);

var team1Count = 0;
var team2Count = 0;

for(x=0;x<players.length;x++) {
	var tempPlayer = players[x];
	if(tempPlayer.teamID == 1) {
		team1Scores[team1Count] = tempPlayer;
		team1Count++;
	} else {
		team2Scores[team2Count] = tempPlayer;
		team2Count++;
	}
}

team1Scores.sort(pogSort);
team2Scores.sort(pogSort);

var pogHTML = '<div><p><strong>Player of the Game: ' + highScores[0].html +' of ';
if(highScores[0].teamID == 1) {
	pogHTML = pogHTML + team1;
} else {
	pogHTML = pogHTML + team2;
}

pogHTML = pogHTML + '</strong>' + playerStatline(highScores[0]) + '</p></div>';

// ********************************************************************
// Insert Player of the Game
// ********************************************************************

var scan = document.evaluate(
	'//table[@width="100%"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var boxscore = scan.snapshotItem(3);

playerofgame = document.createElement('div');
playerofgame.innerHTML = pogHTML;
boxscore.parentNode.insertBefore(playerofgame, boxscore.nextSibling);

var pogbutton = document.createElement('button');
pogbutton.innerHTML = '<input type="button" id="pogbutton">POG Scores</input>';
playerofgame.parentNode.insertBefore(pogbutton, playerofgame.nextSibling);
pogbutton.addEventListener('click', function()
{
	pogbutton.parentNode.removeChild(pogbutton);
	var pogtable = document.createElement('div');
	
	var pogTableHTML = '<div><table border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
			'<tr><td colspan="4" bgcolor="#000080" class="tableHeader2">Player of the Game Ratings</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>' + team1 + '</strong></td>' +
				'<td width="50" bgcolor="#C6C6A8" class="loginBottomText"><strong>Rating</strong></td>' +
				'<td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>' + team2 + '</strong></td>' +
				'<td width="50" bgcolor="#C6C6A8" class="loginBottomText"><strong>Rating</strong></td></tr>';
	
	var team1Temp;
	var team2Temp;
	
	for(x=0;x<team1Scores.length;x++) {
		
		team1Temp = team1Scores[x];
		team2Temp = team2Scores[x];
		
		pogTableHTML = pogTableHTML + '<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + team1Temp.html + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + playerPoGRating(team1Temp) + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + team2Temp.html + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + playerPoGRating(team2Temp) + '</td></tr>';
	}
	
	pogtable.innerHTML = pogTableHTML + '</table></div>';
	
	playerofgame.parentNode.insertBefore(pogtable, playerofgame.nextSibling);
}, false);

// ********************************************************************
// Functions
// ********************************************************************

function makes(x)
{
	x = x.slice(0,x.indexOf(" ")) * 1;
	return x;
}

function attempts(x)
{
	x = x.slice(x.lastIndexOf(" ") + 1) * 1;
	return x;
}

function playerPoGRating(player) {
	return pograting(player.fgm, player.fga, player.threem, player.threea, player.ftm, player.fta, player.oreb, player.dreb, player.reb, player.ast, player.stl, player.blk, player.to, player.pts, player.scoreDiff, player.html);
}

function pograting(fgm, fga, threem, threea, ftm, fta, oreb, dreb, reb, ast, stl, blk, to, pts, dif, name)
{
	var pog = m_pts*pts + m_reb*reb + m_ast*ast + m_blk*blk + m_stl*stl - m_to*to - (fga-fgm)*m_missfg - (fta-ftm)*m_missft + dif*m_dif;
	pog = pog.toPrecision(3);
	
	if(name == '<i>Filler Player</i>')
	{
		pog = -10;
	}
	return pog;
}

function playerStatline(player) {
	return statLine(player.reb, player.ast, player.stl, player.blk, player.to, player.pts);
}

function statLine(reb, ast, stl, blk, to, pts) {
	var statLine = " (";
	var slva = setupStatLineArray(reb, ast, stl, blk, to, pts);
	
	for(x=0;x<slva.length;x++) {
		var statEntry = slva[x];
		if(statEntry.key != "TOs") {
			if(statEntry.value != 0) {
				statLine += statEntry.value + " " + statEntry.key + ", ";
			}
		} else {
			if(statEntry.value == 0) {
				statLine += "0 " + statEntry.key + ", ";
			}
		}
	}
	
	return statLine.substring(0, statLine.length - 2) + ")";
}

function setupStatLineArray(reb, ast, stl, blk, to, pts) {
	var slva = new Array(6);
	
	slva[0] = new MapEntry("PTS", pts);
	slva[1] = new MapEntry("REB", reb);
	slva[2] = new MapEntry("AST", ast);
	slva[3] = new MapEntry("STL", stl);
	slva[4] = new MapEntry("BLK", blk);
	slva[5] = new MapEntry("TOs", to);
	
	return slva;
}

function pogSort(a, b) {
	return playerPoGRating(b) - playerPoGRating(a);
}

function replaceHTML(val) {
	return val.replace(/<.*?>/g, '');
}