// ==UserScript==
// @name          	Yahoo Fantasy Football Weather
// @description   	Displays weather forecasts for each NFL matchup on Yahoo's fantasy football site.
// @version			2012.09.05
// @include       	*football.fantasysports.yahoo.com/f1/*/*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/team?stat*
// @exclude			*football.fantasysports.yahoo.com/f1/*/addplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/dropplayer*
// @exclude			*football.fantasysports.yahoo.com/f1/*/*/playerswatch*
// @exclude			*football.fantasysports.yahoo.com/f1/*/matchup*
// @exclude			*football.fantasysports.yahoo.com/f1/*/pointsagainst*
// ==/UserScript==
//
// Credit goes to Glenn Carr (http://userscripts.org/scripts/show/16463) for the
// original Yahoo Football Weather forecasts script. The source (weather.com) for
// his brilliant script does not provide NFL specific weather anymore, so I am currently
// using http://nflweather.com/ for forecast information. 

// Features and/or Notes:
// 1) A forecast image is placed in the 'Opp' column for every NFL matchup. 
// 2) The title attribute of each weather IMG provides a mini tooltip that provides the text forecast
//    (i.e. 60F Partly Sunny). Just hover over the image to see it. 
// 3) You will find the weather forecast image on most every page, including your own, all of your
//    fellow GMs', as well as the MATCHUP and PLAYERS pages. Code was included to handle every 
//    manageable page, but there are some exluded pages due to quirky behavior with the script.
// 4) Note that choosing any option on the PLAYERS pages now creates an Ajax operation that kills
//    the script. Refreshing the page will only return you to the original group of players, rather 
//    than finding the weather forecasts for those group of NFL matchups. I don't know a fix as of yet. 
// 5) Also note that this is a new script and I don't yet have the complete collection of weather images
//    from http://nflweather.com/. There are obviously still some winter-related images that I wouldn't
//    have seen yet. You will notice this in the script if some of the NFL matchups produce blank/empty
//    images. As soon as I see a new image on my fantasy pages, I will add the image src and update the script.  
// 6) The code is fully explained for anyone who wants to learn Javascript. I also left GM_log statements
//    throughout in case anyone needs/wants to test the code themselves.


//(function() {

//setTimeout( function() {

//Function that strips all html elements from a string
String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

//Locates any table named statTable on Yahoo site. If no table exists, exit script.
var playerTables = document.evaluate("//table[contains(@id,'statTable')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( playerTables.snapshotLength == 0 )
    return;

//Loads all tables that match above criteria into an array.
//Note: Number of playerTables depends on what fantasy page you are on. Player page = 1; Matchups = 2; Team Roster = 3
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
var lengthOfURL = currentURL.length;
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

//Retrieve home team for each NFL matchup the current Yahoo fantasy football page.
function getHomeTeam() {
	
	//Possible home team name located in 'Offense'/'Player' or 'Opp' column of table
	var playerColumnTeamArray = new Array();
	var oppColumnTeamArray = new Array();	
	
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
		var oppColStarter = 2;
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
			var oppColStarter = 4;
			var iteration = 25;
		}
		//Your opponent's team pages
		else
		{
			var playerColStarter = 2;
			var oppColStarter = 5;
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
			var oppColStarter = 4;
			var iteration = 25;
		}
		//Your opponent's team pages
		else
		{
			var playerColStarter = 2;
			var oppColStarter = 5;
			var iteration = 23;
		}		
	}
	//Occurs after you add a player
	else if(currentURL.match(regexDate))
	{
		var playerColStarter = 2;
		var oppColStarter = 4;
		var iteration = 23;
	}
	//'Players' page
	else if(currentURL.match(regexPlayers))
	{
		var playerColStarter = 0;
		var oppColStarter = 3;
		var iteration = 24;	
	}
	//'My Team' page
	else if(currentURL == baseURL + leagueCode + '/' + teamNumber)
	{
		var playerColStarter = 2;
		var oppColStarter = 4;
		var iteration = 25;
	}
	else 
	{
		var playerColStarter = 2;
		var oppColStarter = 5;
		var iteration = 25;
	}
	

	//Move through each table on the page with the ultimate goal of creating respective arrays containing
	//the elements of the 'Offense'/'Player' and 'Opp' columns
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
					//Traverses through each 'Offense' column, grabs the text, and creates array.
					for ( var iCell = playerColStarter; iCell < row.cells.length; iCell=iCell+iteration )
					{
						var cell = row.cells[ iCell ];						
						//shows all text in each cell throughout the tables (if needed)
						//var cellText = cell.innerHTML.stripTags();
						playerColumnTeamArray.push(cell);						
					}
					//Traverses through each 'Opp' column, grabs the text, and creates array.
					for ( var iCell = oppColStarter; iCell < row.cells.length; iCell=iCell+iteration )
					{
						var cell = row.cells[ iCell ];						
						//shows all text in each cell throughout the tables (if needed)
						//var cellText = cell.innerHTML.stripTags();
						oppColumnTeamArray.push(cell);												
					}
				}
			}	
		}
	//GM_log(oppColumnTeamArray.length);
	//GM_log(playerColumnTeamArray.length);
	//GM_log(playerColumnTeamArray[17].innerHTML);	
	//GM_log(oppColumnTeamArray[17].innerHTML);	
	
	var yahooHomeTeam= new Array();	
	
	//If 'matchup' appears in the url, then proceed to find Yahoo home team
	if (currentURL.match(regexMatchup)) 
	{
		//If 'Opp' column text contains @, then determine proper home team and add to array.
		for (var i=0; i < oppColumnTeamArray.length; i++)
		{
			//There are blank cells located on the matchup page. This omits them to avoid errors.
			if (oppColumnTeamArray[i].innerHTML != '&nbsp;') {
			
				//Get all first characters of 'Opp' column
				var playerChar = oppColumnTeamArray[i].innerHTML.stripTags().charAt(0);
				//GM_log(playerChar);
				
				if (playerChar == '@')
				{
					//Remove @ symbol if it is the first character and add to array
					var removeChar = oppColumnTeamArray[i].innerHTML;
					var myElement = removeChar.replace(removeChar.charAt(0), '');
					yahooHomeTeam.push(myElement);
				}
				else
				{
					//All elements have the form 'Adrian Peterson (Min - RB)'
					//Remove all info other than the team name and add to array
					var myElement = playerColumnTeamArray[i].innerHTML.stripTags();
					var myNewElement = (myElement).match(/\(([a-z]+)/i)[1];
					yahooHomeTeam.push(myNewElement);
				}
			}
			//GM_log(playerChar);
		}
	}
	//If 'matchup' does not appear in the url (i.e. the 'my team' page or another GM's page), then proceed to find Yahoo home team
	else
	{
		//If opp column text contains @, then determine proper home team and add to array.
		for (var i=0; i < oppColumnTeamArray.length; i++)
		{
			//There are empty player cells on the team pages. This omits them to avoid errors. 
			if (!(playerColumnTeamArray[i].innerHTML.match(/empty/)))
			{
			
				var playerChar = oppColumnTeamArray[i].innerHTML.stripTags().charAt(0);
							
				if (playerChar == '@')
				{
					var removeChar = oppColumnTeamArray[i].innerHTML;
					var myElement = removeChar.replace(removeChar.charAt(0), '');
					yahooHomeTeam.push(myElement);
				}
				else
				{
					var myElement = playerColumnTeamArray[i].innerHTML.stripTags();
					//GM_log(myElement);
					var myNewElement = (myElement).match(/\(([a-z]+)/i)[1];
					yahooHomeTeam.push(myNewElement);
				}
			}			
		}
	}
	//GM_log(yahooHomeTeam);
	return yahooHomeTeam;
}

//Send request to access site nflweather.com and create document filled with HTML request info
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

//Get current year for use below
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
//GM_log(currentYear);

//If it is the matchup page, then proceed.
if (currentURL.match(/matchup/))
{
	//Find all divs on the current page with the following id
	var selected = document.evaluate("//div[@id='matchup-h1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log(selected.snapshotLength);
	
	//Grab the week number from the left (above the table) and build the proper URL for accessing nflweather.com
	var mySelected = selected.snapshotItem(0).innerHTML;
	//GM_log(selected.snapshotItem(0).innerHTML);
	var tempWeekString = mySelected.stripTags().toLowerCase();
	var tempWeekStringArray = tempWeekString.match(/week\s\d{1,2}/);
	//GM_log(tempWeekStringArray[0]);
	var weekString = tempWeekStringArray[0].replace(' ','-');	
	//GM_log(weekString);
	var weatherURL = 'http://www.nflweather.com/week/'+currentYear+'/'+weekString+'/';
	//GM_log(weatherURL);
	
}
else if (currentURL.match(/players/))
{
	//Grab the week number from the 'MATCHUP' toolbar URL and build the proper URL for accessing nflweather.com
	var oppTeamNumberArray = document.getElementsByClassName('first-of-type');	
	//GM_log(oppTeamNumberArray.length);
	var oppTeamNumberChildNodesArray = oppTeamNumberArray[0].childNodes;	
	var oppTeamNumberURL = oppTeamNumberChildNodesArray[oppTeamNumberChildNodesArray.length-12].getElementsByTagName('a')[0].href;
	//GM_log(oppTeamNumberURL);
	var weekNumber = oppTeamNumberURL.toString().replace('http://football.fantasysports.yahoo.com/f1/'+leagueCode+'/matchup?week=' , '');
	//GM_log(weekNumber);
	weekNumber = weekNumber.replace(/\&mid1\=\d{1,2}\&mid2\=\d{1,2}/, "");
	//GM_log(weekNumber);
	var weekString = 'week-' + weekNumber;
	var weatherURL = 'http://www.nflweather.com/week/'+currentYear+'/'+weekString+'/';
}
//If it is the "my team" page, then proceed.
else
{
	////Find the appropriate elements (i.e. li class=first in div id=statsubnav)
	var selected = document.evaluate("//div[@id='statsubnav']//li[contains(@class,'first')]/*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log(selected.snapshotLength);
	
	//Deals with quirky behavior of Yahoo site
	if ( selected.snapshotLength == 0 ){
	  var mySelected = "";	  
	}
	else{
		//Grab the week number from the left (above the table) and build the proper URL for accessing nflweather.com
		var mySelected = selected.snapshotItem(0).innerHTML;
		//GM_log(selected.snapshotItem(0).innerHTML);
		var weekString = mySelected.toLowerCase();
		weekString = weekString.replace(' ','-');
		//GM_log(weekString);
		var weatherURL = 'http://www.nflweather.com/week/'+currentYear+'/'+weekString+'/';
		
	}
}
//GM_log(weatherURL);

//This is the main function that processes HTML (from nflweather.com) created by GM_xmlhttpRequest
//and adds it to the current Yahoo page.
getDOC(weatherURL, function(doc) {
   		
	//Locates all <td> tags on weather page
    var tds = doc.getElementsByTagName( 'td' );
	
	//Locates all <img> tags with class name 'weather' on the weather page
	var img = doc.getElementsByClassName( 'weather' );	
	//GM_log(img.length);
	
	//Create arrays. Some commented out for future use.
	var weatherImageArray = new Array();	
	var weatherHomeTeamArray = new Array();
	var weatherImageArray = new Array();
	var textForecastArray = new Array();	
	//var gameTimeArray = new Array();
	
	
	var imageCounter = 0;
	
	//Move through main table on nflweather.com and grab relevant information
	for (var i=4; i<tds.length; i=i+10)
	{
		//Get home team name 
		var myElement = tds[i].innerHTML.stripTags().replace( /\s+/gi, ' ' );
		var weatherHomeTeam = convertWeatherTeamName(myElement);
		weatherHomeTeamArray.push(weatherHomeTeam);
		//GM_log(weatherHomeTeam);
		
		//Get text forecast
		var myTextForecast = tds[i+4].innerHTML.stripTags();
		myTextForecast = myTextForecast.replace('f', '\u00B0F');
		textForecastArray.push(myTextForecast);	
		//GM_log(myTextForecast);
		
		//Get forecast image
		var weatherImage = img[imageCounter].innerHTML;
		//GM_log(weatherImage);
		var weatherImageURL = getWeatherImageURL(weatherImage);
		weatherImageArray.push(weatherImageURL);
		imageCounter++;
		
		
		//Gets game time information
		/*var myGameTime = tds[i+1].innerHTML.stripTags();
		myGameTime = myGameTime.replace(' ', ',')
		var myNewGameTime = myGameTime.substring(0,16);
		gameTimeArray.push(myNewGameTime);*/		
	}	
	
	
	//Create array of home team, as designated by current Yahoo page of NFL matchups
	var yahooHomeTeamArray = getHomeTeam();	
	//GM_log(yahooHomeTeamArray[1]);
	
		
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
			yahooHomeTeamArray.splice(q,1);		
	}	
	//GM_log(yahooHomeTeamArray.length);
	
	
		
	//Find cells on the current Yahoo page for inserting weather image/forecast
	var teamCells = getTeamCells();
	//GM_log(teamCells.length);
	
	//Initialize array for holding text forecast (i.e. tooltip info)
	var titleArray = new Array();
	
	//Get proper column cells, match home teams, and insert all weather information into the 'Opp' column of the Yahoo page
	for (var k = 0; k < teamCells.length; k++)
	{
		for (var j = 0; j < weatherHomeTeamArray.length; j++)
		{	
			//Does home team on current Yahoo site match the home team on nflweather.com
			//If so, then insert the proper forecast information.
			if (yahooHomeTeamArray[k] == weatherHomeTeamArray[j])
			{			
					
				teamCells[k].innerHTML = '<div class="team">' + teamCells[k].innerHTML + '</div><div><img class="weatherimage" src=' + weatherImageArray[j] + ' /></div>';								
			
				//Add the appropriate text forecast for image added above to a new array
				titleArray.push(textForecastArray[j]);				
			}
		}		
	}	
	
	//Store weather text forecast into title element of each weather image
	var tempArray = document.getElementsByClassName( 'weatherimage' );
	
	for (var k = 0; k < teamCells.length; k++)
	{
		//GM_log(tempArray[k]);
		tempArray[k].setAttribute('title', titleArray[k]);		
	}
	
});

//Add styles to new elements being placed on Yahoo page
if (currentURL.match(/matchup/) || currentURL.match(/players/))
{
GM_addStyle( '\
.team { line-height:35px; background: inherit; border-width: 0px; float:left;  } \
.weatherimage { background: inherit; border-width: 0px; float:right } \
.opp {width: 95px; } \
' );
}
else
{
GM_addStyle( '\
.team { line-height:35px; background: inherit; border-width: 0px; float:left;  } \
.weatherimage { background: inherit; border-width: 0px; float:right } \
.opp {width: 77px; } \
' );
}

//Array of team names used in the function below.
var teamAbbrevs = new Array( 'Ari','Atl','Bal','Buf','Car','Chi','Cin','Cle','Dal','Den','Det','GB','Hou','Ind','Jac','KC','Mia','Min','NE','NO','NYG','NYJ','Oak','Phi','Pit','SD','Sea','SF','StL','TB','Ten','Was' );
var teamUrlAbbrevs = { Ari:'ari',Atl:'atl',Bal:'bal',Buf:'buf',Car:'car',Chi:'chi',Cin:'cin',Cle:'cle',Dal:'dal',Den:'den',Det:'det',GB:'gnb',Hou:'hou',Ind:'ind',Jac:'jac',KC:'kan',Mia:'mia',Min:'min',NE:'nor',NO:'nwe',NYG:'nyg',NYJ:'nyj',Oak:'oak',Phi:'phi',Pit:'pit',SD:'sdg',Sea:'sea',SF:'sfo',StL:'stl',TB:'tam',Ten:'ten',Was:'was' };

//Thank you to Glenn Carr for this function	to find the appropriate elements in the Yahoo tables. Slightly edited.
function getTeamCells()
{
    var teamCells = new Array();
    
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
					
					//Pushes the 'Opp' column cells
                    if ( matches )
                    {
                        cell.setAttribute( "gncTeam", teamUrlAbbrevs[ matches[ 1 ] ] );
                        teamCells.push( cell );
                    }                   
                }
            }
        }
    }
    return teamCells;
}

//Obtaining the proper weather image for each NFL matchup. Some editing will be needed as new images become available.
function getWeatherImageURL(weatherImage)
{
	var weatherImageURL;
    //Grabs the alt element in each img tag for matching purposes
	//var tempSubString = weatherImage.substring(23,28);
	//GM_log(weatherImage);
	var tempMatch = weatherImage.match(/alt\=\"[a-zA-Z_]{2,10}\"/);
	//GM_log(tempMatch);
	var removeAlt = tempMatch[0].replace('alt="','');
	//GM_log(removeAlt);
	var altTag = removeAlt.replace(/\"$/, '');
	//GM_log(altTag);
	var filename = altTag.toLowerCase();
	//GM_log(filename);
	
	weatherImageURL = "http://www.nflweather.com/assets/weather/small/"+filename+".png";
	
	return weatherImageURL;
}

//Converts team names at nflweather.com to match Yahoo site
function convertWeatherTeamName(myElement)
{
	var weatherHomeTeam;
	
	switch (myElement)
	{
		case 'Cardinals':
			weatherHomeTeam = 'Ari';
		break;
		case 'Falcons':
			weatherHomeTeam = 'Atl';
		break;
		case 'Ravens':
			weatherHomeTeam = 'Bal';
		break;
		case 'Bills':
			weatherHomeTeam = 'Buf';
		break;
		case 'Panthers':
			weatherHomeTeam = 'Car';
		break;
		case 'Bears':
			weatherHomeTeam = 'Chi';
		break;
		case 'Bengals':
			weatherHomeTeam = 'Cin';
		break;
		case 'Browns':
			weatherHomeTeam = 'Cle';
		break;
		case 'Cowboys':
			weatherHomeTeam = 'Dal';
		break;
		case 'Broncos':
			weatherHomeTeam = 'Den';
		break;
		case 'Lions':
			weatherHomeTeam = 'Det';
		break;
		case 'Packers':
			weatherHomeTeam = 'GB';
		break;
		case 'Texans':
			weatherHomeTeam = 'Hou';
		break;
		case 'Colts':
			weatherHomeTeam = 'Ind';
		break;
		case 'Jaguars':
			weatherHomeTeam = 'Jac';
		break;
		case 'Chiefs':
			weatherHomeTeam = 'KC';
		break;
		case 'Dolphins':
			weatherHomeTeam = 'Mia';
		break;
		case 'Vikings':
			weatherHomeTeam = 'Min';
		break;
		case 'Patriots':
			weatherHomeTeam = 'NE';
		break;
		case 'Saints':
			weatherHomeTeam = 'NO';
		break;
		case 'Giants':
			weatherHomeTeam = 'NYG';
		break;
		case 'Jets':
			weatherHomeTeam = 'NYJ';
		break;
		case 'Raiders':
			weatherHomeTeam = 'Oak';
		break;
		case 'Eagles':
			weatherHomeTeam = 'Phi';
		break;
		case 'Steelers':
			weatherHomeTeam = 'Pit';
		break;
		case 'Chargers':
			weatherHomeTeam = 'SD';
		break;
		case 'Seahawks':
			weatherHomeTeam = 'Sea';
		break;
		case '49ers':
			weatherHomeTeam = 'SF';
		break;
		case 'Rams':
			weatherHomeTeam = 'StL';
		break;
		case 'Buccaneers':
			weatherHomeTeam = 'TB';
		break;
		case 'Titans':
			weatherHomeTeam = 'Ten';
		break;
		case 'Redskins':
			weatherHomeTeam = 'Was';
		break;
	}
	return weatherHomeTeam;
}

//}, 500 );

//})();

