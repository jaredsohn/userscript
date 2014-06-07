// Weewar Profiler
// Version 0.3
// Updated 2008-04-23
//
// Based on Weewar Spy by Pluto:
//   http://userscripts.org/scripts/show/13619
//
// v0.2: Reworked logic to call all APIs and populate table from GM_xmlhttpRequest 
//       calls instead of using a timer.   Also added map thumbnails and the
//       ability to work with test server profiles.
//
// v0.3: Updated to work with changes to Map page HTML.  Also added online
//       status indicator for current player.

// ==UserScript==
// @name Weewar Profiler
// @description Adds a table of current game info to a user profile page
// @namespace userscripts.org
// @include http://*weewar.com/user/*
// ==/UserScript==

//Alert the user if the GM_xmlhttpRequest is not available
if (!GM_xmlhttpRequest)
{
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

// ============================================================================
// Global Variables
// ============================================================================
//   Lists
var gameNums = new Array();       // List of the game numbers
var gameLinks = new Array();      // List of links to games
var gameTags = new Array();       // List of tags for games in table
var gameRows = new Array();       // List of table row elements
var mapNums = new Array();        // List of map numbers for each game
var currentPlayers = new Array(); // List of current player for each game


// ============================================================================
// Main Program
// ============================================================================
// parse the player name from the window URL (works from any profile tab)
var URL = window.location.href;
var xpath = new RegExp("/user/([^/]+)");
var user = URL.match(xpath)[1];

// Check to see if profile is from test server, if so use test server apis
var weewarURL = "http://weewar.com";
xpath = new RegExp("http://test.weewar.com");
if ( URL.match(xpath) )
{
    weewarURL = "http://test.weewar.com";
}

// ----------------------------
//   Initialize the table
// ----------------------------
// The current game table will be appended as a child of the <div class="second">
// element.  Find the 'second' node
var secondNode;
var currentTableElement;
var divElements = document.getElementsByTagName('div');
for ( var i = 0; i < divElements.length; i++ )
{
    if ( divElements[i].getAttribute('class') == 'second' )
    {
        secondNode = divElements[i];
    }
}

if ( secondNode )
{
    // Create a new element that will contain a table of all current games
    // re-using the 'openGames' style from the game list page
    var currentGameList = document.createElement('div');
    currentGameList.setAttribute('id', 'openGames');
    secondNode.appendChild(currentGameList);

    // Add javascript to show map preview on mouseover
    var mouseoverJavascript = document.createElement('script');
    currentGameList.appendChild(mouseoverJavascript);
    mouseoverJavascript.setAttribute('type', 'text/javascript');
    mouseoverJavascript.innerHTML = '<!--\n' + 
        'var currentPreview=null;\n' +
        'var currentPreviewTimeout=null;\n' +
        'function countdownPreview( id )\n' +
        '{\n' +
        '    //alert( "Showing "+id );\n' +
        '    if( currentPreviewTimeout==null )\n' +
        '    {\n' +
        '        currentPreview=$(id);\n' +
        '        //currentPreviewTimeout = setTimeout( "showPreview()", 1000 );\n' +
        '        Element.show( currentPreview );\n' +
        '    }\n' +
        '}\n' +
        'function showPreview(  )\n' +
        '{\n' +
        '    //alert( "Showing "+ele );\n' +
        '    if( currentPreview!=null )\n' +
        '    {\n' +
        '        Element.show( currentPreview );\n' +
        '    }\n' +
        '}\n' +
        'function hidePreview()\n' +
        '{\n' +
        '    if( currentPreview!=null )\n' +
        '    {\n' +
        '        //alert( "hiding" );\n' +
        '        Element.hide( currentPreview );\n' +
        '        window.clearTimeout( currentPreviewTimeout );\n' +
        '        currentPreview = null;\n' +
        '        currentPreviewTimeout=null;\n' +
        '    }\n' +
        '} \n' +
        '//-->';

    // This is the title of the table
    var currentGameTitle = '<td id="currentGameTitle" colspan="3" ' +
        'style="padding: 0.5em 0px 0.4em 0.8em; background-color: #FFFFBB; ' +
        'text-align: center; color: #666;">' +
        '<font style="font-weight: bold; font-size: large">' +
        'Current Games</font><br><a href="#">(Open in Tabs)</a></td>';

    // Table of current games is created in HTML and will be inserted into
    // the currentGameList div element once complete
    var tableHtml = 
        '<table id="currentGameTable" cellpadding="0" cellspacing="0">\n' +
        '  <thead>\n' +
        '    <tr>\n' + currentGameTitle + '\n    </tr>\n' +
        '    <tr>\n' +
        '      <th>Title</th>\n' +
        '      <th>Map</th>\n' +
        '      <th>Current Player</th>\n' +
        '    </tr>\n' +
        '  </thead>\n' +
        '</table>';

    // Rows for the table have been created.  Insert into currentGameList table
    currentGameList.innerHTML = tableHtml;

    // Set listener on Current Games title link to open all games in tab on click
    var tdElements = currentGameList.getElementsByTagName('td');
    for ( var i = 0; i < tdElements.length; i++ )
    {
        // find the td element that we inserted with an id of 'currentGameTitle'
        if ( tdElements[i].getAttribute('id') == 'currentGameTitle' )
        {
            // Insert the listener to open all games in tabs when clicked
            tdElements[i].addEventListener("click", function() {
                for (var j = 0; j < gameLinks.length; j++)
                {
                    GM_openInTab(gameLinks[j]);
                }
            }, false);
        }
    }

    // Get a reference to the table element so rows can be added
    var tableElements = currentGameList.getElementsByTagName('table');
    for ( var i = 0; i < tableElements.length; i++ )
    {
        // find the td element that we inserted with an id of 'currentGameTitle'
        if ( tableElements[i].getAttribute('id') == 'currentGameTable');
        {
            currentTableElement  = tableElements[i];
        }
    }
}


//--------------------------------
//  Call APIs and populate table
//--------------------------------
// Everything is run from within this GM_xmlhttpRequest call.  This is done 
// because the call is asynchronous and we need to make sure we have all of the
// data loaded before creating the table
GM_xmlhttpRequest(
{
    method: 'GET',
    url: weewarURL + '/api1/user/' + user,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',},
    onload: function(responseDetails)
    {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
        //grab the game element that lists all the game numbers
        var theirGames = dom.getElementsByTagName('game');  

        //loop through the game element to fill up the gameNums array
        for (var i = 0; i < theirGames.length; i++)
        {
            // Store the game number and game link
            gameNums[i] = theirGames[i].textContent;
            gameLinks[i] = weewarURL + '/game/' + gameNums[i]; 

            // Determine if row is even or odd
            var trClass = 'even';
            if ( (i % 2) == 0 )
            {
                trClass = 'odd';
            }

            // Create a row and add to the table
            var gameRowElement = document.createElement('tr');
            gameRowElement.setAttribute('class', trClass);
            currentTableElement.appendChild(gameRowElement);
            gameRows[i] = gameRowElement;

            // Load the info for this game
            genGameRow(gameNums[i], i);

        }
    }
});



// ============================================================================
//  Functions
// ============================================================================

// Populates the row in the game table.
// Get the map number from the game api and then access the map web page to 
// load the map info
function genGameRow(gameNum, listNum)
{
    GM_xmlhttpRequest(
    {
        method: 'GET',
        url: weewarURL + '/api1/game/' + gameNum,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/atom+xml,application/xml,text/xml',},
        onload: function(responseDetails)
        {
            // Create columns for this row
            var gameNameCol = document.createElement('td');
            var mapNameCol = document.createElement('td');
            var playerCol = document.createElement('td');
            gameRows[listNum].appendChild(gameNameCol);
            gameRows[listNum].appendChild(mapNameCol);
            gameRows[listNum].appendChild(playerCol);

            // Parse HTML response
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText,"application/xml");

            // ------------------------------
            // First Column: Game Name + Link
            // ------------------------------
    
            // pull out the game name and update column
            var gameName = gameNum;
            if(dom.getElementsByTagName('name')[0])
            {
                gameName = dom.getElementsByTagName('name')[0].textContent; 
            }

            // assemble the link to the game with gamename and mapname on the link
            gameTags[listNum] = '<a href="' + weewarURL + '/game/' + gameNum + 
                '">' + gameName + '</a>';

            gameNameCol.innerHTML = gameTags[listNum];

            // ------------------------------
            // Second Column: Map Name + Link
            // ------------------------------
    
            // Pull out the map number, use it to load map info page
            var mapNum;
            if(dom.getElementsByTagName('map')[0])
            {
                mapNum = dom.getElementsByTagName('map')[0].textContent;
                mapNums[listNum] = mapNum;

                // Load the map name and link
                getMapLinks(mapNum, listNum, mapNameCol);
            }
            
            // ------------------------------------------
            // Third Column: Current Player / Game Status
            // ------------------------------------------

            // find out if game is finished
            var gameState = (dom.getElementsByTagName('state'))[0].textContent;
            GM_log("  game state is '" + gameState + "'");
    
            // find out who's turn it is
            var players = dom.getElementsByTagName('player');
            var winner;
            var drawers = new Array();
            var numDraw = 0;
            for (var i = 0; i < players.length; i++)
            {
                if ( gameState == "running" && players[i].getAttribute('current') )
                {
                    currentPlayers[listNum] = players[i].textContent;
                }
                else if ( gameState == "finished" && 
                          players[i].getAttribute('result') == 'victory' )
                {
                    winner = players[i].textContent;
                }
                else if ( gameState == "finished" && 
                          players[i].getAttribute('result') == 'draw' )
                {
                    drawers[numDraw++] = players[i].textContent;
                }
            }

            // Display the current player or the winner if the game is over.
            var currentPlayerCol = '';
            if ( winner )
            {
                // If user lost display the winner's name in red.  If user won 
                // display their name in green
                if ( winner == user )
                {
                    currentPlayerCol = '<font style="color: #006400;">' + 
                        winner + ' was victorious</font>';
                }
                else
                {
                    currentPlayerCol = '<a style="color: #bc2224;" ' + 
                        'href="' + weewarURL + '/user/' + winner + '">' +
                        winner + ' was victorious</a>';

                }
            }
            else if ( numDraw > 0 )
            {
                var drawNames = drawers[0];
                for ( var i=1; i < numDraw; i++ )
                {
                    if ( (i+1) == numDraw )
                    {
                        drawNames = drawNames + " &amp; " + drawers[i];
                    }
                    else
                    {
                        drawNames = drawNames + ", " + drawers[i];
                    }
                }

                currentPlayerCol = '<font style="color: #d4a017;">' +
                    drawNames + ' ended the game in peace.';
            }
            // If the current player is the user display their name in green
            else if ( currentPlayers[listNum] == user )
            {
                currentPlayerCol = '<font style="color: #006400">' + 
                    currentPlayers[listNum] + '</font>';
            }
            // Otherwise display a link to the current player
            else if ( currentPlayers[listNum] )
            {
                currentPlayerCol = '<a href="' + weewarURL + '/user/' + 
                    currentPlayers[listNum] + '">' + currentPlayers[listNum] + 
                    '</a>';

                // If the current player is online, show an indicator
                showCurrentPlayerOnlineStatus(playerCol, currentPlayers[listNum]);
            }

            playerCol.innerHTML = currentPlayerCol;
        }
    });
}


// Gets map information (real name and thumbnail link) from map info page.
// Currently uses http map info page but if/when a SOAP API is made available can
// update to use that instead
function getMapLinks(mapNum, listNum, mapNameCol)
{
    GM_xmlhttpRequest(
    {
        method: 'GET',
        url: weewarURL + '/map/' + mapNum,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/atom+xml,application/xml,text/xml',},
        onload: function(responseDetails)
        {
            // Parse out the map name
            var xpath = new RegExp("Map (.*) on Weewar.com");
            var mapName = responseDetails.responseText.match(xpath)[1];

            // Parse out the thumbnail image name
            xpath = new RegExp(weewarURL + "/images/maps/.*.png");
            var mapThumbnailImgLink = responseDetails.responseText.match(xpath);

            // Add map preview to mouseover of mouse name
            mapNameCol.setAttribute("onMouseover", 
                "countdownPreview( 'preview_" + listNum + "' );");
            mapNameCol.setAttribute("onMouseOut", "hidePreview();");

            // Finalize the map name element html
            var mapLink = weewarURL + '/map/' + mapNum;
            mapNameCol.innerHTML = '<a href="' + mapLink + '">' + 
                mapName +
                '<span style="display: block; position: relative; color: #666; ' +
	            'margin-top: 0.2em;">' +
                '<img id="preview_' + listNum + '" ' +
                'src="' + mapThumbnailImgLink + '" alt="' + mapName + '"' +
                'width="150" height="110" ' +
                'style="position: absolute; top: -60px; left: 40px; padding: 5px; ' +
                'background-color: #FFF; border: 1px solid #CCC; display: none" />' +
                '</span></a>';
        }
    });
}


// Find out if current player is online, if so add an indicator
function showCurrentPlayerOnlineStatus(playerCol, playerNum)
{
    GM_xmlhttpRequest(
    {
        method: 'GET',
        url: weewarURL + '/api1/user/' + playerNum,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/atom+xml,application/xml,text/xml',},
        onload: function(responseDetails)
        {
            // Check to see if the player is online
            var xpath = new RegExp("<on>(.*)<\/on>");
            var onlineStatus = responseDetails.responseText.match(xpath)[1];

            if ( onlineStatus == "true" )
            {
                var onlineHtml = playerCol.innerHTML + '&nbsp;<font style="' +
                    'color: #9CC700; margin-left: 0.3em; ' +
                    'font-weight: normal;">on</font>&nbsp;';
                playerCol.innerHTML = onlineHtml;
            }
        }
    });
}


