// ==UserScript==
// @name        Yahoo Fantasy Sports Game Log Link
// @namespace   http://userscripts.org
// @description Provides a link graphic to the player's game log, adds a
// 				search icon for each player in Recent Transactions and
//				Transactions, and highlights benched players.
// @include     http://*.fantasysports.yahoo.com/*
// ==/UserScript==

// Credit goes to JK (http://userscripts.org/users/5418) for his NFL script
// (http://userscripts.org/scripts/show/5513).  In his NFL script, he credits
// wvpv (http://userscripts.org/users/3243), who wrote an NBA script
// (http://userscripts.org/scripts/show/2519).  There were additional ideas
// posted in the posts for the NFL script.  I've incorporated those too.
//
// Change log:
//  03/30/2007 - Made player link do a search instead of going to profile. (TRW)
//  03/30/2007 - Added highlighting bench players. (TRW)
//	04/03/2007 - Reverted player link back to profile instead of a search. (TRW)
//	04/03/2007 - Added a link graphic to search for the player. (TRW)
//	04/03/2007 - Moved gameLogLinkGraphic outside of the for() loop (faster?). (TRW)
//	07/23/2007 - Modified to support Baseball, Basketball, and Football. (TRW)
//	07/24/2007 - Changed player search to only appear in Recent Transactions and
//				 Transactions.  Changed graphic to use Yahoo's plus sign. (TRW)
//	07/24/2007 - Cleaned up code, made everything functions. (TRW)
//	07/28/2007 - Couldn't count on Yahoo's BASE HREF to get the league URL. (TRW)
//	08/01/2007 - Changed the way we get the league URL to use regular expressions. (TRW)
//	10/22/2007 - Fixed a bug where if a team defense appeared in the transactions,
//	             any players listed after that would not get the search link. (TRW)
//	             Also fixed a bug where the GL icon would appear before any injury notation. (TRW)
//	10/31/2007 - Added support for hockey.  Also added check to make sure we
//	             found one of the supported sports in the URL. (TRW)

var leagueURL;
var sport;
var searchXPath;
var allElements;

leagueURL = String(window.location).replace(/(.*\.fantasysports\.yahoo\.com\/.*\/\d+).*/i, '$1');
sport = '';

if( leagueURL.indexOf('basketball') != -1 ) {
	sport='NBA';
	searchXPath = "//*[contains(@href, 'http://sports.yahoo.com/nba/players/')]";
}

if( leagueURL.indexOf('baseball') != -1 ) {
	sport='MLB';
	searchXPath = "//*[contains(@href, 'http://sports.yahoo.com/mlb/players/')]";
}

if( leagueURL.indexOf('football') != -1 ) {
	sport='NFL';
	searchXPath = "//*[contains(@href, 'http://sports.yahoo.com/nfl/players/')]";
}

if( leagueURL.indexOf('hockey') != -1 ) {
	sport='NHL';
	searchXPath = "//*[contains(@href, 'http://sports.yahoo.com/nhl/players/')]";
}

// Make sure we matched one of the supported sports.
if( sport != '' ) {
	allElements = document.evaluate(searchXPath, document, null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null);

	// Add the search icon to the Recent Transactions area and Transactions page.
	addSearchIcon("transactions");

	// Add the Game Log icon to all players.
	addGameLogIcon(allElements);

	// There's always at least one statTable.
	highlightBenchedPlayer("statTable0");
}

// And there's at least 2 statTables for MLB and NFL.
if( sport == 'MLB' || sport == 'NFL' || sport == 'NHL' ) {
	highlightBenchedPlayer("statTable1");
}

// But there's usually 3 stat tables for NFL.
if( sport == 'NFL' ) {
	highlightBenchedPlayer("statTable2");
}

function addGameLogIcon(allElements) {
	var thisElement;
	var gameLogLink;

	// TRW: Moved this out of the loop otherwise we might regenerate the
	// graphic through each iteration of the loop.
	var gameLogLinkGraphic = "data:image/gif;base64,"+
		"R0lGODlhEgALANUAAJlnA9/Z0OGdOOaJAPzu2c57APO6ZseJLPfeuahxIP78"+
		"+OGND75yAPbOku2bIeF5AO+qQ/Xo1fTEfOmTEueeL+6iMbNrAOySC/7z5OmU"+
		"Fu+mOt6TJPG1WNd+AKtmAPTBdPPIieN9AK18NPrkw+eOCsR0AOimQf///+2e"+
		"KeyUEvft3v3v2+yXF9iBAqxpAOuNA9yEAPfRmffFc/CvS/337eSGAO+oP///"+
		"/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUADcALAAAAAASAAsAAAZ5"+
		"wJuQ9oFoNCiUg8UyRYTQm2F2TC5TqcUmKrTZHJewuNZqcW8aB+F0kjRWqVqh"+
		"cK4oPqTaA4RJwQolZygKHCNtb34lDGcOdyEIMW8THQwWZywva20SbCoHllwZ"+
		"GQOkpX8WHmcUCzAdHYAlJS4ACWcRAi1zihaoIgFQQQA7";

  var loc = String(window.location);
  for( var i = 0; i < allElements.snapshotLength; i++) {

	thisElement = allElements.snapshotItem(i);

	if( thisElement.href.indexOf('news') == -1) {
	  gameLogLink = document.createElement('a');
	  gameLogLink.setAttribute("href",thisElement.href + "/gamelog");
	  gameLogLink.setAttribute("target","_blank");
	  gameLogLink.innerHTML = "<img border='0' src='" + gameLogLinkGraphic +"'>" ;
	  // 10/22/2007: Changed from insertBefore with 2 nextSiblings to appendChild with 1 in case there aren't 2 nextSiblings.
//		thisElement.parentNode.appendChild(gameLogLink, thisElement.nextSibling);
	  var nextSiblingTagName = thisElement.nextSibling.tagName;
	  if( nextSiblingTagName && nextSiblingTagName.toUpperCase() == "FONT" ) {
		thisElement.parentNode.insertBefore(gameLogLink, thisElement.nextSibling.nextSibling);
	  } else {
		thisElement.parentNode.insertBefore(gameLogLink, thisElement.nextSibling);
	  }
	}
  }
}

function addSearchIcon(recentTransactions) {
  var transactionsDiv;
  var table;
  var tds;
  var thisElement;
  var playerName;
  var addPlayerLink;

  transactionsDiv = document.getElementById(recentTransactions);
  if( transactionsDiv == undefined ) return;

  table = transactionsDiv.getElementsByTagName('table')[0];

  tds = table.getElementsByTagName('td');

  for( var i = 0; i < tds.length; i++ ) {
	var hrefs = tds[i].getElementsByTagName('a');
	if( hrefs !== undefined ) {
	  for( var j = 0; j < hrefs.length; j++) {
		thisElement = hrefs[j];
		if( thisElement.href.indexOf('players') !== -1 && thisElement.href.indexOf('news') === -1 && thisElement.href.indexOf('search') === -1 ) {
		  playerName = thisElement.text;

		  addPlayerLink = document.createElement('a');
		  addPlayerLink.setAttribute("href", leagueURL + "/playersearch?search=" + playerName);
		  addPlayerLink.setAttribute("title", "search for player");
		  addPlayerLink.innerHTML = "<img border='0' src='http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/add.gif'>" ;

		  thisElement.parentNode.insertBefore(addPlayerLink, thisElement.nextSibling.nextSibling);
		}
	  }
	}
  }
}

// Credit goes to Braxton Beyer (http://userscripts.org/users/10709).  He
// posted code that influenced the following function.
function highlightBenchedPlayer(statTable) {
	var table;
	var tds;
	var thisRowTds;

	table = document.getElementById(statTable);
	if( table == undefined ) return;

	tds = table.getElementsByTagName('td');
	for( var i = 0; i < tds.length; i++ ) {
	  if( tds[i].innerHTML.match(/span.*BN/)
			|| (sport == 'MLB' && tds[i].innerHTML == 'DL') ) {
			thisRowTds = tds[i].parentNode.getElementsByTagName('td');
			for( var j = 0; j < thisRowTds.length; j++ ) {
			  if( tds[i].innerHTML.match(/span.*BN/) ) {
//					thisRowTds[j].style.backgroundColor = '#986';
				} else {
					// Highlight injured baseball players in a different color.
					thisRowTds[j].style.backgroundColor = '#f99';
				}
			}
		}
	}
}
