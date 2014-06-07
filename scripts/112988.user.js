// filter for results of one team on hockeytoto.ch
// version 1.2

// 27.09.2011
// Copyright (c) 2011, Stefan Oderbolz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Filter Team (Hockeytoto.ch)", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Filter Team (Hockeytoto.ch)
// @namespace     http://www.readmore.ch
// @description   filter for one team on hockeytoto.ch
// @include       http://*.hockeytoto.ch/home/*
// ==/UserScript==

var START_ROW = 7;
var HOME_TEAM_COL = 4;
var GUEST_TEAM_COL = 6;
var RESULT_COL = 7;

function filterTeam()
{
	resetFilter();
	
  filter_team = document.getElementById('filter_team').value;
	var filter_regex = new RegExp('.*' + filter_team + '.*');
	
	var resultTable = document.getElementById('Form1').getElementsByTagName('table')[0];
	for(var rowNr = START_ROW; rowNr < resultTable.rows.length; rowNr++)
	{
		var match_row = resultTable.rows[rowNr].cells;
		if (match_row.length >= Math.max(HOME_TEAM_COL,GUEST_TEAM_COL)) {
			var home_team  = match_row[HOME_TEAM_COL].innerHTML;
		  var guest_team = match_row[GUEST_TEAM_COL].innerHTML;
		  
		  if (filter_team == "reset") {
		  	  resultTable.rows[rowNr].style.display = '';
		  }else if (!home_team.match(filter_regex) && !guest_team.match(filter_regex))
		  {
		     resultTable.rows[rowNr].style.display = 'none';
		  }
		  
		  //format winner of match
		  var score = match_row[RESULT_COL].innerHTML;
		  score_regex = /(\d):(\d)/;
		  score_arr = score_regex.exec(score);
		  if (score_arr != null)
		  {
		 	  var home_score  = score_arr[1];
		    var guest_score = score_arr[2];
		    if (home_score > guest_score)
		    {
		    	resultTable.rows[rowNr].cells[HOME_TEAM_COL].style.fontWeight  = 'bold';
		    } else if (guest_score > home_score)
		    {
		    	resultTable.rows[rowNr].cells[GUEST_TEAM_COL].style.fontWeight  = 'bold';
		    }
		  }
		}
	}
}

function resetFilter()
{
	var resultTable = document.getElementById('Form1').getElementsByTagName('table')[0];
	for(var rowNr = START_ROW; rowNr < resultTable.rows.length; rowNr++)
	{
		resultTable.rows[rowNr].style.display = '';
	}
}

function trim(str)
{
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function getTeams() {
	var team_array = new Array();
	team_array[0] = new Object();
	var resultTable = document.getElementById('Form1').getElementsByTagName('table')[0];
	for(var rowNr = START_ROW; rowNr < resultTable.rows.length; rowNr++)
	{
		var match_row = resultTable.rows[rowNr].cells;
		if (match_row.length >= Math.max(HOME_TEAM_COL,GUEST_TEAM_COL)) {
			var home_team  = trim(match_row[HOME_TEAM_COL].innerHTML.replace(/(<([^>]+)>)/ig,"")); ;
		  var guest_team = trim(match_row[GUEST_TEAM_COL].innerHTML.replace(/(<([^>]+)>)/ig,"")); ;
		  team_array[0][home_team] = '';
		  team_array[0][guest_team] = '';
		}
	}
	var teams = new Array();
	var i = 0;
	for (var team in team_array[0]) {
		teams[i++] = team;
	}
	return teams.sort();
}

//get "Qualifikation" cell
var quali_cell = null;
var match_table = document.getElementById('Form1').getElementsByTagName('table')[0];

for (var i=0; i < match_table.getElementsByTagName('tr').length; i++)
{
	if(match_table.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].innerHTML.match(/Qualifikation/))
	{
		var quali_cell = i;
		break;
	}
}

if (quali_cell != null)
{
	//use the Qualifikation cell as hook: the filter is added 1 row below
	var container_hook = document.getElementById('Form1').getElementsByTagName('table')[0].getElementsByTagName('tr')[quali_cell+1].getElementsByTagName('td')[1];
	var container = document.createElement('div');
	container.innerHTML = '<b>Team w&auml;hlen für Filter:&nbsp;&nbsp;</b>';
	
	var team = document.createElement('select');
	team.setAttribute('id', 'filter_team');
	team.addEventListener('change', filterTeam, false);
	var reset_option = document.createElement('option');
	reset_option.setAttribute('value', 'reset');
	reset_option.innerHTML = '--Alle--';
	team.appendChild(reset_option);
	
	var teams = getTeams();
	for (var i=0; i < teams.length; i++) {
			var team_option = document.createElement('option');
			team_option.setAttribute('value', teams[i]);
			team_option.innerHTML = teams[i];
			team.appendChild(team_option);
	}
	
	container.appendChild(team);
	container_hook.appendChild(container);
}

filterTeam();