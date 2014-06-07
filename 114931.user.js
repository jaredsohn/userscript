// ==UserScript==
// @name        	Yahoo Fantasy Football - Rotoworld News Tooltip
// @description   	Displays a tooltip that links to each player's news page at Rotoworld.com.  
// @version			2012.09.05
// @include       	*football.fantasysports.yahoo.com/f1/*/*
// @exclude			*football.fantasysports.yahoo.com/f1/*/matchup*
// @exclude			*football.fantasysports.yahoo.com/f1/*/players*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*addplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/*dropplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/*playerswatch*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/*proposetrade*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*pointsagainst*
// @require        http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js
// @require        http://yui.yahooapis.com/2.5.2/build/animation/animation-min.js
// ==/UserScript==

// Credit goes to Tim Wilson (http://userscripts.org/users/15093) and Glenn Carr (http://userscripts.org/users/27183)
// for various code and procedures. 


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

//Find date information for later use
var today = new Date();
var day = today.getDate();
var dayPrev = day - 1; 
var monthNum = today.getMonth();
var monthText = getMonthText(monthNum);
var date = monthText + ' ' + day;
var datePrev = monthText + ' ' + dayPrev;

function getMonthText(monthNum) {
	var monthText;
	
	switch(monthNum)
	{
	case 0:
	  monthText = 'Jan';
	  break;
	case 1:
	  monthText = 'Feb';
	  break;
	case 2:
	  monthText = 'Mar';
	  break;
	case 3:
	  monthText = 'Apr';
	  break;
	case 4:
	  monthText = 'May';
	  break;
	case 5:
	  monthText = 'Jun';
	  break;
	case 6:
	  monthText = 'Jul';
	  break;
	case 7:
	  monthText = 'Aug';
	  break;
	case 8:
	  monthText = 'Sep';
	  break;
	case 9:
	  monthText = 'Oct';
	  break;
	case 10:
	  monthText = 'Nov';
	  break;
	case 11:
	  monthText = 'Dec';
	  break;	
	default:
	  return;
	}
	return monthText;
}

//Get important URL information for later use
var currentURL = document.URL;
var lengthOfURL = currentURL.length;
var baseURL = currentURL.match(/http\:\/\/football\.fantasysports\.yahoo\.com\/f1\//);
var leagueCode = currentURL.match(/\d\d\d\d\d\d/);
var teamNumber = getTeamNumber();

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

//Possible home team name located in 'Offense'/'Player' or 'Opp' column of table
var playerColumnTeamArray = new Array();
	
//Determine which page the user is on and assign the appropriate variables to accurately move through tables
//Each var below contains an expression for matching the current URL
var regexMatchup = new RegExp(/matchup/);
var regexTeam = new RegExp(/team/);
var regexWeek = new RegExp(/week/);
var regexDate = new RegExp(/date/);
var regexPlayers = new RegExp(/players/);

//Matchup page
if (currentURL.match(regexMatchup)) 
{
	var playerColStarter = 1;
	var iteration = 6;
}
//League Team Pages
else if(currentURL.match(regexTeam))
{
	//My own league page if I choose it out of the scroll menu (on the right)
	var urlTeamString = currentURL.match(/mid\=\d{1,2}/);
	var urlTeamNumber = urlTeamString[0].match(/\d{1,2}/);
			
	if (urlTeamNumber[0] == teamNumber)        
	{
		var playerColStarter = 2;
		var iteration = 25;
	}
	//Your opponent's team pages
	else
	{
		var playerColStarter = 2;
		var iteration = 23;
	}
}
//Note that opponent pages match both regexWeek & regexTeam, but regexTeam is placed first to catch all of those pages.
//Click to see future weeks
else if(currentURL.match(regexWeek))
{			
	//My own league page if I choose it out of the scroll menu (on the right)
	var urlTeamString = currentURL.match(/\d{1,2}\?week/);
	var urlTeamNumber = urlTeamString[0].match(/\d{1,2}/);
	
	if (urlTeamNumber[0] == teamNumber)        
	{
		var playerColStarter = 2;
		var iteration = 25;
	}
	//Your opponent's team pages
	else
	{
		var playerColStarter = 2;
		var iteration = 23;
	}		
}
//Occurs after you add a player
else if(currentURL.match(regexDate))
{
	var playerColStarter = 2;
	var iteration = 23;
}
//'Players' page
else if(currentURL.match(regexPlayers))
{
	var playerColStarter = 0;
	var iteration = 24;	
}
//'My Team' page
else if(currentURL == baseURL + leagueCode + '/' + teamNumber)
{
	var playerColStarter = 2;
	var iteration = 25;
}
else 
{
	var playerColStarter = 2;
	var iteration = 25;
}

//Move through each table on the page 
for ( var iTable = 0; iTable < playerTables.length; iTable++ )
{
	//Get the respective tables
	var playerTable = playerTables[ iTable ];
	
	//Move through each row of the respective tables
	for ( var iRow = 0; iRow < playerTable.rows.length; iRow++ )
	{
		var row = playerTable.rows[ iRow ];
		
		//Only use code in <td> tags
		if ( /^td$/i.test( row.cells[ 0 ].tagName ) )
		{
			//Traverses through each 'Offense'/'Player' column, grabs the text, and creates array.
			for ( var iCell = playerColStarter; iCell < row.cells.length; iCell=iCell+iteration )
			{
				var cell = row.cells[ iCell ];		
				playerColumnTeamArray.push(cell);						
			}				
		}
	}	
}

//Gets player names on Yahoo page
var tempMyPlayersArray = document.getElementsByClassName("player");	
var myPlayersArray = new Array();
var myPlayersPositions = new Array();

for (var p=0; p<playerColumnTeamArray.length; p++) {
	var stripPlayerColumnElement = playerColumnTeamArray[p].innerHTML.stripTags();
	//GM_log(stripPlayerColumnElement);
	if (!(stripPlayerColumnElement.match(/empty/)))
	{
		var pMatches = stripPlayerColumnElement.match(/(.*?) \((.*?) - (.*?)\)/);
		//GM_log(pMatches[1] + pMatches[3]);
		if(pMatches) {		
			myPlayersArray.push( pMatches[1].replace(/^\s+/,"").replace(/\s+$/,""));
			myPlayersPositions.push ( pMatches[3].replace(/^\s+/,"").replace(/\s+$/,"")); }
	}	
}
//GM_log(myPlayersArray.length);
//GM_log(myPlayersPositions.length);
//GM_log(playerColumnTeamArray.length);

var yahooTeam= new Array();			

for (var i=0; i < playerColumnTeamArray.length; i++)
{
	//There are empty player cells on the team pages. This omits them to avoid errors. 
	if (!(playerColumnTeamArray[i].innerHTML.match(/empty/)))
	{		
		var myElement = playerColumnTeamArray[i].innerHTML.stripTags();
		var myNewElement = (myElement).match(/\(([a-z]+)/i)[1];
			
		//Takes care of team name differences between Yahoo and Rotoworld
		if (myNewElement =='Ari') {
			myNewElement='Arz'; }
				
		yahooTeam.push(myNewElement);		
	}			
}
//GM_log(yahooTeam);	
//GM_log(yahooTeam.length);	

var teamURL = new Array();

//Add all rotoworld team page links for each player to an array
for (var j=0; j< myPlayersArray.length; j++)
{
	teamURL.push('http://www.rotoworld.com/teams/clubhouse/nfl/' + yahooTeam[j].toLowerCase());
}
//GM_log(teamURL);
//GM_log(teamURL.length);

//var arrayOfURLs = new Array();

var count = 0;
var item = 0;

var urlResponseText15, urlResponseText14, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01;

//Start code to import Rotoworld link
fetchRankData();

//Mulitple xmlhttprequests (15)
function fetchRankData()
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[0],
		onload: getURL01Handler(handleURL02),
		});
}

function getURL01Handler( responseHandler )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )		
            responseHandler( responseDetails.responseText );
    }
}

function handleURL02( responseText )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[1],
        onload: getURL02Handler( handleURL03, responseText ),
        });
}

function getURL02Handler( responseHandler, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText01 );
    }
}

function handleURL03( responseText, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[2],
        onload: getURL03Handler( handleURL04, responseText, urlResponseText01 ),
        });
}

function getURL03Handler( responseHandler, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText02, urlResponseText01 );
    }
}

function handleURL04( responseText, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[3],
        onload: getURL04Handler( handleURL05, responseText, urlResponseText02, urlResponseText01 ),
        });
}

function getURL04Handler( responseHandler, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL05( responseText, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[4],
        onload: getURL05Handler( handleURL06, responseText, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL05Handler( responseHandler, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL06( responseText, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[5],
        onload: getURL06Handler( handleURL07, responseText, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL06Handler( responseHandler, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL07( responseText, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[6],
        onload: getURL07Handler( handleURL08, responseText, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL07Handler( responseHandler, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL08 (responseText, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[7],
        onload: getURL08Handler( handleURL09, responseText, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL08Handler( responseHandler, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL09 (responseText, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[8],
        onload: getURL09Handler( handleURL10, responseText, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL09Handler( responseHandler, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL10 (responseText, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[9],
        onload: getURL10Handler( handleURL11, responseText, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL10Handler( responseHandler, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL11 (responseText, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[10],
        onload: getURL11Handler( handleURL12, responseText, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL11Handler( responseHandler, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL12 (responseText, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[11],
        onload: getURL12Handler( handleURL13, responseText, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL12Handler( responseHandler, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL13 (responseText, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[12],
        onload: getURL13Handler( handleURL14, responseText, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL13Handler( responseHandler, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL14 (responseText, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[13],
        onload: getURL14Handler( handleURL15, responseText, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL14Handler( responseHandler, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}

function handleURL15 (responseText, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: teamURL[14],
        onload: getURL15Handler( directResponse, responseText, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 ),
        });
}

function getURL15Handler( responseHandler, urlResponseText14, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, urlResponseText14, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 );
    }
}


//Sends response data to the appropriate function
function directResponse( urlResponseText15, urlResponseText14, urlResponseText13, urlResponseText12, urlResponseText11, urlResponseText10, urlResponseText09, urlResponseText08, urlResponseText07, urlResponseText06, urlResponseText05, urlResponseText04, urlResponseText03, urlResponseText02, urlResponseText01 )
{
	
    if (myPlayersPositions[0]!='DEF' && myPlayersPositions[0]!='K') {
		var urlStats01 = findInfo( urlResponseText01 );
		//arrayOfURLs.push(urlStats01); 
	}
	if (myPlayersPositions[1]!='DEF' && myPlayersPositions[1]!='K')	{
		var urlStats02 = findInfo( urlResponseText02 );
		//arrayOfURLs.push(urlStats02); 
	}
	if (myPlayersPositions[2]!='DEF' && myPlayersPositions[2]!='K')	{
		var urlStats03 = findInfo( urlResponseText03 );
		//arrayOfURLs.push(urlStats03); 
	}
	if (myPlayersPositions[3]!='DEF' && myPlayersPositions[3]!='K')	{
		var urlStats04 = findInfo( urlResponseText04 );
		//arrayOfURLs.push(urlStats04); 
	}
	if (myPlayersPositions[4]!='DEF' && myPlayersPositions[4]!='K')	{
		var urlStats05 = findInfo( urlResponseText05 );
		//arrayOfURLs.push(urlStats05); 
	}
	if (myPlayersPositions[5]!='DEF' && myPlayersPositions[5]!='K')	{
		var urlStats06 = findInfo( urlResponseText06 );
		//arrayOfURLs.push(urlStats06); 
	}
	if (myPlayersPositions[6]!='DEF' && myPlayersPositions[6]!='K')	{
		var urlStats07 = findInfo( urlResponseText07 );
		//arrayOfURLs.push(urlStats07); 
	}
	if (myPlayersPositions[7]!='DEF' && myPlayersPositions[7]!='K')	{
		var urlStats08 = findInfo( urlResponseText08 );
		//arrayOfURLs.push(urlStats08); 
	}
	if (myPlayersPositions[8]!='DEF' && myPlayersPositions[8]!='K')	{
		var urlStats09 = findInfo( urlResponseText09 );
		//arrayOfURLs.push(urlStats09); 
	}
	if (myPlayersPositions[9]!='DEF' && myPlayersPositions[9]!='K')	{
		var urlStats10 = findInfo( urlResponseText10 );
		//arrayOfURLs.push(urlStats10); 
	}
	if (myPlayersPositions[10]!='DEF' && myPlayersPositions[10]!='K') {
		var urlStats11 = findInfo( urlResponseText11 );
		//arrayOfURLs.push(urlStats11); 
	}
	if (myPlayersPositions[11]!='DEF' && myPlayersPositions[11]!='K') {	
		var urlStats12 = findInfo( urlResponseText12 );
		//arrayOfURLs.push(urlStats12); 
	}
	if (myPlayersPositions[12]!='DEF' && myPlayersPositions[12]!='K') {	
		var urlStats13 = findInfo( urlResponseText13 );
		//arrayOfURLs.push(urlStats13); 
	}
	if (myPlayersPositions[13]!='DEF' && myPlayersPositions[13]!='K') {
		var urlStats14 = findInfo( urlResponseText14 );
		//arrayOfURLs.push(urlStats14); 
	}
	if (myPlayersPositions[14]!='DEF' && myPlayersPositions[14]!='K') {
		var urlStats15 = findInfo( urlResponseText15 );
		//arrayOfURLs.push(urlStats15); 
	}
		
	//Start tooltip code
	attachNewsLog();
}		


var currentPlayerArray = new Array();

//Get all player links on Yahoo page
var allElements = document.evaluate("//*[contains(@href, 'http://sports.yahoo.com/nfl/players/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//GM_log(allElements.snapshotItem(0).innerHTML);
//GM_log(allElements.snapshotLength);

var baseRotoworldURL = 'http://www.rotoworld.com';

function findInfo( responseText )
{
	var doc = document.createElement( "div" ) ;
	doc.innerHTML = responseText;

	//Get current Yahoo player and hyphenate name to match end of Rotoworld URL
	var currentPlayer = myPlayersArray[count].toString().toLowerCase().replace(/\./g,"");
	currentPlayerEdit = currentPlayer.replace(' ', '-');
	//GM_log(currentPlayerEdit);
	
	var teamPageList = document.evaluate("//a[contains(@href, '" + currentPlayerEdit + "')]",doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//GM_log(teamPageList.snapshotLength);
	
	//Finds your Yahoo players on Rotoworld team pages and acquires unique URL player id
	for (var m=0; m<teamPageList.snapshotLength; m++)
	{				
		if ((teamPageList.snapshotItem(m).innerHTML.toString()) == (myPlayersArray[count].toString()))
		{
			var playerHTML = teamPageList.snapshotItem(m).parentNode.innerHTML;
			var match = playerHTML.match(/\/nfl\/\d{1,10}\/[a-z]+\-[a-z]+/);
			//GM_log(match);
			
			var playerURL = baseRotoworldURL +"/recent" + match
			//GM_log(playerURL);	
			
			//Added to prevent multiple matches
			break;
		}					
	}
	
	addRotoNewsIcon(allElements, playerURL);
	count++;
	return playerURL;
}

function addRotoNewsIcon(allElements, playerURL) {

	var thisElement;
	var rotoworldLink;	
		
	var rotoworldLinkGraphic = 'data:application/file;base64,' +
		'AAABAAEADAwAAAEAGAAIAgAAFgAAACgAAAAMAAAAGAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAAAAAA' +
		'AADR09TR09TNztLGydDIytHP0NPP0NPIytHFyNHJytHP0dPR09TR09TP0dOho8tzdM17fMy6vM60ts15' +
		'esxub82Ji8nExtDR09TR09TMz9J5eckzL98+O9icn8d4eMgyL94yLtxxcMbFx9DR09TR09TMztJ3eMky' +
		'LuE9Otp+gMBKSNEuKOZIRc+usMzQ0tTR09TR09TMztJ3eMgyLto0MNNEQ8AtKNYsJ9eDhcLP0NPR09TR' +
		'09TR09TMztJ3eMYxLdMrJ9UrJtEsJ9grJs9kY8O3uc3R09TR09TR09TMztJ3eMQyLMwuKMw5NsM1McUt' +
		'Js40L8iBgcPNztLR09TR09TMztJ3eMIxLcY5NcKGh8KEhMI4M8IvKsVubcHJy9HR09TR09TMztJ3eMAy' +
		'LcAtKL02MrUzL7gsJ78zLr58e8DMzdLR09TR09TMz9J5e8AxLrsrJ7wrJ7wtKbw0MbxhX72wscvQ0tTR' +
		'09TR09TP0dSrrcuFhcSBgcSBgcSDhcWRksW6u83Q0dPR09TR09TR09TR09TP0dPNz9PNz9PNz9PNz9PP' +
		'0dPR09TR09TR09TR09QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAA=';
		
		//Greyscale R image
	var rotoworldLinkGraphicGrey = 'data:image/x-icon;base64,' +
		'AAABAAEADAwAAAEACADoBAAAFgAAACgAAAAMAAAAGAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAA' +
		'AABUVFQAlZWVAHt7ewBra2sAWVlZALe3twBbW1sAysrKAIiIiABZWVkAoaGhAJCQkAC/v78AYGBgAGNj' +
		'YwDQ0NAAWFhYAJiYmABfX18AkJCQAG9vbwC8vLwAYmJiAFZWVgCWlpYAXl5eALq6ugBdXV0Azc3NAIuL' +
		'iwBeXl4AqampAJCQkADAwMAAZWVlANPT0wCVlZUAgICAAGlpaQBcXFwAubm5AF1dXQDMzMwAioqKAFxc' +
		'XABjY2MA0tLSAFtbWwCenp4AYWFhAJOTkwB0dHQAWFhYAK+vrwCSkpIAwsLCAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAIyMPKhwuIyoqHC4jLi41HQEhFTIIMAcjIy42LQMfNi0tCCojIw8gIgMkFBYmGi4jIw8LDQ4m' +
		'GykRDyMuIw8gDQYGBgYlDCMjIw8LLBAxGRAeGA8uLg8TNDERERI0CA8jIw8gCRcECQAJEw8uIw8gCQAA' +
		'FycCGi4jIy4FERgkEQoMLiMjIy4jDw8PDy4jIy4jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAA';

		
		thisElement = allElements.snapshotItem(item);		
		rotoworldLink = document.createElement('a');
		rotoworldLink.setAttribute("href", playerURL);
		rotoworldLink.setAttribute("target","_blank");
		rotoworldLink.setAttribute("class","rotoworld");
		
		//GM_log(thisElement.parentNode.parentNode.lastChild.innerHTML);
	
	//Locates player page and determines which R image to used based on a date match
	GM_xmlhttpRequest({
        method: 'GET',
        url: playerURL,
		onload: function (results) {				
			
			if (results.responseText.match(date) || results.responseText.match(datePrev))
				rotoworldLink.innerHTML = "<img border='0' src='" + rotoworldLinkGraphic +"'>" ;
			else
				rotoworldLink.innerHTML = "<img border='0' src='" + rotoworldLinkGraphicGrey +"'>" ;			
			}	
		});
	
	thisElement.parentNode.parentNode.lastChild.appendChild(rotoworldLink);
	//thisElement.parentNode.parentNode.lastChild.appendChild(rotoworldLink, thisElement.nextSibling););
		
	//Fix that allows this script to work with Tim Wilson's Game Log Link
	if (/gamelog/i.test(thisElement.parentNode.innerHTML))
		item=item+3;
	else
		item=item+2;

}


//Tooltip code. Credit goes to Glenn Carr and Tim Wilson thereafter.
function attachNewsLog() {
	var Y   = YAHOO,
		yut = Y.util,
		yud = yut.Dom,
		yue = yut.Event,
		yua = yut.Anim;

	var RotoNews = function () {
	  // -- Private Variables ------------------------------------------------------
	  var infoCache    = {},
		  descTimeout  = null,
		  WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
	"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
	"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
	"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
	"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
	"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
	"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
	"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
	"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

	  return {
		// -- Public Methods -------------------------------------------------------

		/**
		 * Initializes the RotoNews module, injecting HTML and CSS into the page
		 * and attaching event handlers. This method must be called AFTER the YUI
		 * libs are loaded.
		 */
		init: function () {
		  this.inject();

		  // Create custom events.
		  this.onRotoNewsReceived = new yut.CustomEvent('rotoNewsReceived', this);

		  // Attach event handlers.
		  var rotoNewsImages = yud.getElementsBy(function(el) { return /rotoworld/i.test( el.href ); }, 'a');

		  yue.addListener(rotoNewsImages, 'mouseover', this.showDesc, this, true);
		  yue.addListener(rotoNewsImages, 'mouseout', this.hideDesc, this, true);

		  this.onRotoNewsReceived.subscribe(function (e, args) {
			this.refreshDesc(args[0]);
		  }, this, true);
		},

		/**
		 * Injects markup and CSS used for the tooltips.
		 */
		inject: function () {
		  GM_addStyle(
			  '.rotonewsinfo { text-align:left; float:left; !important; width:auto; background: url(http://us.i1.yimg.com/us.yimg.com/i/us/sp/fn/default/full/drop_shadow.gif) no-repeat bottom right; width:500px; }' +  
			  '.rotonewsinfo tr:first-child { border-bottom: 3px solid #393939; }' +
			  '.rotonewsinfo tr:last-child { }' +
			  '.rotonewsinfo div.inner, .rotonewsinfo div.loading { display:block; position:relative; background:ivory; border:8px outset #333333; margin:15px; padding:3px; }' +		        
			  '.rotonewsinfo div.loading { font-style: italic; color: #666666; font-size: 80% }' +
			  '.news { background:#ffffcc; }' +
			  '.report { font-weight:bold; padding-bottom:5px; padding-top:5px; padding-left:10px; padding-right:10px;}' +
			  '.impact { color: #0000FF; padding-bottom:5px; padding-left:10px; padding-right:10px; }' +
			  '.date { color: #B82F33; font-weight: bold; }' +
			  '.source { color: black; font-size: 8pt; font-style:italic; padding-bottom:7px; padding-left:10px; padding-right:10px;}'
		  );
		  //#ffffcc (news tan)
		  //#B82F33 (roto red)

		  var div = document.createElement( 'DIV' );
		  div.id = 'rotonewsdesc';
		  div.style.display = 'none';
		  div.style.height = '0px';
		  div.setAttribute( 'class', 'rotonewsinfo' );
		  div.style.zIndex = 99;
		  document.body.appendChild( div );
		},

		/**
		 * Downloads the player page at the specified URL and caches it for
		 * future use.
		 *
		 * @param {String} player page url
		 */
		getRotoNews: function (url) {
		  if (infoCache.hasOwnProperty(url)) {
			this.onRotoNewsReceived.fire(infoCache[url]);
			return;
		  }

		  GM_xmlhttpRequest({
			method: 'GET',
			url   : url,
			onload: function (response) {
			  infoCache[url] = response.responseText;
			  RotoNews.onRotoNewsReceived.fire(response.responseText);
			}
		  });
		},

		/**
		 * Hides the roto news tooltip.
		 */
		hideDesc: function (e) {
		  clearTimeout(descTimeout);
		  yud.setStyle('rotonewsdesc', 'display', 'none');
		},

		/**
		 * Refreshes the roto news tooltip when player info is received.
		 *
		 * @param {String} rotoNewsContent contents of the roto news page
		 */
		refreshDesc: function (rotoNewsContent) {
		  var rotoNewsTooltip = yud.get('rotonewsdesc');		
		  		  
		  var html = rotoNewsContent.replace( /[\r\n]+/g, '' ).replace(/id='\d{6}' style='display:block;'>/, '').replace(/id='\d{6}' style='display:none;'>/, '');
		  var playerNews = html.split( /<div class='playernews'/i );
		  //GM_log(playerNews[1]);
		  		
		  var tip = new Array();
		  for ( var i = 1; i < playerNews.length-2; i++ )
		  {			
			tip.push( '<tr class="news">'+playerNews[ i ]+'</tr>' );
		  }
		  if ( tip.length > 0 )
		  {
			rotoNewsTooltip.innerHTML = '<div class="inner"><table cellspacing="0"><col/><col style="display:none">' + tip.join( '' ) + '</table></div>';
		  }
		  else
		  {
			rotoNewsTooltip.innerHTML = '<div class="inner">No notes.</div>';
		  }		
		
		},

		/**
		 * Shows the tooltip after a delay.
		 */
		showDesc: function (e) {

		  descTimeout = setTimeout(function () {
			var rotoNewsTooltip  = yud.get('rotonewsdesc'),
				rotoNewsLink  = yue.getTarget(e).parentNode,
				anim       = new yua(rotoNewsTooltip, {opacity: {to: 1.0}}, 0.4, yut.Easing.easeBoth);

			rotoNewsTooltip.innerHTML = '<div class="loading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

			RotoNews.getRotoNews(rotoNewsLink.href);

			yud.setStyle(rotoNewsTooltip, 'opacity', 0.0);
			yud.setStyle(rotoNewsTooltip, 'display', 'block');

			yud.setXY(rotoNewsTooltip, [yud.getX(rotoNewsLink),
				yud.getY(rotoNewsLink) + rotoNewsLink.offsetHeight -20]);

			anim.animate();
		  }, 100);
		}
	  };
	}();

RotoNews.init();
}