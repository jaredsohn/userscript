// ==UserScript==
// @name        	Yahoo Fantasy Football - Utilization Chart
// @description   	Displays a tooltip that shows the utilization (targets, rec%, touches, etc.) of each RB/WR/TE, courtesy of KFFL.com.
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
		if(pMatches)		
			myPlayersArray.push( pMatches[1].replace(/^\s+/,"").replace(/\s+$/,""));
			myPlayersPositions.push ( pMatches[3].replace(/^\s+/,"").replace(/\s+$/,""));
	}	
}
//GM_log(myPlayersArray.length);
//GM_log(myPlayersPositions.length);

var myRbWrTeArray = new Array();
//Copy Array
for (var p=0; p<myPlayersArray.length;p++)
	myRbWrTeArray[p]=myPlayersArray[p];
	
for (var q=myPlayersArray.length-1; q>-1; q--) {		
	if (myPlayersPositions[q] == 'QB' || myPlayersPositions[q] == 'DEF' || myPlayersPositions[q] == 'K')
		myRbWrTeArray.splice(q,1);		
	}	
//GM_log(myRbWrTeArray);


var kfflTeamURL	 = new Array();			

for (var i=0; i < playerColumnTeamArray.length; i++)
{
	//There are empty player cells on the team pages. This omits them to avoid errors. 
	if (!(playerColumnTeamArray[i].innerHTML.match(/empty/)))
	{		
		var myElement = playerColumnTeamArray[i].innerHTML.stripTags();
		var teamAbbrev = (myElement).match(/\(([a-z]+)/i)[1];
			
		//Takes care of team name differences between Yahoo and Rotoworld
		var teamURL = getTeamURL(teamAbbrev);
		kfflTeamURL.push(teamURL);		
	}			
}
//GM_log(kfflTeamURL);	
//GM_log(kfflTeamURL.length);	

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
        url: kfflTeamURL[0],
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
        url: kfflTeamURL[1],
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
        url: kfflTeamURL[2],
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
        url: kfflTeamURL[3],
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
        url: kfflTeamURL[4],
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
        url: kfflTeamURL[5],
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
        url: kfflTeamURL[6],
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
        url: kfflTeamURL[7],
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
        url: kfflTeamURL[8],
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
        url: kfflTeamURL[9],
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
        url: kfflTeamURL[10],
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
        url: kfflTeamURL[11],
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
        url: kfflTeamURL[12],
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
        url: kfflTeamURL[13],
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
        url: kfflTeamURL[14],
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
	
    if (myPlayersPositions[0]!='DEF' && myPlayersPositions[0]!='K' && myPlayersPositions[0]!='QB') {
		var urlStats01 = findInfo( urlResponseText01 );
		//arrayOfURLs.push(urlStats01); 
	}
	if (myPlayersPositions[1]!='DEF' && myPlayersPositions[1]!='K' && myPlayersPositions[1]!='QB')	{
		var urlStats02 = findInfo( urlResponseText02 );
		//arrayOfURLs.push(urlStats02); 
	}
	if (myPlayersPositions[2]!='DEF' && myPlayersPositions[2]!='K' && myPlayersPositions[2]!='QB')	{
		var urlStats03 = findInfo( urlResponseText03 );
		//arrayOfURLs.push(urlStats03); 
	}
	if (myPlayersPositions[3]!='DEF' && myPlayersPositions[3]!='K' && myPlayersPositions[3]!='QB')	{
		var urlStats04 = findInfo( urlResponseText04 );
		//arrayOfURLs.push(urlStats04); 
	}
	if (myPlayersPositions[4]!='DEF' && myPlayersPositions[4]!='K' && myPlayersPositions[4]!='QB')	{
		var urlStats05 = findInfo( urlResponseText05 );
		//arrayOfURLs.push(urlStats05); 
	}
	if (myPlayersPositions[5]!='DEF' && myPlayersPositions[5]!='K' && myPlayersPositions[5]!='QB')	{
		var urlStats06 = findInfo( urlResponseText06 );
		//arrayOfURLs.push(urlStats06); 
	}
	if (myPlayersPositions[6]!='DEF' && myPlayersPositions[6]!='K' && myPlayersPositions[6]!='QB')	{
		var urlStats07 = findInfo( urlResponseText07 );
		//arrayOfURLs.push(urlStats07); 
	}
	if (myPlayersPositions[7]!='DEF' && myPlayersPositions[7]!='K' && myPlayersPositions[7]!='QB')	{
		var urlStats08 = findInfo( urlResponseText08 );
		//arrayOfURLs.push(urlStats08); 
	}
	if (myPlayersPositions[8]!='DEF' && myPlayersPositions[8]!='K' && myPlayersPositions[8]!='QB')	{
		var urlStats09 = findInfo( urlResponseText09 );
		//arrayOfURLs.push(urlStats09); 
	}
	if (myPlayersPositions[9]!='DEF' && myPlayersPositions[9]!='K' && myPlayersPositions[9]!='QB')	{
		var urlStats10 = findInfo( urlResponseText10 );
		//arrayOfURLs.push(urlStats10); 
	}
	if (myPlayersPositions[10]!='DEF' && myPlayersPositions[10]!='K' && myPlayersPositions[10]!='QB') {
		var urlStats11 = findInfo( urlResponseText11 );
		//arrayOfURLs.push(urlStats11); 
	}
	if (myPlayersPositions[11]!='DEF' && myPlayersPositions[11]!='K' && myPlayersPositions[11]!='QB') {	
		var urlStats12 = findInfo( urlResponseText12 );
		//arrayOfURLs.push(urlStats12); 
	}
	if (myPlayersPositions[12]!='DEF' && myPlayersPositions[12]!='K' && myPlayersPositions[12]!='QB') {	
		var urlStats13 = findInfo( urlResponseText13 );
		//arrayOfURLs.push(urlStats13); 
	}
	if (myPlayersPositions[13]!='DEF' && myPlayersPositions[13]!='K' && myPlayersPositions[13]!='QB') {
		var urlStats14 = findInfo( urlResponseText14 );
		//arrayOfURLs.push(urlStats14); 
	}
	if (myPlayersPositions[14]!='DEF' && myPlayersPositions[14]!='K' && myPlayersPositions[14]!='QB') {
		var urlStats15 = findInfo( urlResponseText15 );
		//arrayOfURLs.push(urlStats15); 
	}
		
	//Start tooltip code
	attachUtilChart();
}		


var currentPlayerArray = new Array();

//Get all player links on Yahoo page
var allElements = document.evaluate("//*[contains(@href, 'http://sports.yahoo.com/nfl/players/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//GM_log(allElements.snapshotLength);

var baseKfflURL = 'http://www.kffl.com/player/';

function findInfo( responseText )
{
	var doc = document.createElement( "div" ) ;
	doc.innerHTML = responseText;

	//Get current Yahoo player and hyphenate name to match end of Rotoworld URL
	var currentPlayer = myRbWrTeArray[count].toString().toLowerCase()/*.replace(/\./g,"")*/;
	currentPlayerEdit = currentPlayer.replace(' ', '-');	
	//GM_log(currentPlayerEdit);
	
	var teamPageList = document.evaluate("//table[@class='teamtable']//a[contains(@href, '" + currentPlayerEdit + "')]",doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//GM_log(teamPageList.snapshotLength);
	
	//Finds your Yahoo players on Rotoworld team pages and acquires unique URL player id
	for (var m=0; m<teamPageList.snapshotLength; m++)
	{			
		var playerHTML = teamPageList.snapshotItem(m).parentNode.innerHTML;
		//GM_log(playerHTML);
		var playerCode = playerHTML.match(/\d{1,10}/);			
		//GM_log(match);
		var playerURL = baseKfflURL + playerCode + '/nfl/utilization/' + currentPlayerEdit;
		//GM_log(playerURL);	
		
		//Added to prevent multiple matches
		break;					
	}
	
	addKFFLicon(allElements, playerURL);
	count++;
	return playerURL;
}

function addKFFLicon(allElements, playerURL) {

	var thisElement;
	var kfflLink;	
		
	var kfflLinkGraphic = 'data:image/pjpeg;base64,' +
		'/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYa' +
		'HSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgo' +
		'KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAwDASIAAhEBAxEB/8QA' +
		'FwAAAwEAAAAAAAAAAAAAAAAABAUGB//EACUQAAEDBAEDBQEAAAAAAAAAAAECAwQFBhEhABITMQcUQVFx' +
		'kf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAbEQABBAMAAAAAAAAAAAAAAAAAAQIDEhEhMf/aAAwDAQAC' +
		'EQMRAD8AL9wzV6ZRC7ZgkNMIaW0tMMJD6u3j6Hc1lWN+MnxzMfUC4KpSbplw2aVTqMwjBajNwGtoOws9' +
		'SMlRB3/PjjOsz5jdkWuW5chBbmthBS4R046wMb1ga/OSdxT5kmpFciXIdUEhILjhUQN62eLG6q56G5La' +
		'P//Z';

	//Avoids QBs with this code. Will also work if you have two QBs on your bench next to each other.
	if(/- QB\)/i.test(allElements.snapshotItem(item).parentNode.parentNode.innerHTML))
		item=item+2;
	if(/- QB\)/i.test(allElements.snapshotItem(item).parentNode.parentNode.innerHTML))
		item=item+2;

	thisElement = allElements.snapshotItem(item);
	kfflLink = document.createElement('a');
	kfflLink.setAttribute("href", playerURL);
	kfflLink.setAttribute("target","_blank");
	kfflLink.setAttribute("class","kffl");
	kfflLink.innerHTML = "<img border='0' src='" + kfflLinkGraphic +"'>"
	
	thisElement.parentNode.appendChild(kfflLink, thisElement.nextSibling);
	
	//Makes this script 'play nice' with Tim Wilson's gamelog script
	if (/gamelog/i.test(thisElement.parentNode.innerHTML))
		item=item+3;
	else
		item=item+2;

}


//Tooltip code. Credit goes to Glenn Carr and Tim Wilson thereafter.
function attachUtilChart() {
	var Y   = YAHOO,
		yut = Y.util,
		yud = yut.Dom,
		yue = yut.Event,
		yua = yut.Anim;

	var KfflNews = function () {
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
		 * Initializes the KfflNews module, injecting HTML and CSS into the page
		 * and attaching event handlers. This method must be called AFTER the YUI
		 * libs are loaded.
		 */
		init: function () {
		  this.inject();

		  // Create custom events.
		  this.onKfflReceived = new yut.CustomEvent('kfflReceived', this);

		  // Attach event handlers.
		  var kfflImages = yud.getElementsBy(function(el) { return /kffl/i.test( el.href ); }, 'a');

		  yue.addListener(kfflImages, 'mouseover', this.showDesc, this, true);
		  yue.addListener(kfflImages, 'mouseout', this.hideDesc, this, true);

		  this.onKfflReceived.subscribe(function (e, args) {
			this.refreshDesc(args[0]);
		  }, this, true);
		},

		/**
		 * Injects markup and CSS used for the tooltips.
		 */
		inject: function () {
		  GM_addStyle(
			  '.kfflutilinfo { width:450px;}' +  
			  '.kfflutilinfo table { border: 2px solid #393939; }' +  
			  '.kfflutilinfo tr { border-bottom: 2px solid #393939; }' +		
			  '.kfflutilinfo td { padding-left:7px; padding-right:7px; }' +		
			  '.kfflutilinfo div.inner, .kfflutilinfo div.loading { display:block; position:relative; background:white; border:8px outset #333333; margin:15px; }' +		        
			  '.kfflutilinfo div.loading { font-style: italic; color: #666666; font-size: 80% }' 
		  );
		  //#ffffcc (news tan)
		  //#B82F33 (roto red)

		  var div = document.createElement( 'DIV' );
		  div.id = 'kfflutildesc';
		  div.style.display = 'none';
		  div.style.height = '0px';
		  div.setAttribute( 'class', 'kfflutilinfo' );
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
			this.onKfflReceived.fire(infoCache[url]);
			return;
		  }

		  GM_xmlhttpRequest({
			method: 'GET',
			url   : url,
			onload: function (response) {
			  infoCache[url] = response.responseText;
			  KfflNews.onKfflReceived.fire(response.responseText);
			}
		  });
		},

		/**
		 * Hides the roto news tooltip.
		 */
		hideDesc: function (e) {
		  clearTimeout(descTimeout);
		  yud.setStyle('kfflutildesc', 'display', 'none');
		},

		/**
		 * Refreshes the roto news tooltip when player info is received.
		 *
		 * @param {String} kfflContent contents of the roto news page
		 */
		refreshDesc: function (kfflContent) {
		  var kfflTooltip = yud.get('kfflutildesc');		
		  		  
		  var html = kfflContent.replace( /[\r\n]+/g, '' )/*.replace(/id='\d{6}' style='display:block;'>/, '').replace(/id='\d{6}' style='display:none;'>/, '')*/;
		  //GM_log(html);
		  var splitContent = html.split( /<table border=1 cellpadding=1 cellspacing=1 width=630>/i );
		  var utilChart = splitContent[1].split(/<\/table><p><b>Looking for more player target and utilization information?/i);
		  //GM_log(utilChart[0]);
		  		
		  var tip = new Array();
		  kfflTooltip.innerHTML = '<div class="inner"><table cellspacing="0"><col/><col style="display:none">' + utilChart[0] + '</table></div>';		  
		  		
		},

		/**
		 * Shows the tooltip after a delay.
		 */
		showDesc: function (e) {

		  descTimeout = setTimeout(function () {
			var kfflTooltip  = yud.get('kfflutildesc'),
				kfflLink  = yue.getTarget(e).parentNode,
				anim       = new yua(kfflTooltip, {opacity: {to: 1.0}}, 0.4, yut.Easing.easeBoth);

			kfflTooltip.innerHTML = '<div class="loading">Loading...<img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

			KfflNews.getRotoNews(kfflLink.href);

			yud.setStyle(kfflTooltip, 'opacity', 0.0);
			yud.setStyle(kfflTooltip, 'display', 'block');

			yud.setXY(kfflTooltip, [yud.getX(kfflLink),
				yud.getY(kfflLink) + kfflLink.offsetHeight -20]);

			anim.animate();
		  }, 100);
		}
	  };
	}();

KfflNews.init();
}

//Converts team names
function getTeamURL(teamAbbrev)
{
	var teamURL;
	
	switch (teamAbbrev)
	{
		case 'Ari':
			teamURL = 'http://www.kffl.com/team/6/nfl/arizona-cardinals';
		break;
		case 'Atl':
			teamURL = 'http://www.kffl.com/team/7/nfl/atlanta-falcons';
		break;
		case 'Bal':
			teamURL = 'http://www.kffl.com/team/8/nfl/baltimore-ravens';
		break;
		case 'Buf':
			teamURL = 'http://www.kffl.com/team/9/nfl/buffalo-bills';
		break;
		case 'Car':
			teamURL = 'http://www.kffl.com/team/10/nfl/carolina-panthers';
		break;
		case 'Chi':
			teamURL = 'http://www.kffl.com/team/11/nfl/chicago-bears';
		break;
		case 'Cin':
			teamURL = 'http://www.kffl.com/team/12/nfl/cincinnati-bengals';
		break;
		case 'Cle':
			teamURL = 'http://www.kffl.com/team/13/nfl/cleveland-browns';
		break;
		case 'Dal':
			teamURL = 'http://www.kffl.com/team/14/nfl/dallas-cowboys';
		break;
		case 'Den':
			teamURL = 'http://www.kffl.com/team/15/nfl/denver-broncos';
		break;
		case 'Det':
			teamURL = 'http://www.kffl.com/team/16/nfl/detroit-lions';
		break;
		case 'GB':
			teamURL = 'http://www.kffl.com/team/17/nfl/green-bay-packers';
		break;
		case 'Hou':
			teamURL = 'http://www.kffl.com/team/18/nfl/houston-texans';
		break;
		case 'Ind':
			teamURL = 'http://www.kffl.com/team/19/nfl/indianapolis-colts';
		break;
		case 'Jac':
			teamURL = 'http://www.kffl.com/team/20/nfl/jacksonville-jaguars';
		break;
		case 'KC':
			teamURL = 'http://www.kffl.com/team/21/nfl/kansas-city-chiefs';
		break;
		case 'Mia':
			teamURL = 'http://www.kffl.com/team/22/nfl/miami-dolphins';
		break;
		case 'Min':
			teamURL = 'http://www.kffl.com/team/23/nfl/minnesota-vikings';
		break;
		case 'NE':
			teamURL = 'http://www.kffl.com/team/24/nfl/new-england-patriots';
		break;
		case 'NO':
			teamURL = 'http://www.kffl.com/team/25/nfl/new-orleans-saints';
		break;
		case 'NYG':
			teamURL = 'http://www.kffl.com/team/26/nfl/new-york-giants';
		break;
		case 'NYJ':
			teamURL = 'http://www.kffl.com/team/27/nfl/new-york-jets';
		break;
		case 'Oak':
			teamURL = 'http://www.kffl.com/team/28/nfl/oakland-raiders';
		break;
		case 'Phi':
			teamURL = 'http://www.kffl.com/team/29/nfl/philadelphia-eagles';
		break;
		case 'Pit':
			teamURL = 'http://www.kffl.com/team/30/nfl/pittsburgh-steelers';
		break;
		case 'SD':
			teamURL = 'http://www.kffl.com/team/31/nfl/san-diego-chargers';
		break;
		case 'Sea':
			teamURL = 'http://www.kffl.com/team/33/nfl/seattle-seahawks';
		break;
		case 'SF':
			teamURL = 'http://www.kffl.com/team/32/nfl/san-francisco-49ers';
		break;
		case 'StL':
			teamURL = 'http://www.kffl.com/team/34/nfl/st.-louis-rams';
		break;
		case 'TB':
			teamURL = 'http://www.kffl.com/team/35/nfl/tampa-bay-buccaneers';
		break;
		case 'Ten':
			teamURL = 'http://www.kffl.com/team/36/nfl/tennessee-titans';
		break;
		case 'Was':
			teamURL = 'http://www.kffl.com/team/37/nfl/washington-redskins';
		break;
	}
	return teamURL;
}