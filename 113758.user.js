// ==UserScript==
// @name          	Yahoo Fantasy Football- More Trends
// @description   	Adds several helpful peices of information (byes, ranks, projected pts, strength of schedule) to the Trends column of your player page. Also adds your total projected pts for the week, along with your opponent's, to the bottom of the page.
// @version			2012.10.09
// @include       	*football.fantasysports.yahoo.com/f1/*/*
// @exclude			*football.fantasysports.yahoo.com/f1/*/matchup*
// @exclude			*football.fantasysports.yahoo.com/f1/*/players*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*addplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/*dropplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/*playerswatch*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/*proposetrade*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*pointsagainst*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*viewtrade*

// ==/UserScript==

// Credit for many of coding procedures & styles goes to Glenn Carr. (http://userscripts.org/users/glenncarr) 

// Features and/or Notes:
// 1) Inserts the projected points for each player on the left side of the 'Trends' column. 
// 2) Inserts total project points for your starting lineup bottom left of the page. No need
//    to constantly go to your matchup page to get that information.
// 3) Inserts bye weeks for each individual player below the start % in the 'Trends' column. 
// 4) Imports the average rankings of the top 4 Yahoo Fantasy Football experts into the 'Trends' column.
// 5) Works on your own team page as well as your opponents' pages, no matter what the URL.
// 6) Also works for future weeks if you are looking to plan ahead.


//Function that strips all html elements from a string
String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

//Locates any table named statTable on Yahoo site. If no table exists, exit script.
var playerTables = document.evaluate("//table[contains(@id,'statTable')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( playerTables.snapshotLength == 0 )
    return;

//Loads all tables that match above criteria into an array.
var tables = new Array();
for ( var i = 0; i < playerTables.snapshotLength; i++ )
{
    var table = playerTables.snapshotItem( i );
    tables.push( table );
}
playerTables = tables;
//GM_log(playerTables[0].innerHTML);


//Determine the week number
var selected = document.evaluate("//div[@id='statsubnav']//li[contains(@class,'first')]/*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//GM_log(selected.snapshotLength);

//Deals with quirky behavior of Yahoo site
if ( selected.snapshotLength == 0 ){
  var mySelected = "";	  
}
else{
	//Grab the week number from the left (above the table) 
	var mySelected = selected.snapshotItem(0).innerHTML;
	//GM_log(selected.snapshotItem(0).innerHTML);
	var weekString = mySelected.toLowerCase();
	var currentWeekNumber = weekString.match(/\d{1,2}/);
	//GM_log(currentWeekNumber[0]);
}


Date.prototype.getWeek = function() {
var onejan = new Date(this.getFullYear(),0,1);
return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()-1)/7);
} 

//Find date information for later use
var today = new Date();
var weekno = today.getWeek();
var dayOfWeek = today.getDay();
var day = today.getDate();
var month = today.getMonth();
var year = today.getFullYear().toString();
var yearAbbrev = year.substring(2,4);
//var day = today.getDate();
//var month = today.getMonth();


//Get important URL information for later use
var currentURL = document.URL;
var lengthOfURL = currentURL.length;
var baseURL = currentURL.match(/http\:\/\/football\.fantasysports\.yahoo\.com\/f1\//);
var leagueCode = currentURL.match(/\d\d\d\d\d\d/);
var userTeamNumber = getTeamNumber();
var oppTeamNumber = getOppTeamNumber();
var matchupPageURL = getMatchupPageURL();
//GM_log(baseURL + leagueCode + '/' + teamNumber);
//GM_log(oppTeamNumber);

//Finds your (i.e. the user's) default team number. This changes every year.
function getTeamNumber()
{
	//Get user's team number
	//var userTeamNumberArray = document.getElementsByClassName('yuimenubaritemlabel');	
	var userTeamNumberArray = document.getElementsByClassName('first selected');
	//GM_log(userTeamNumberArray.length);
	var userTeamNumberURL = userTeamNumberArray[0].firstChild.href;	
	//GM_log(userTeamNumberURL);
	var userTeamNumber = userTeamNumberURL.toString().replace('http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/' , '');
	//GM_log(userTeamNumber);
	return userTeamNumber;
}	

//Finds your opponent's default team number. This changes every year.
function getOppTeamNumber()
{
	//Get user's team number
	var oppTeamNumberArray = document.getElementsByClassName('first-of-type');	
	//GM_log(oppTeamNumberArray.length);
	var oppTeamNumberChildNodesArray = oppTeamNumberArray[0].childNodes;	
	var oppTeamNumberURL = oppTeamNumberChildNodesArray[oppTeamNumberChildNodesArray.length-12].getElementsByTagName('a')[0].href;
	//GM_log(oppTeamNumberURL);
	var oppTeamNumber = oppTeamNumberURL.toString().replace('http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/matchup?week='+currentWeekNumber+'&mid1='+userTeamNumber+'&mid2=', '');
	//GM_log(oppTeamNumber);
	return oppTeamNumber;
}

//Finds your opponent's default team number. This changes every year.
function getMatchupPageURL()
{
	var oppTeamNumberArray = document.getElementsByClassName('first-of-type');	
	var oppTeamNumberChildNodesArray = oppTeamNumberArray[0].childNodes;	
	var oppTeamNumberURL = oppTeamNumberChildNodesArray[oppTeamNumberChildNodesArray.length-12].getElementsByTagName('a')[0].href;
	var matchupPageURL = oppTeamNumberURL;
	//GM_log(matchupPageURL);
	return matchupPageURL;
}
//var matchupPageURL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/matchup?week='+currentWeekNumber+'&mid1='+userTeamNumber+'&mid2='+oppTeamNumber;

//Get the team number of the current URL in order to find the appropriate matchup rankings page 
if (currentURL.match(/http\:\/\/football\.fantasysports\.yahoo\.com\/f1\/\d{4,6}\/\d{1,2}/))
{
	var currentPageTeamNumber = currentURL.replace(/http\:\/\/football.fantasysports.yahoo.com\/f\d\/\d\d\d\d\d\d\//, "");
	
	//If you switch a line-up position
	if (currentURL.match(/week/) && currentURL.match(/stat/))
	{
		var currentPageTeamNumber = currentPageTeamNumber.replace(/\?week\=\d{1,2}\&stat1\=S\&stat2\=S\_\d\d\d\d/, "");	
	}
	else if (currentURL.match(/week/))
	{
		var currentPageTeamNumber = currentPageTeamNumber.replace(/\?week\=\d{1,2}/, "");	
	}
	//GM_log(currentPageTeamNumber);	
	else if (currentURL.match(/date/))
	{
		var currentPageTeamNumber = currentPageTeamNumber.replace(/\?date\=\d{1,2}/, "");	
	}	
}	
else
{
	var currentPageTeamNumber = currentURL.replace(/http\:\/\/football.fantasysports.yahoo.com\/f\d\/\d\d\d\d\d\d\/team\?date\=\d\d\d\d\-\d{1,2}\-\d{1,2}\&week\=\d\&mid\=/, "");
}


//Build the URL where the projected points are located
var sPartURL = window.location.href.match( /http\:\/\/football\.fantasysports\.yahoo\.com\/.+\/[0-9]+\// ) ;

if (currentPageTeamNumber == userTeamNumber)
{
	if (currentURL.match(/week/))
	{
		var gameDayDecisionTabURL = sPartURL + currentPageTeamNumber + '/team?week=' + currentWeekNumber[0] + '&stat1=GDD&ssort=S_' + year ;	
		var opponentsTabURL = sPartURL + currentPageTeamNumber + '/team?week=' + currentWeekNumber[0] + '&stat1=O&ssort=S_' + year ;	
		var researchTabURL = sPartURL + currentPageTeamNumber + '/team?week=' + currentWeekNumber[0] + '&stat1=R&ssort=S_' + year ;	
	}
	else
	{
		var gameDayDecisionTabURL = sPartURL + currentPageTeamNumber + '/team?stat1=GDD&ssort=S_' + year ;	
		var opponentsTabURL = sPartURL + currentPageTeamNumber + '/team?stat1=O&ssort=S_' + year ;	
		var researchTabURL = sPartURL + currentPageTeamNumber + '/team?stat1=R&ssort=S_' + year ;	
		//GM_log(matchupRatingsURL);
	}	
}
else
{
	//Build date
	month = month + 1;
	if (month.toString().charAt(1)=="")
		{month = '0' + month;}
	if (day.toString().charAt(1)=="")
		{day = '0' + day;}
	var dateString = year + '-' + month + '-' + day
	
	if (currentWeekNumber[0]) {
	
	var gameDayDecisionTabURL = sPartURL + currentPageTeamNumber + '/team?date='+ dateString +'&week='+ currentWeekNumber[0] +'&stat1=GDD&ssort=S_' + year ;	
	var opponentsTabURL = sPartURL + currentPageTeamNumber + '/team?date='+ dateString +'&week='+ currentWeekNumber[0] +'&stat1=O&ssort=S_' + year ;
	var researchTabURL = sPartURL + currentPageTeamNumber + '/team?date='+ dateString +'&week='+ currentWeekNumber[0] +'&stat1=R&ssort=S_' + year ;
	}
	//GM_log(matchupRatingsURL);
}


//Send request to access yahoo projected points page and create document filled with HTML request info
function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}

//This is the main function that processes HTML (from the projected points page) created 
//by GM_xmlhttpRequest and adds it to the current Yahoo page.
getDOC(gameDayDecisionTabURL, function(doc) {
   	
	//Gets player names on Yahoo page
	var tempMyPlayersArray = document.getElementsByClassName("player");	
	var myPlayersArray = new Array();
	
	for (var i=2; i<tempMyPlayersArray.length; i++) {
		var stripMyPlayersElement = tempMyPlayersArray[i].innerHTML.stripTags();
		var myMatches = stripMyPlayersElement.match(/(.*?) \((.*?) - (.*?)\)/);
		
		if(myMatches)
			myPlayersArray.push(myMatches[1]);
	}
	//GM_log(myPlayersArray[0]);	
	//GM_log(myPlayersArray.length);	
	
	
	//Gets player names on projected Yahoo page
	var tempProjectedPlayersArray = doc.getElementsByClassName("player");	
	var projPlayersArray = new Array();	
	
	for (var i=2; i<tempProjectedPlayersArray.length; i++) {
		var stripProjectedPlayersElement = tempProjectedPlayersArray[i].innerHTML.stripTags();
		var projMatches = stripProjectedPlayersElement.match(/(.*?) \((.*?) - (.*?)\)/);
		
		if(projMatches)
			projPlayersArray.push(projMatches[1]);
	}
	//GM_log(projPlayersArray[0]);	
	//GM_log(projPlayersArray.length);	
		
	
	//Gets proper array of projected points
	var tempProjPointsArray = doc.getElementsByClassName("stat wide");
	var projPointsArray = new Array();
	//GM_log(tempProjPointsArray[9].innerHTML);
	
	//Works through table to find projected point cells
	for (var j=9; j<tempProjPointsArray.length; j=j+6) {
		var projPointsElement = tempProjPointsArray[j].innerHTML.stripTags().toString();
	
		//Skip cell if player cell is '--empty--'. This usually results in a dash preceding the proj point cell
		if ((tempProjPointsArray[j-1].innerHTML.stripTags().toString() != '-') && (projPointsElement.match(/\d+/)))
			projPointsArray.push(projPointsElement);	
	}	
	
	//Get possible bye weeks for the players from the 'Opp' column. This is needed for tweaking 
	//the code during bye weeks. Note that this has NOTHING to do with the code later in the 
	//script that finds and inserts bye weeks into the 'Trends' column. 
	var tempOppColumnArray = document.getElementsByClassName("opp");
	var playerByeWeekArray = new Array();
	
	for (var i=2; i<tempOppColumnArray.length; i++) {
		var stripOppColumnElement = tempOppColumnArray[i].innerHTML.stripTags();
		//GM_log(stripOppColumnElement);		
		
		var oppMatches = stripOppColumnElement.match(/[a-zA-z]+/);
		if (oppMatches && (oppMatches != 'Opp'))
			playerByeWeekArray.push(oppMatches);	
	}
	
	//If the player has a bye week, remove the corresponding projected point element
	//from the project points array.
	for (var q=playerByeWeekArray.length-1; q>-1; q--) {
		if (playerByeWeekArray[q] == 'Bye')
			projPointsArray.splice(q,1);		
	}	
	//GM_log(projPointsArray.length);

		
	//Get 'th' data from the table for the purpose of adding a heading
	var trendsList = document.evaluate("//th[@class='stat wide desc']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//GM_log(trendsList.snapshotLength);
	//GM_log(trendsList.snapshotItem(0).innerHTML);
	
	//Add 'PRJ' to the heading of the projected points column
	for (var p=0; p<trendsList.snapshotLength; p++)
	{
		var trendsHeader = trendsList.snapshotItem(p);
		div = document.createElement( 'div' );
		div.setAttribute('class', 'trendHeaderBottom');	
		div.setAttribute('style', 'font-weight:bold; text-align:left; font-size:7pt; ');
		div.innerHTML = 'Rank&nbsp;&nbsp;&nbsp;&nbsp;[Bye]';
		trendsHeader.innerHTML = '<span class="trendHeaderTop">Proj&nbsp;&nbsp;%Start</span>';
		trendsHeader.appendChild(div);	
		//trendsHeader.insertBefore(div, trendsHeader.firstChild);		
	}
		
	//Find cells on the current Yahoo page for inserting individual projected points
	var trendsCells = getTrendsCells();
	//GM_log(trendsCells[0].innerHTML);
	//GM_log(trendsCells.length);	
		
	//Get proper column cells, match home teams, and insert all projected point vlaues into the 'Trends' column of the Yahoo page
	for (var k = 0; k < trendsCells.length; k++)
	{		
		for (var j = 0; j < projPlayersArray.length; j++)
		{	
			if (myPlayersArray[k] == projPlayersArray[j])
			{										
				trendsCells[k].innerHTML = '<div class="projected">' + projPointsArray[j] + '</div>&nbsp;' + trendsCells[k].innerHTML ;													
			}
		}			
	}	
	
	var tempArray = document.getElementsByClassName( 'projected' );
	
	for (var k = 0; k < trendsCells.length; k++)
	{
		if(tempArray[k])
			tempArray[k].setAttribute('title', 'Projected Points This Week');		
	}	
	
}); // end function



var weekCheck = matchupPageURL;
var weekNumber = weekCheck.toString().replace('http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/matchup?week=', '');
weekNumber = weekNumber.replace('&mid1='+userTeamNumber+'&mid2='+oppTeamNumber, '');
//GM_log(weekNumber);

if(weekNumber == currentWeekNumber) {
	///////////////////////////////////
	//Find and insert project points for your match-up this week
	getDOC(matchupPageURL, function(doc) {

		//GM_log(matchupPageURL);	
		
		var statWideArray = doc.getElementsByClassName("stat wide");	
		var oppProjPoints = statWideArray[10].innerHTML.stripTags();
		var userProjPoints = statWideArray[21].innerHTML.stripTags();
		
		/*var statLastArray = doc.getElementsByClassName("pts stat last");		
		var oppTotalPoints = statLastArray[21].innerHTML.stripTags();
		//GM_log(oppTotalPoints);*/

		//Get 'p' data from the table for purpose of adding total projected points at bottom of page
		var projList = document.evaluate("//p[@class='total']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		//GM_log(totalCell.snapshotLength);
				
		var totalCell = projList.snapshotItem(0);	
		
		var spanLeft = document.createElement( 'span' );
		spanLeft.setAttribute('style', 'float:left');
		spanLeft.innerHTML = '&nbsp;&nbsp;&nbsp;Total Projected Pts: <span style="color:black; font-size:8pt">'+oppProjPoints+'&nbsp;&nbsp;&nbsp;</span>Opponent\'s Projected Pts: <span style="color:black; font-size:8pt">'+userProjPoints+'</span>' ;
		totalCell.insertBefore(spanLeft, totalCell.firstChild);
		
		/*var spanRight = document.createElement( 'span' );
		spanRight.setAttribute('style', 'float:right');
		spanRight.innerHTML = '(Opponent\'s Total Pts: <span style="color:black; font-size:8pt">'+oppTotalPoints+')</span>';
		totalCell.insertBefore(spanRight, totalCell.firstChild);*/

	}); // end function
}



///////////////////////////////////////////////////
//Only display bye weeks up until the last bye week
if (parseFloat(currentWeekNumber) < 12)
{
	//This is the main function that processes HTML (from the projected points page) created 
	//by GM_xmlhttpRequest and adds it to the current Yahoo page.
	getDOC(opponentsTabURL, function(doc) {
   	
		//Gets player names on Yahoo page
		var tempMyPlayersArray = document.getElementsByClassName("player");	
		var myPlayersArray = new Array();
		
		for (var i=2; i<tempMyPlayersArray.length; i++) {
			var stripMyPlayersElement = tempMyPlayersArray[i].innerHTML.stripTags();
			//GM_log(tempMyPlayersArray[i].innerHTML.stripTags());
			var myMatches = stripMyPlayersElement.match(/(.*?) \((.*?) - (.*?)\)/);
			
			if(myMatches)
				myPlayersArray.push(myMatches[1]);
		}
		//GM_log(myPlayersArray[6]);	
		//GM_log(myPlayersArray.length);	
				
		//Gets player names on projected Yahoo page
		var tempByePlayersArray = doc.getElementsByClassName("player");	
		//GM_log(tempByePlayersArray[2].innerHTML);
		var byePlayersArray = new Array();	
		
			for (var i=2; i<tempByePlayersArray.length; i++) {
			var stripByePlayersElement = tempByePlayersArray[i].innerHTML.stripTags();
			var byePlayerMatches = stripByePlayersElement.match(/(.*?) \((.*?) - (.*?)\)/);
			
			if(byePlayerMatches)
				byePlayersArray.push(byePlayerMatches[1]);
		}
		//GM_log(byePlayersArray[0]);	
		//GM_log(byePlayersArray.length);	
			
			
		//Determine number of bye weeks
		var tempByeWeekCountArray = document.getElementsByClassName("opp");
		var byeWeekCount = 0;
		
		for (var i=2; i<tempByeWeekCountArray.length; i++) {
			var stripByeWeekCountElement = tempByeWeekCountArray[i].innerHTML.stripTags();
					
			if(stripByeWeekCountElement == 'Bye')
				byeWeekCount++;
		}
		//GM_log(byeWeekCount);
			
			
			
		//Gets proper array of projected points
		var tempByeWeekArray = doc.getElementsByClassName("stat");
		var byeWeekArray = new Array();
		//GM_log(tempByeWeekArray[87].innerHTML);
		//GM_log(tempByeWeekArray.length);		
		
		
		//The following 3 while loops find & adds the appropriate bye weeks (from the 'Opponents' tab)
		//for each player to an array. Uses tempByeWeekArray to keep track of '--empty--' or blank elements.
		var playerW = 2;
		var w=7;
		
		//Handle all positions players
		while((tempByePlayersArray[playerW].innerHTML.stripTags() != '' ))  
		{
			var byeWeekElement = tempByeWeekArray[w].innerHTML.stripTags().toString();
			
			//GM_log(playerW);
			if (tempByePlayersArray[playerW].innerHTML.stripTags().match(/(.*?) \((.*?) - (.*?)\)/) && (tempByeWeekArray[w+1].innerHTML.stripTags().toString() != 'Bye'))
				byeWeekArray.push(byeWeekElement);
				
			w=w+6
			playerW++;
			
		}		
		w = w + 1;   
		playerW=playerW+1;
		//Handle kickers	
		while((tempByePlayersArray[playerW].innerHTML.stripTags() != '' ))
		{
			var byeWeekElement = tempByeWeekArray[w].innerHTML.stripTags().toString();
			
			if (tempByePlayersArray[playerW].innerHTML.stripTags().match(/(.*?) \((.*?) - (.*?)\)/) && (tempByeWeekArray[w+1].innerHTML.stripTags().toString() != 'Bye'))
				byeWeekArray.push(byeWeekElement);
				
			w=w+6
			playerW++;
			
		}		
		w = w + 1 + 6;   
		playerW=playerW+2;
		//Handle defense
		while(byeWeekArray.length<15-byeWeekCount)
		{
			var byeWeekElement = tempByeWeekArray[w].innerHTML.stripTags().toString();			
			
			if (tempByePlayersArray[playerW].innerHTML.stripTags().match(/(.*?) \((.*?) - (.*?)\)/))
				byeWeekArray.push(byeWeekElement);
			
			w=w+6
			playerW++;
			
		}
				
		
		
		//Find cells on the current Yahoo page for inserting individual projected points
		var trendsCells = getTrendsCells();
		//GM_log(trendsCells[0].innerHTML);
		//GM_log(trendsCells.length);	
			
		//Get proper column cells, match home teams, and insert all bye weeks into the 'Trends' column of the Yahoo page
		for (var k = 0; k < trendsCells.length; k++)
		{
			for (var j = 0; j < byePlayersArray.length; j++)
			{	
				if (myPlayersArray[k] == byePlayersArray[j])
				{										
					if (parseFloat(byeWeekArray[j]) > parseFloat(currentWeekNumber))
					{
						//Warn user of impending bye with red font
						if (parseFloat(byeWeekArray[j]) == parseFloat(currentWeekNumber)+1) 
						{
							trendsCells[k].innerHTML = trendsCells[k].innerHTML +'<div class="byeYesWarn" title="Bye Coming Up Next Week">[<span style="font-weight:bold">'+byeWeekArray[j] +'</span>]</div>';	
						}						
						else 
						{
							trendsCells[k].innerHTML = trendsCells[k].innerHTML +'<div class="byeYes" title="Bye Week Later In The Season">[<span style="font-weight:bold">'+byeWeekArray[j] +'</span>]</div>';	
						}						
					}
					//Show completed bye with green font and checkmark
					else 
					{					
						trendsCells[k].innerHTML = trendsCells[k].innerHTML +'<div class="byeNo" title="Bye Week Completed">[<span style="font-weight:bold">&#x2714;</span>]</div>'; 	
					}
				}
			}		
		}
		
		//Highlight Bye week players
		var table = document.getElementById('statTable0');
		if( table == undefined ) return;

		tds = table.getElementsByTagName('td');
		for( var i = 0; i < tds.length; i++ ) {
			if( tds[i].innerHTML == 'Bye') {
				thisRowTds = tds[i].parentNode.getElementsByTagName('td');
				for( var j = 0; j < thisRowTds.length; j++ ) {
					thisRowTds[j].style.backgroundColor = '#F9D5F5';
				}
			}
		}
		var table = document.getElementById('statTable1');
		if( table == undefined ) return;

		tds = table.getElementsByTagName('td');
		for( var i = 0; i < tds.length; i++ ) {
			if( tds[i].innerHTML == 'Bye') {
				thisRowTds = tds[i].parentNode.getElementsByTagName('td');
				for( var j = 0; j < thisRowTds.length; j++ ) {
					thisRowTds[j].style.backgroundColor = '#F9D5F5';
				}
			}
		}
		var table = document.getElementById('statTable2');
		if( table == undefined ) return;

		tds = table.getElementsByTagName('td');
		for( var i = 0; i < tds.length; i++ ) {
			if( tds[i].innerHTML == 'Bye') {
				thisRowTds = tds[i].parentNode.getElementsByTagName('td');
				for( var j = 0; j < thisRowTds.length; j++ ) {
					thisRowTds[j].style.backgroundColor = '#F9D5F5';
				}
			}
		}
		
		
	
	}); // end function
}

//Array of team names for use on Yahoo site and 
var teamAbbrevs = new Array( 'Ari','Atl','Bal','Buf','Car','Chi','Cin','Cle','Dal','Den','Det','GB','Hou','Ind','Jac','KC','Mia','Min','NE','NO','NYG','NYJ','Oak','Phi','Pit','SD','Sea','SF','StL','TB','Ten','Was' );
var teamUrlAbbrevs = { Ari:'ari',Atl:'atl',Bal:'bal',Buf:'buf',Car:'car',Chi:'chi',Cin:'cin',Cle:'cle',Dal:'dal',Den:'den',Det:'det',GB:'gnb',Hou:'hou',Ind:'ind',Jac:'jac',KC:'kan',Mia:'mia',Min:'min',NE:'nor',NO:'nwe',NYG:'nyg',NYJ:'nyj',Oak:'oak',Phi:'phi',Pit:'pit',SD:'sdg',Sea:'sea',SF:'sfo',StL:'stl',TB:'tam',Ten:'ten',Was:'was' };


//////////////////////////////////////////////////////
//Find individual player rankings and insert them into Trends cells

var BASE_URL = 'http://sports.yahoo.com/news/week-'+currentWeekNumber+'-ranks--';

var QB_RANKS_URL = BASE_URL + 'quarterback.html';
var RB_RANKS_URL = BASE_URL + 'running-back.html';
var WR_RANKS_URL = BASE_URL + 'wide-receiver.html';
var TE_RANKS_URL = BASE_URL + 'tight-end.html';
var K_RANKS_URL = BASE_URL + 'kicker.html';
var DEF_RANKS_URL = BASE_URL + 'defense-special-teams.html';
//GM_log(DEF_RANKS_URL);

var rushingDResponseText, passingDResponseText, wrDresponseText, teDresponseText, kDresponseText, DefresponseText;

//Insert dashes on the two days there are no rankings
if (dayOfWeek!=2 && dayOfWeek!=3) { 
fetchRankData(); }
else {

	var trendsCells = getTrendsCells();
	
	for (var k = 0; k < trendsCells.length; k++)
	{		
		trendsCells[k].innerHTML = trendsCells[k].innerHTML + '<div class="rank" title="Ranks Available On Thursday">----</div>';				
	}	
}

function fetchRankData()
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: QB_RANKS_URL,
		onload: getPassingDHandler(handleRushD),
		});
}

function getPassingDHandler( responseHandler )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )		
            responseHandler( responseDetails.responseText );
    }
}

function handleRushD( responseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: RB_RANKS_URL,
        onload: getRushingDHandler( handleWRD, responseText ),
        });
}

function getRushingDHandler( responseHandler, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, passingDResponseText );
    }
}

function handleWRD( responseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: WR_RANKS_URL,
        onload: getWrDHandler( handleTED, responseText, passingDResponseText ),
        });
}

function getWrDHandler( responseHandler, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, rushingDResponseText, passingDResponseText );
    }
}

function handleTED( responseText, rushingDResponseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: TE_RANKS_URL,
        onload: getTEDHandler( handleDef, responseText, rushingDResponseText, passingDResponseText ),
        });
}

function getTEDHandler( responseHandler, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

function handleDef( responseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: DEF_RANKS_URL,
        onload: getDefHandler( handleKD, responseText, wrDresponseText, rushingDResponseText, passingDResponseText ),
        });
}

function getDefHandler( responseHandler, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

function handleKD( responseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: K_RANKS_URL,
        onload: getKDHandler( directResponse, responseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText ),
        });
}

function getKDHandler( responseHandler, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText );
    }
}

//Sends response data to the appropriate function
function directResponse( kDresponseText, DefresponseText, teDresponseText, wrDresponseText, rushingDResponseText, passingDResponseText )
{
    //GM_log(rushingDResponseText);
	var rushingStats = buildArrays( rushingDResponseText );
    var passingStats = buildArrays( passingDResponseText );
    var receivingStats = buildArrays( wrDresponseText );
	var tightendStats = buildArrays( teDresponseText );
	var kickerStats = buildArrays( kDresponseText );
	var defenseStats = buildArrays( DefresponseText );
}		
	
//Builds arrays for player and corresponding ranking for the week
function buildArrays( responseText )
{	
		var doc = document.createElement('div');
		doc.innerHTML = responseText;
	
		var playerArray = new Array();
		var playerRankArray = new Array();
				
		var position = doc.getElementsByTagName('h1');
		//GM_log(position.length);
		//GM_log(position[0].innerHTML);
		
		if (/Quarterback/.test(position[0].innerHTML)) 
		{
			var rankingsLength = 25;
			var pos = 'QB';
		}
		else if (/Running Back/.test(position[0].innerHTML))
		{
			var rankingsLength = 40;
			var pos = 'RB';
		}
		else if (/Wide Receiver/.test(position[0].innerHTML))
		{
			var rankingsLength = 60;
			var pos = 'WR';
		}
		else if (/Tight End/.test(position[0].innerHTML))
		{
			var rankingsLength = 25;
			var pos = 'TE';
		}
		else  if (/Kicker/.test(position[0].innerHTML))
		{
			var rankingsLength = 20;
			var pos = 'K';
		}
		else //Defense
		{
			var rankingsLength = 20;
			var pos = 'D';
		}
		//GM_log(rankingsLength);
		
						
		var yspPlayerLinks = document.evaluate("//a[contains(@href, 'http://sports.yahoo.com/nfl/')]",doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		//GM_log(yspPlayerLinks.snapshotLength);
		//GM_log(yspPlayerLinks.snapshotItem(1).innerHTML);
		
		if ((/Defense/.test(position[0].innerHTML)))
		{
			for (var p=1; p<rankingsLength; p++) {
				var yspPlayer = yspPlayerLinks.snapshotItem(p).parentNode.innerHTML.stripTags().replace('(notes)','').replace(/^\s+/,"").replace(/\s+$/,"");
				//GM_log(yspPlayer);
				
				var yspPlayerRank = yspPlayerLinks.snapshotItem(p).parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,"");
				
				//GM_log(yspPlayerRank);				
				playerArray.push(yspPlayer);
				playerRankArray.push(pos+yspPlayerRank);
			}
		}
		else
		{
			for (var p=1; p<rankingsLength*2-2; p=p+2) {
			
			var yspPlayer = yspPlayerLinks.snapshotItem(p).parentNode.innerHTML.stripTags().replace('(notes)','').replace(/^\s+/,"").replace(/\s+$/,"");
			//GM_log(yspPlayer);	
				
			if (/class=\"ysp\_playernote\_icon/.test(yspPlayerLinks.snapshotItem(p).parentNode.parentNode.parentNode.innerHTML)) {
				
				var yspPlayerRank = yspPlayerLinks.snapshotItem(p).parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.stripTags().replace('(notes)','').replace(/^\s+/,"").replace(/\s+$/,"");
			//GM_log(yspPlayerRank);					
			}			
			
			//Player name fixes between sites. This section will have to be edited along the way.
			if (yspPlayer == 'Chris "Beanie" Wells')
				yspPlayer = 'Beanie Wells';
			else if (yspPlayer == 'Steve Johnson')
				yspPlayer = 'Stevie Johnson';
			else if (yspPlayer == 'Steve Smith (CAR)')
				yspPlayer = 'Steve Smith';
			else if (yspPlayer == 'Mike Williams (TAM)')
				yspPlayer = 'Mike Williams';
			
			playerArray.push(yspPlayer);
			playerRankArray.push(pos+yspPlayerRank);
		}
			
		
	}		

	displayRank(playerArray, playerRankArray);
}

//Insert ranking into Trends column
function displayRank(playerArray, playerRankArray)
{		
	//Gets player names on Yahoo page
	var tempMyPlayersArray = document.getElementsByClassName("player");	
	var myPlayersArray = new Array();
	
	for (var i=2; i<tempMyPlayersArray.length; i++) {
		var stripMyPlayersElement = tempMyPlayersArray[i].innerHTML.stripTags();
		var myMatches = stripMyPlayersElement.match(/(.*?) \((.*?) - (.*?)\)/);
		
		if(myMatches) { 
			if ((myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'New York') && (myMatches[2].replace(/^\s+/,"").replace(/\s+$/,"") == 'NYJ'))
			{
				myPlayersArray.push("New York Jets");
			}
			else if ((myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'New York') && (myMatches[2].replace(/^\s+/,"").replace(/\s+$/,"") == 'NYG'))
			{
				myPlayersArray.push("New York Giants");
			}
			else if ((myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Arizona') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Atlanta') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Baltimore') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Buffalo') ||( myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Carolina') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Chicago') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Cincinnati') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Cleveland') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Dallas') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Denver') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Detroit') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Green Bay') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Houston') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Indianapolis') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Jacksonville') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Kansas City') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Miami') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Minnesota') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'New England') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'New Orleans') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Oakland') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Philadelphia') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Pittsburgh') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'San Diego') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Seattle') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'San Francisco') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'St. Louis') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Tampa Bay') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Tennessee') || (myMatches[1].replace(/^\s+/,"").replace(/\s+$/,"") == 'Washington'))
			{
				var conversion = convertMatchingTeamName(myMatches[1].replace(/^\s+/,"").replace(/\s+$/,""));
				myPlayersArray.push(conversion);
			}
			else
			{				
				myPlayersArray.push(myMatches[1].replace(/^\s+/,"").replace(/\s+$/,""));
			}
		}
	}
	
	//Get possible bye weeks for the players from the 'Opp' column. This is needed for tweaking 
	//the code during bye weeks.  
	var tempOppColumnArray = document.getElementsByClassName("opp");
	var playerByeWeekArray = new Array();
	
	for (var i=2; i<tempOppColumnArray.length; i++) {
		var stripOppColumnElement = tempOppColumnArray[i].innerHTML.stripTags();
		//GM_log(stripOppColumnElement);		
		
		var oppMatches = stripOppColumnElement.match(/[a-zA-z]+/);
		if (oppMatches && (oppMatches != 'Opp'))
			playerByeWeekArray.push(oppMatches);	
	}
	
	//If the player has a bye week, remove the corresponding projected point element
	//from the project points array.
	for (var q=playerByeWeekArray.length-1; q>-1; q--) {
		if (playerByeWeekArray[q] == 'Bye')
			myPlayersArray.splice(q,1);		
	}		
	//GM_log(myPlayersArray[14]);	
	//GM_log(myPlayersArray.length);	
		
	//Find cells on the current Yahoo page for inserting individual projected points
	var trendsCells = getTrendsCells();	
		
	//Get proper column cells, match home teams, and insert all projected point vlaues into the 'Trends' column of the Yahoo page
	for (var k = 0; k < trendsCells.length; k++)
	{		
		for (var j = 0; j < playerArray.length; j++)
		{	
			if (myPlayersArray[k] == playerArray[j])
			{										
				trendsCells[k].innerHTML = trendsCells[k].innerHTML + '<div class="rank">'+playerRankArray[j]+'</div>'  ;	
			}
		}		
	}		
	
	var tempArray = document.getElementsByClassName( 'rank' );

	for (var k = 0; k < trendsCells.length; k++)
	{
		if(tempArray[k])
			tempArray[k].setAttribute('title', 'Projected Yahoo Rank This Week By Position ');		
	}
}


GM_addStyle( '\
.trends { background: inherit; border-width: 0px; float:right; } \
.projected { background: inherit; border-width: 0px; float:left; text-align:left; font-weight:bold; font-style:italic; } \
.rank { background: inherit; border-width: 0px; float:left; padding-top:10px; font-size:7pt; padding-bottom:4px;} \
.byeYes { background: inherit; border-width: 0px; float:right; f/ont-weight:bold; padding-top:10px; font-size:7pt; padding-bottom:4px;} \
.byeYesWarn { background: inherit; border-width: 0px; float:right; f/ont-weight:bold; padding-top:10px; color:red; font-size:7pt; padding-bottom:4px;} \
.byeNo { background: inherit; border-width: 0px; float:right; f/ont-weight:bold; padding-top:10px; color:green; font-size:7pt; padding-bottom:4px;} \
.trendHeaderTop { border-bottom:1px solid black; font-size: 7pt;} \
.projected {font-size: 7pt;} } \
' );


//Thank you to Glenn Carr for this function	to insert elements into Yahoo
function getTrendsCells()
{
    var trendsCells = new Array();
    
   	var reTeamAbbr = new RegExp( '^@?(' + teamAbbrevs.join( '|' ) + ')$' );
				
    for ( var iTable = 0; iTable < playerTables.length; iTable++ )
    {
        var playerTable = playerTables[ iTable ];
        for ( var iRow = 0; iRow < playerTable.rows.length; iRow++ )
        {
            var row = playerTable.rows[ iRow ];
			if ( /^td$/i.test( row.cells[ 0 ].tagName ) )
            {
                for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                {
                    var cell = row.cells[ iCell ];
										
                    var cellText = cell.innerHTML.stripTags();
					
                    var matches = cellText.match( reTeamAbbr );
					
                    if ( matches )
                    {                        
                        trendsCells.push( cell.nextSibling.nextSibling.nextSibling.nextSibling );
                    }
                   
                }
            }
        }
    }
	return trendsCells;
}

//Converts team names
function convertMatchingTeamName(myElement)
{
	var matchingHomeTeam;
	
	switch (myElement)
	{
		case 'Arizona':
			matchingHomeTeam = 'Arizona Cardinals';
		break;
		case 'Atlanta':
			matchingHomeTeam = 'Atlanta Falcons';
		break;
		case 'Baltimore':
			matchingHomeTeam = 'Baltimore Ravens';
		break;
		case 'Buffalo':
			matchingHomeTeam = 'Buffalo Bills';
		break;
		case 'Carolina':
			matchingHomeTeam = 'Carolina Panthers';
		break;
		case 'Chicago':
			matchingHomeTeam = 'Chicago Bears';
		break;
		case 'Cincinnati':
			matchingHomeTeam = 'Cincinnati Bengals';
		break;
		case 'Cleveland':
			matchingHomeTeam = 'Cleveland Browns';
		break;
		case 'Dallas':
			matchingHomeTeam = 'Dallas Cowboys';
		break;
		case 'Denver':
			matchingHomeTeam = 'Denver Broncos';
		break;
		case 'Detroit':
			matchingHomeTeam = 'Detroit Lions';
		break;
		case 'Green Bay':
			matchingHomeTeam = 'Green Bay Packers';
		break;
		case 'Houston':
			matchingHomeTeam = 'Houston Texans';
		break;
		case 'Indianapolis':
			matchingHomeTeam = 'Indianapolis Colts';
		break;
		case 'Jacksonville':
			matchingHomeTeam = 'Jacksonville Jaguars';
		break;
		case 'Kansas City':
			matchingHomeTeam = 'Kansas City Chiefs';
		break;
		case 'Miami':
			matchingHomeTeam = 'Miami Dolphins';
		break;
		case 'Minnesota':
			matchingHomeTeam = 'Minnesota Vikings';
		break;
		case 'New England':
			matchingHomeTeam = 'New England Patriots';
		break;
		case 'New Orleans':
			matchingHomeTeam = 'New Orleans Saints';
		break;
		/*case '':
			matchingHomeTeam = 'Giants';
		break;
		case '':
			matchingHomeTeam = 'Jets';
		break;*/
		case 'Oakland':
			matchingHomeTeam = 'Oakland Raiders';
		break;
		case 'Philadelphia':
			matchingHomeTeam = 'Philadelphia Eagles';
		break;
		case 'Pittsburgh':
			matchingHomeTeam = 'Pittsburgh Steelers';
		break;
		case 'San Diego':
			matchingHomeTeam = 'San Diego Chargers';
		break;
		case 'Seattle':
			matchingHomeTeam = 'Seattle Seahawks';
		break;
		case 'San Francisco':
			matchingHomeTeam = 'San Francisco 49ers';
		break;
		case 'St. Louis':
			matchingHomeTeam = 'St. Louis Rams';
		break;
		case 'Tampa Bay':
			matchingHomeTeam = 'Tampa Bay Buccaneers';
		break;
		case 'Tennessee':
			matchingHomeTeam = 'Tennessee Titans';
		break;
		case 'Washington':
			matchingHomeTeam = 'Washington Redskins';
		break;
	}
	return matchingHomeTeam;
}
