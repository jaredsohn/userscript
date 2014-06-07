// iRacers online
// Copyright (c) 2010, Pere Argelich
//
// Changelog:
//
//  v1.0, 07/11/2010
//     - First release.
//
//  v1.1, 08/11/2010
//     - Works well on Firefox and Opera.
//	
//
// ==UserScript==
// @name          iRacers online
// @version       1.1
// @copyright     2010, Pere Argelich
// @namespace     
// @description   Show the total number of iracers and spectators online in all sessions.
// @include       http://members.iracing.com/membersite/member/spectator.jsp
// ==/UserScript==

var tableSessions = null;
var numLoop = 0;
var maxLoops = 10;
var totaliRacers = 0;
var totalSpectators = 0;

function getTableSessions()
{
  tableSessions = document.getElementsByClassName('spectator_table');
  numLoop++;
  if (tableSessions.length == 0 && numLoop < maxLoops) {
	window.setTimeout(function() { getTableSessions(); }, 1000);
  }
  else {
	numLoop = 0;
	getTotaliRacers();
  }
}

function getTotaliRacers()
{
  var rows, columns;
  var i, j;
  
  totaliRacers = 0;
  totalSpectators = 0;
  
  for (i = 0; i < tableSessions.length; i++) {
	rows = tableSessions[i].getElementsByTagName('tr');
	for (j = 0; j < rows.length; j++) {
	  columns = rows[j].getElementsByTagName('td');
	  if (columns.length == 8) {
		//Hosted sessions
		spectators = columns[4].getElementsByTagName('div')[0].innerHTML;
		totalSpectators = totalSpectators + parseInt(spectators.split('/')[0]);
		totaliRacers = totaliRacers + parseInt(columns[5].getElementsByTagName('div')[0].innerHTML);
	  }
	  else if (columns.length == 7) {
		//Oficial Series sessions
		spectators = columns[3].getElementsByTagName('div')[0].innerHTML;
		totalSpectators = totalSpectators + parseInt(spectators.split('/')[0]);
		totaliRacers = totaliRacers + parseInt(columns[4].getElementsByTagName('div')[0].innerHTML);
	  }
	}
  }
  
  showTableiRacers();
}

function showTableiRacers()
{
  var styleTableiRacers, contentTable;
  
  styleDiviRacers = "margin-top: 10px; margin-bottom: 0px;";
  styleTableiRacers = "width: 100%; border: 1px solid #aaaaaa; background-color: #eeeeee";
  styleCaption = "font-weight: bold; font-size: 11pt; color: #323232; padding-top: 10px; padding-left: 10px; border-bottom: 1px hidden;";
  styleHeader = "border-left: 1px hidden; border-right: 1px hidden; border-top: 1px hidden; background-color: #eeeeee; color: #323232; text-align: center; font-weight: bold; font-size: 7pt; height: 22px; width: 58px; padding-bottom: 3px;";
  styleTotal = "border: 1px solid #aaaaaa; background-color: #ffffff; font-weight: bold; color: #323232; font-size: 7pt; width: auto; height: 22px; text-align: right; vertical-align: middle; padding-right: 7px;";
  styleValues = "border: 1px solid #aaaaaa; background-color: #ffffff; color: #646464; text-align: center; vertical-align: middle; font-weight: bold; font-size: 7pt; width: 58px; height: 22px;";
  
  contentTable = "";
  contentTable = contentTable + "<table style='" + styleTableiRacers + "'>";
  contentTable = contentTable + "<tr><td style='" + styleCaption +"' colspan='4'>iRacers online</td></tr>";
  contentTable = contentTable + "<tr><td style='border-top: 1px hidden;'></td><td style='" + styleHeader + "'>Num<br/>Spectators</td><td style='" + styleHeader + "'>Num<br/>Drivers</td><td style='border-top: 1px hidden; width: 61px;'></td></tr>";
  contentTable = contentTable + "<tr><td style='" + styleTotal + "'>TOTAL:</td><td style='" + styleValues + "'>" + totalSpectators + "</td><td style='" + styleValues + "'>" + totaliRacers + "</td><td style='width: 61px; color: #ffffff;'></td></tr></table>";
  
  //create element
  tableiRacers = document.createElement('DIV');
  tableiRacers.setAttribute('id', 'pa-iracers-online');
  tableiRacers.setAttribute('style', styleDiviRacers);
  tableiRacers.innerHTML = contentTable;
  
  //delete element (if exists)
  divDelete = document.getElementById('pa-iracers-online');
  if (divDelete != null) {
	parentDiv = divDelete.parentNode;
	parentDiv.removeChild(divDelete);
  }
  
  //show element (table)
  divSessions = document.getElementById('sessions');
  divSessions.parentNode.insertBefore(tableiRacers, divSessions);
  
  //refresh every 2 seconds
  window.setTimeout(function() { getTableSessions(); }, 2000);
}

//Main
window.setTimeout(function() { getTableSessions(); }, 1000);