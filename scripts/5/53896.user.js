// ==UserScript==
// @name           Sokker league table
// @namespace      jarok-sokker
// @description    Replace table and round results into another table
// @include        http://online.sokker.org/league.php?*action=fix
// @version        09.07.29-0832
// ==/UserScript==


// globals
var globalTeams = new Array();
var nodesToRemove = new SkNodesList();

// List of nodes. One node is only once in the list.
//
// MEMBERS:
//  nodes   - array of nodes
//
// METHODS:
//  add()    - add node
//  remove() - remove nodes from their parents
//  clear()  - clear array
//
function SkNodesList()
{
	this.nodes = new Array();

	// methods
	this.add = SkNodesList_add;
	this.remove = SkNodesList_remove;
	this.clear = function () { this.nodes.lenght = 0; }
}

function SkNodesList_add(node)
{
	if (node == null) return 0;
	for (var i=0; i<this.nodes.length; ++i) {
		if (this.nodes[i] == node) return 0;
	}
	this.nodes.push(node);
	return 1;
}

function SkNodesList_remove()
{
	for (var i=0; i<this.nodes.length; ++i)
	{
		var node = this.nodes[i];
		if (node.parentNode)
			node.parentNode.removeChild(node);
	}
}

// team class and members

function SkTeam_addMatch(match)
{
	this.matches.push(match);
}

// MEMBERS:
//  row - table row object where the team's stats are placed
//  name - team name
//  id   - team ID
//  pos  - team position in the leage
//  matches - array of team's matches
//
// METHODS:
//  addMatch(match)  - adds match to team's matches
//
function SkTeam(row)
{
	this.row = row;

	var a = row.childNodes[3].firstChild;
	this.name = a.textContent;

	var index = a.href.lastIndexOf('teamID=');
	this.id = (index != -1) ? a.href.substr(index+7) : 0;

	var pos_txt = row.childNodes[1].textContent;
	index = pos_txt.indexOf('.');
	this.pos = (index > 0) ? pos_txt.substr(0,index) : 0;

	//alert(this.pos + ': ' + this.id + ' ' + this.name);

	this.matches = new Array();

	// methods
	this.addMatch = SkTeam_addMatch;
}

// MEMBERS:
//  href            - link to the match page
//  team1, team2    - team names
//  score1, score2  - score
//  round           - round when the match was played
//
function SkMatch(link)
{
	// remember link to the match
	this.href = link.href;

	// extract team 1
	var arr = link.textContent.match(/\S.+(?= - )/);
	this.team1 = (arr.length > 0) ? arr[0] : '';

	// extract team 2
	var t2 = 'x';
	arr = link.textContent.match(/ - .+/);
	var t2 = (arr.length > 0) ? arr[0] : '';
	t2 = t2.replace(/ - /, '');
	this.team2 = t2.replace(/\s+$/, '');

	// extract score
	var score = link.parentNode.childNodes[1].textContent;
	var div_pos = score.indexOf(':');
	if (div_pos >= 0) {
		this.score1 = score.substr(0, div_pos);
		this.score2 = score.substr(div_pos+1);
	}
	else {
		this.score1 = this.score2 = -1;
	}

	this.team1 = CorrectName(this.team1);
	this.team2 = CorrectName(this.team2);

	// round
	this.round = 0;
	var roundsHeader = FindNParent(link, 4);
	roundsHeader = FindSiblingPrev(roundsHeader, roundsHeader.nodeName);
	if (!roundsHeader) return this;

	arr = roundsHeader.textContent.match(/\d+/);
	this.round = (arr.length > 0) ? arr[0] : 0;
	//alert("_" + this.round + "_" + this.team1 + "_   _" + this.team2 + "_" + this.score1 + "_" + this.score2 + "_");
}

function FindNParent(node, n)
{
	var p = node;
	for (var i=0; i<n && p; ++i)
		p = p.parentNode;
	return p;
}

function FindSiblingPrev(node, nodeName)
{
	if (node == null) return null;
	var p = node;
	do {
		p = p.previousSibling;
   	} while (p && p.nodeName != nodeName);
	return p;
}

function FindSiblingNext(node, nodeName)
{
	if (node == null) return null;
	var p = node;
	do {
		p = p.nextSibling;
   	} while (p && p.nodeName != nodeName);
	return p;
}

function FindTeamBySubstr(s)
{
	for (var i=0; i<globalTeams.length; ++i)
	{
		if (globalTeams[i].name.indexOf(s, -1) == 0)
			return globalTeams[i].name;
	}
	return null;
}

function CorrectName(name)
{
	var p = name.indexOf('...', -1);
	if (p >= 0) {
		name = name.substr(0,p);
		var result = FindTeamBySubstr(name.substr(0,p));
		return result ? result : CorrectName(name);
	}

	// Ugly hack, but for some reason teams with "-symbol in table have `-symbol in the list of rounds
	var result = name.replace(/`/g,"\"");
	if (result != name) {
		result = FindTeamBySubstr(result);
		return result ? result : name
	}

	return name;
}

function FindTeam(teams, team_name)
{
	for (var iteam = 0; iteam < teams.length; ++iteam)
	{
		if (teams[iteam].name == team_name)
			return teams[iteam];
	}
	return null;
}

// removes all spaces in strings and shorten it to 'n' charachters
function ShortString(name, n)
{
	return name.replace(/\s+/g, "").substr(0,n);
}

function BuildScoreString(score1, score2, match)
{
	var color = 4;
	if (score1 > score2) color = 1; // win
	else if (score1 < score2) color = 2; // loss
	var	title = "("+match.round+") " + match.team1+" - "+match.team2+" "+match.score1+":"+match.score2;
	return "<a title='"+title+"' href='"+match.href+"' class=textColor"+color+">"+score1+":"+score2+"</a>";
}

function ModifyTeamRows(teams)
{
	for (var i=0; i<teams.length; ++i)
	{
		var teamI = teams[i];
		var cellLast = teamI.row.cells[2];
		for (var j=0; j<teams.length; ++j)
		{
			// create new cell
			var new_td = document.createElement('td');
			var style = "text-align:center";
			cellLast.parentNode.insertBefore(new_td, cellLast);

			if (i == j) {
				//new_td.innerHTML = "<b style='color:#666666'>\\|/<br/>/|\\</b>";
				//style = style + ";background-color:#e9eef2";
				new_td.className = "bgColor4";
				//new_td.innerHTML = "<img src='http://files.sokker.org/pic/gool.gif'/>";
				new_td.setAttribute("style", style);
				continue;
			}
			new_td.setAttribute("style", style);

			// find home and away matches
			var homeMatch=null; awayMatch=null;
			var teamJ = teams[j];
			for (var m=0; m<teamI.matches.length; ++m)
			{
				var match = teamI.matches[m];
				if (!awayMatch && match.team1 == teamJ.name) // away match
					awayMatch = match;
				else if (!homeMatch && match.team2 == teamJ.name) // home match
					homeMatch = match;

				if (homeMatch && awayMatch) break; // both matches found - stop searching
			}

			// build colorized score string
			var txt1 = (homeMatch) ? BuildScoreString(homeMatch.score1, homeMatch.score2, homeMatch) : "&nbsp;"
			var txt2 = (awayMatch) ? BuildScoreString(awayMatch.score2, awayMatch.score1, awayMatch) : "&nbsp;"
			new_td.innerHTML = txt1 + "<br/>" + txt2;
		}
	}
}

function removeStyleProperty(style, prop)
{
	if (style == null) return 0;

	var a = style.value.indexOf(prop, -1);
	if (a < 0) return 0;

	var b = style.value.indexOf(";", a);
	if (b < a) return 0;

	var s = style.value.substr(a, b-a+1);
	style.value = style.value.replace(s, "");

	return 1;
}

function RebuildTable()
{
	var tables = document.getElementsByTagName('tbody');
	if (tables == null || tables.length<2)
		return 0;

	// find table and teams' data
	var table = tables[1];
	for (var i=1; i<table.rows.length; ++i) {
		globalTeams.push(new SkTeam(table.rows[i]) );
	}
	if (globalTeams.lenght < 1)
		return;

	// collect played matches
	var aa = document.getElementsByTagName('a');
	if (aa == null || aa.length<1)
		return 0;

	var parentRounds = null;
	for (var i=0; i<aa.length; ++i)
	{
		var a = aa[i];
		// parse only matches
		if (!a.href.match('matchID')) continue;
		parentRounds = a.parentNode;

		var match = new SkMatch(a);
		var t1 = FindTeam(globalTeams, match.team1);
		if (t1) t1.addMatch(match);

		var t2 = FindTeam(globalTeams, match.team2);
		if (t2) t2.addMatch(match);

		var p = FindNParent(a, 4);
		if ( nodesToRemove.add(p) )
		{
			// add siblings as well
			nodesToRemove.add( FindSiblingPrev(p, p.nodeName) );
			nodesToRemove.add( FindSiblingNext(p, p.nodeName) );
		}
	}

	// modify view

	// remove played rounds and move fixtures under table
	if (parentRounds != null)
	{
		// find top parent div of rounds
		parentRounds = FindNParent(parentRounds, 6);

		// rounds are right aligned - remove this attribute
		var attrs = parentRounds.attributes
		if (attrs == null) retun;
		if (!removeStyleProperty(attrs.getNamedItem("style"), "float"))
			return;

		// remove unnecessary nodes
		nodesToRemove.remove();
		nodesToRemove.clear();

		// find top parent div of the table
		var parentTable = FindSiblingNext(parentRounds, parentRounds.nodeName);

		// move rounds behind the table
		parentRounds.parentNode.removeChild(parentRounds);
		parentTable.parentNode.appendChild(parentRounds);
	}

	// build new table

	// remove table width limitations
	var cellLast = table.rows[0].cells[2];
	var attrs = table.parentNode.parentNode.attributes;
	if (attrs == null) return;
	if (!removeStyleProperty( attrs.getNamedItem("style"), "width" ))
		return;

	// add team column
	for (var i=0; i<globalTeams.length; ++i)
	{
		var team = globalTeams[i];
		var new_td = document.createElement('td');
		new_td.setAttribute("style", "text-align:center");
		new_td.className="textColor3";
		var teamName = "<span title='" + team.name + "'>" + ShortString(team.name, 5) + "</span>";
		new_td.innerHTML = "<b>" + team.pos + "</b><br/>" + teamName;
		cellLast.parentNode.insertBefore(new_td, cellLast);
	}

	// matches
	ModifyTeamRows(globalTeams);
}

RebuildTable();
