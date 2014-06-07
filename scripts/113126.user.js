// ==UserScript==
// @name           	Yahoo Fantasy Football Matchup Ratings & SOS
// @namespace      	http://football.fantasysports.yahoo.com
// @description    	Imports the 5-star Yahoo matchup ratings into the main player pages for every team in your league. Adds Strength of Schedule (SOS) rankings for playoff weeks and remaining games. 
// @version			2012.10.08
// @include        	*football.fantasysports.yahoo.com/*
// @exclude			*football.fantasysports.yahoo.com/f1/*/players*
// @exclude			*football.fantasysports.yahoo.com/f1/*/matchup*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/team?stat*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*?week=*
// @exclude			*football.fantasysports.yahoo.com/f1/*/addplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/dropplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/playerswatch*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/proposetrade*
// @exclude			*football.fantasysports.yahoo.com/f1/*/pointsagainst*
// @exclude			*football.fantasysports.yahoo.com/f1/*/viewtrade*

// ==/UserScript==

// Credit for the concept of this script goes to Wouter van Wageningen. (http://userscripts.org/scripts/show/36168)
// Credit for many of coding procedures & styles goes to Glenn Carr. (http://userscripts.org/users/glenncarr) 

// Features and/or Notes:
// 1) Inserts the matchup rating images normally in the RESEARCH tab directly into the main team pages.
// 2) The title attribute of each star image provides a mini tooltip that summarizes what was stated 
//    about each player on the matchup ratings page. 
// 3) The ratings appear from Thursday to Monday and will be empty the other days. 
// 4) Works for ALL teams in your league, no matter what URL you are accessing their page from.
// 5) Inserts Strength of Schedule (SOS) from FFtoolbox.com


//Function that strips all html elements from a string
String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

var today = new Date();
var year = today.getFullYear().toString();

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

//Get important URL information for later use
var currentURL = document.URL;
var baseURL = currentURL.match(/http\:\/\/football\.fantasysports\.yahoo\.com\/f1\//);
var leagueCode = currentURL.match(/\d\d\d\d\d\d/);
var teamNumber = getTeamNumber();
//GM_log(baseURL + leagueCode + '/' + teamNumber);

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

//Get the team number of the current URL in order to find the appropriate matchup rankings page 
if (currentURL.match(/http\:\/\/football\.fantasysports\.yahoo\.com\/f1\/\d{5,6}\/\d{1,2}/))
{
	var currentPageTeamNumber = currentURL.replace(/http\:\/\/football.fantasysports.yahoo.com\/f\d\/\d{5,6}\//, "");
	
	if (currentURL.match(/date/));
	{
		var currentPageTeamNumber = currentPageTeamNumber.replace(/\?date\=\d{1,2}/, "");	
	}	
}	
else
{
	var currentPageTeamNumber = currentURL.replace(/http\:\/\/football.fantasysports.yahoo.com\/f\d\/\d{5,6}\/team\?date\=\d{4}\-\d{1,2}\-\d{1,2}\&week\=\d\&mid\=/, "");
}

var sPartURL = window.location.href.match( /http\:\/\/football\.fantasysports\.yahoo\.com\/.+\/[0-9]+\// ) ;


//Fix this !!!!!!!!!!!!!!!!!!!


//Build URL
var matchupRatingsURL = sPartURL + 'playermatchups?status=' + currentPageTeamNumber + '&pos=ALL&notetab=ALL'; 
//GM_log(matchupRatingsURL);


//Send request to access yahoo matchup rankings page and create document filled with HTML request info
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

//Add styles to new elements being placed on Yahoo page
GM_addStyle( '\
.status { background: inherit; border-width: 0px; } \
.ratings_image { background: inherit; border-width: 0px; float:left; padding-top:5px; } \
.SOS { background: inherit; border-width: 0px; float:right; padding-right:15px; } \
' );

//Array of team names for use on Yahoo site 
var teamAbbrevs = new Array( 'Ari','Atl','Bal','Buf','Car','Chi','Cin','Cle','Dal','Den','Det','GB','Hou','Ind','Jac','KC','Mia','Min','NE','NO','NYG','NYJ','Oak','Phi','Pit','SD','Sea','SF','StL','TB','Ten','Was' );
var teamUrlAbbrevs = { Ari:'ari',Atl:'atl',Bal:'bal',Buf:'buf',Car:'car',Chi:'chi',Cin:'cin',Cle:'cle',Dal:'dal',Den:'den',Det:'det',GB:'gnb',Hou:'hou',Ind:'ind',Jac:'jac',KC:'kan',Mia:'mia',Min:'min',NE:'nor',NO:'nwe',NYG:'nyg',NYJ:'nyj',Oak:'oak',Phi:'phi',Pit:'pit',SD:'sdg',Sea:'sea',SF:'sfo',StL:'stl',TB:'tam',Ten:'ten',Was:'was' };

//Get date information for later use
var today = new Date();
var dayOfWeek = today.getDay();

var emptyStarImage = 'http://l.yimg.com/a/i/us/sp/fn/default/full/stars_trans_0.gif';


//On Tues & Wed, the script will put blank stars as placeholders
if ((dayOfWeek==2) || (dayOfWeek==3))
{
	var statusCells = getStatusCells();	
	var titleArray = new Array();

	for (var k = 0; k < statusCells.length; k++)
	{										
		statusCells[k].innerHTML = '<span class="status">' + statusCells[k].innerHTML + '</span><br /><span class="img_container"><img class="ratings_image" src=' + emptyStarImage + ' /></span>';
		
		titleArray.push('Matchups will be available on Thursday');					
	}	
	
	var tempArray = document.getElementsByClassName( 'ratings_image' );
	
	for (var k = 0; k < statusCells.length; k++)
	{
		if(tempArray[k])
			tempArray[k].setAttribute('title', titleArray[k]);		
	}
}
//When stars are available
else
{
//This is the main function that processes HTML (from the rankings page) created by GM_xmlhttpRequest
//and adds it to the current Yahoo page.
getDOC(matchupRatingsURL, function(doc) {
   	
	////Gets proper array of player namess on matchup page
	var tempMatchupPlayerArray = doc.getElementsByClassName("player first");	
	var matchupPlayerArray = new Array();
		
	for (var i=2; i<tempMatchupPlayerArray.length; i++) {
		var stripPlayerElement = tempMatchupPlayerArray[i].innerHTML.stripTags();
		var pMatches = stripPlayerElement.match(/(.*?) \((.*?) - (.*?)\)/);
		matchupPlayerArray.push(pMatches[1]);
	}
	//GM_log(matchupPlayerArray.length);
		
		
	//Gets proper array of rating images on matchup page
	var tempMatchupRatingArray = doc.getElementsByClassName("rating wide stat");
	var matchupRatingArray = new Array();
	
	for (var j=1; j<tempMatchupRatingArray.length; j++) {
		var tempRatingElement = tempMatchupRatingArray[j].innerHTML;			
		var rMatches = tempRatingElement.match(/\"(.*?)\"/i);		
		matchupRatingArray.push(rMatches[1]);
	}
	//GM_log(matchupRatingArray.length);
		
	//Gets proper array of rating summaries on matchup page
	var tempMatchupTextArray = doc.getElementsByClassName("auto stat matchup-comment last");
	var matchupTextArray = new Array();
	
	for (var i=1; i<tempMatchupTextArray.length; i++) {
		matchupTextArray.push(tempMatchupTextArray[i].innerHTML);
	}
	//GM_log(matchupTextArray.length);
	
	//Gets player names on Yahoo page
	var tempMyPlayersArray = document.getElementsByClassName("player");	
	var myPlayersArray = new Array();
	
	for (var i=2; i<tempMyPlayersArray.length; i++) {
		var stripMyPlayersElement = tempMyPlayersArray[i].innerHTML.stripTags();
		var pMatches = stripMyPlayersElement.match(/(.*?) \((.*?) - (.*?)\)/);
		
		if(pMatches)
			myPlayersArray.push(pMatches[1]);
	}
	//GM_log(myPlayersArray.length);
		
	
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
	
		
	//Find cells on the current Yahoo page for inserting ranking image/text
	var statusCells = getStatusCells();
	//GM_log(statusCells[0].innerHTML);
	//GM_log(statusCells.length);
	
	//Initialize array for holding text rankings (i.e. tooltip info)
	var titleArray = new Array();
	
	
	//Get proper column cells, match home teams, and insert all ranking information into the 'Status' column of the Yahoo page
	for (var k = 0; k < statusCells.length; k++)
	{
		for (var j = 0; j < matchupPlayerArray.length; j++)
		{	
			if (myPlayersArray[k] == matchupPlayerArray[j])
			{										
				
				// add SOS to this script!!!
				statusCells[k].innerHTML = '<span class="status">' + statusCells[k].innerHTML + '</span><br /><span class="img_container"><img id="test" class="ratings_image" src=' + matchupRatingArray[j] + ' /></span>';								
				titleArray.push(matchupTextArray[j]);				
			}
		}		
	}	
	
	var tempArray = document.getElementsByClassName( 'ratings_image' );
	
	for (var k = 0; k < statusCells.length; k++)
	{
		if(tempArray[k])
		tempArray[k].setAttribute('title', titleArray[k]);		
	}
	
	for (var k = 0; k < statusCells.length; k++)
	{
		//GM_log(statusCells[k].innerHTML);	
		var status = statusCells[k].innerHTML;	
		if (!(status.toString().match(/status/)))
		{
			statusCells[k].innerHTML = statusCells[k].innerHTML + '<span class="img_container"><img class="ratings_image" src=' + emptyStarImage + ' /></span>';
			tempArray[k].setAttribute('title', 'No rating for this player.');
		}
	}	
}); // end function
} // end else 


//Thank you to Glenn Carr for this function	to insert elements into Yahoo
function getStatusCells()
{
    var statusCells = new Array();
    
    // Find all the team abbreviations
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
					
					//shows all text in each cell throughout the tables
                    var cellText = cell.innerHTML.stripTags();
					
                    var matches = cellText.match( reTeamAbbr );
					
                    if ( matches )
                    {
                        cell.setAttribute( "gncTeam", teamUrlAbbrevs[ matches[ 1 ] ] );
                        statusCells.push( cell.nextSibling.nextSibling );
                    }
                   
                }
            }
        }
    }
	
    return statusCells;
}


///////////////////////////////////
//Strength of Schedule 
//////////////////////////////////

var settingsPageURL = 'http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/settings';
var fftoolbox_icon = 'data:image/gif;base64,R0lGODlhFAATAKoAAAAAAP7%2BAKamAElJRv%2F%2F%2FwAAAAAAAAAAACH5BAEAAAQALAAAAAAUABMAAANNSLoE%2FiyuR6FsL2hdIxUb101ZIFQUWVJh4CiVJpxD%2B8YhsKH4LvKlE6C2AxZ1OePPliq5HDIUDAAKDKC%2F1LQnVbGyLwZ3JAGGL94zIwEAOw%3D%3D';

//Locates player page and determines which R image to used based on a date match
GM_xmlhttpRequest({
	method: 'GET',
	url: settingsPageURL,
	onload: function (results) {			
	
		if (results.responseText.match(/Week 14, 15 and 16 \(6 teams\)/)) {
			var playoffTypeURL = 'http://www.fftoolbox.com/football/strength_of_schedule.cfm?type=f&sortby=TEAM'; }
		else if (results.responseText.match(/Week 15, 16 and 17 \(6 teams\)/)) {
			var playoffTypeURL = 'http://www.fftoolbox.com/football/strength_of_schedule.cfm?type=h&sortby=TEAM'; }
		else {
			var playoffTypeURL = 'http://www.fftoolbox.com/football/strength_of_schedule.cfm?type=g&sortby=TEAM'; }
		//GM_log(playoffTypeURL);
		getInfo(playoffTypeURL);
		}			
	});
		
		
function getInfo(playoffTypeURL) {
	
	//Set the proper URLs for finding SOS ranks
	var SOS_REMAINING_GAMES = 'http://www.fftoolbox.com/football/strength_of_schedule.cfm?type=l&sortby=TEAM';

	var rb1ResponseText, rb2ResponseText, wr1ResponseText, wr2ResponseText, wr3responseText, wr2ResponseText;
		

	fetchRankData();  
	
	function fetchRankData()
	{
		GM_xmlhttpRequest({
			method: 'GET',
			url: SOS_REMAINING_GAMES,
			onload: getURLHandler1(handleURL2),
			});
	}

	function getURLHandler1( responseHandler )
	{
		return function (responseDetails)
		{
			if ( responseDetails.status == 200 )		
				responseHandler( responseDetails.responseText );
		}
	}

	function handleURL2( responseText )
	{
		GM_xmlhttpRequest({
			method: 'GET',
			url: playoffTypeURL,
			onload: getURLHandler2( displaySOS, responseText ),
			});
	}

	function getURLHandler2( responseHandler, seasonResponseText )
	{
		return function (responseDetails)
		{
			if ( responseDetails.status == 200 )
				responseHandler( responseDetails.responseText, seasonResponseText );
		}
	}

	function displaySOS ( playoffResponseText, seasonResponseText )
	{   	
		var toolboxTeamArray = new Array();
		
		var seasonQbArray = new Array();
		var seasonRbArray = new Array();
		var seasonWrArray = new Array();
		var seasonTeArray = new Array();
		var seasonKArray = new Array();
		var seasonDefArray = new Array();
		
		var seasonDoc = document.createElement( "div" ) ;
		seasonDoc.innerHTML = seasonResponseText;
		var seasonCells = seasonDoc.getElementsByClassName('c');
		//GM_log(seasonCells.length);
			
		for(var j=0; j<seasonCells.length;j++)
		{
			var seasonTds = seasonCells[j].getElementsByTagName('td');
			var i = 0;		
			//for (var i=0; i<seasonTds.length; i=i+12)
			//{
				toolboxTeamArray.push(seasonTds[i].innerHTML.stripTags().toLowerCase().replace(/^\s+/,"").replace(/\s+$/,""));
				seasonQbArray.push(seasonTds[i+1].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				seasonRbArray.push(seasonTds[i+2].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				seasonWrArray.push(seasonTds[i+3].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				seasonTeArray.push(seasonTds[i+4].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				seasonKArray.push(seasonTds[i+5].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				seasonDefArray.push(seasonTds[i+6].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
			//}		
		}
		//GM_log(seasonQbArray.length);
		GM_log(toolboxTeamArray[8]);
		//GM_log(seasonQbArray[31]);
		//GM_log(seasonRbArray[31]);
		GM_log(seasonWrArray[8]);
		//GM_log(seasonTeArray[31]);
		//GM_log(seasonKArray[31]);
		//GM_log(seasonDefArray[31]);
		//GM_log(seasonDefArray);
		
		var playoffQbArray = new Array();
		var playoffRbArray = new Array();
		var playoffWrArray = new Array();
		var playoffTeArray = new Array();
		var playoffKArray = new Array();
		var playoffDefArray = new Array();
		
		var playoffDoc = document.createElement( "div" ) ;
		playoffDoc.innerHTML = playoffResponseText;
		var playoffCells = playoffDoc.getElementsByClassName('c');
		
		for(var k=0; k<playoffCells.length;k++)
		{
			var playoffTds = playoffCells[k].getElementsByTagName('td');
			var m = 0;			
			//for (var m=0; m<playoffTds.length; m=m+12)
			//{				
				playoffQbArray.push(playoffTds[m+1].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				playoffRbArray.push(playoffTds[m+2].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				playoffWrArray.push(playoffTds[m+3].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				playoffTeArray.push(playoffTds[m+4].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				playoffKArray.push(playoffTds[m+5].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
				playoffDefArray.push(playoffTds[m+6].innerHTML.stripTags().replace(/^\s+/,"").replace(/\s+$/,""));
			//}		
		}
		//GM_log(playoffDefArray.length);
		GM_log(toolboxTeamArray[8]);
		//GM_log(playoffQbArray[31]);
		//GM_log(playoffRbArray[31]);
		GM_log(playoffWrArray[8]);
		//GM_log(playoffTeArray[31]);
		//GM_log(playoffKArray[31]);
		//GM_log(playoffDefArray[31]);
		
			
		//Gets player names on Yahoo page
		var tempPlayerArray = document.getElementsByClassName("player");	
		var playerTeamArray = new Array();
		var playerPositionArray = new Array();

		for (var p=2; p<tempPlayerArray.length; p++) {
			var stripPlayerColumnElement = tempPlayerArray[p].innerHTML.stripTags();
			//GM_log(stripPlayerColumnElement);
			if (!(stripPlayerColumnElement.match(/empty/)) && stripPlayerColumnElement!='')
			{
				var pMatches = stripPlayerColumnElement.match(/(.*?) \((.*?) - (.*?)\)/);
				//GM_log(pMatches);			
				if(pMatches) {		
					playerTeamArray.push( pMatches[2].toLowerCase().replace(/^\s+/,"").replace(/\s+$/,""));
					playerPositionArray.push ( pMatches[3].replace(/^\s+/,"").replace(/\s+$/,"")); }
			}	
		}
		//GM_log(playerTeamArray.length);
		//GM_log(playerPositionArray);

		var popStatusCells = getPopulatedStatusCells();	
		var seasonRank, playoffRank;
					
		//Get proper column cells, match home teams, and insert all ranking information into the 'Status' column of the Yahoo page
		for (var p = 0; p < popStatusCells.length; p++)
		{
			popStatusCells[p].innerHTML = popStatusCells[p].innerHTML +  '<span class="SOS" style="float:right"><img border="0" src="' + fftoolbox_icon +'"></span>';
			
			for (var q = 0; q < toolboxTeamArray.length; q++)
			{	
				if (toolboxTeamArray[q] == playerTeamArray[p])
				{					
					switch(playerPositionArray[p])
					{
						case 'QB':
							var seasonRank = seasonQbArray[q];							
							var playoffRank = playoffQbArray[q];							
							break; 
						case 'RB':
							var seasonRank = seasonRbArray[q];
							var playoffRank = playoffRbArray[q];							
							break;
						case 'WR':
							var seasonRank = seasonWrArray[q];
							var playoffRank = playoffWrArray[q];							
							break;
						case 'TE':
							var seasonRank = seasonTeArray[q];
							var playoffRank = playoffTeArray[q];							
							break;
						case 'K':
							var seasonRank = seasonKArray[q];
							var playoffRank = playoffKArray[q];							
							break;
						case 'DEF':
							var seasonRank = seasonDefArray[q];
							var playoffRank = playoffDefArray[q];							
							break;
						default:					
					}
					
					document.getElementsByClassName("SOS")[p].setAttribute('title', 'SOS Rank (Easy=1):   Remaining Games='+seasonRank+'   Playoff Weeks='+playoffRank);					
				}		
			}
		}		
	}	
}
	

function getPopulatedStatusCells()
{
    var popStatusCells = new Array();    
   
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
					
                    var matches = cellText.match( /(.*?) \((.*?) - (.*?)\)/ );
					
					if ( matches )
                    {      
						if(currentURL == baseURL + leagueCode + '/' + teamNumber) {
							popStatusCells.push( cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling );	}
						else {
							popStatusCells.push( cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling );	}				
                    }                   
                }
            }
        }
    }	
	
    return popStatusCells;
}

/////////////////////////////////////////////////////