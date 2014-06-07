// JavaScript Document
// ==UserScript==
// @name           test script kostas
// @autor          volamper
// @email          volamper@hotmail.com
// @namespace      Ikariam
// @description    A little script that sorts the Ikariam Ally Members by score
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var post = {    
 military: "army_score_main"};
 
var updateCounter =0;
var scoreTypes = {
    1: "military"};
	
	
	
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
      method:'POST',
      url:'http://' + gameServer + '/index.php',
      data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Referer': 'http://' + gameServer + '/index.php'
      },
      onload:onload
    });
}

function getPos(row) {
	// Return the score value
	return parseInt(row.cells[4].innerHTML.replace(/,/,""));
	
}
function getName(row) {
	// Return the score value
	return parseInt(row.cells[2].innerHTML.replace(/,/,""));
	
}


function sortAlly() {
	// Sort the ally table
	var table, i, rows, min, max, newRow, newCell;
	table = document.getElementById('memberList');

	max = table.rows.length;
	for (i=0; i<max -1; i++)
    {
		// Select the minimum row score
	  min = findMin(i, table);
      newRow = table.insertRow(1);
	  if ( i % 2 == 1) {
		newRow.setAttribute('class', 'alt');
	  }
      for (c=0; c<7 /* -- */; c++)	  
        {
			// Copy the row to the top of the table
		  newCell = newRow.insertCell(c);
		  newCell.setAttribute('class', table.rows[findMin(i+2, table)].cells[c].getAttribute('class'));
		  newCell.innerHTML = table.rows[findMin(i+2, table)].cells[c].innerHTML;
		}
		
		//var MilScore;
	  // Add position number	
	  //GM_setValue(type, MilitaryScore);
      //MilScore = requestScore(getPos(sTable.rows[i]),'milirary');
	  
	  requestScore(getPos(sTable.rows[i]), 'military', function(responseDetails);
												 
	  newRow.cells[0].innerHTML=(max-i-1)+")."+"  "+"bla";		
	  table.deleteRow(findMin(i+2, table));	
    }	
}

function findMin(index, sTable) {
	// Finds the minimum value for remaining rows
  var pos, currentMin;
  currentMin = index;
  for (i = index; i < sTable.rows.length; i++) {
  	if ( getPos(sTable.rows[i]) < getPos(sTable.rows[currentMin]) )
		{
			currentMin=i;
		}
  }
  
  return currentMin;
}


// ++++++++++++++++ Start +++++++++++++++++
sortAlly();
// +++++++++++++++++ End ++++++++++++++++++


