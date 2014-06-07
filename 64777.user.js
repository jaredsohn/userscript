// This script adds more information to the box-score page of a match in Grid-Iron.org
//
// version 0.3.5
// 2009-10-25
// Copyright (c) 2009, Mikkel Bundgaard
// Released under the Creative Commons Attribution 3.0 Unported license
// http://creativecommons.org/licenses/by/3.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Enhanced Box Score Stats", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Enhanced Box Score Stats
// @namespace      http://www.grid-iron.org/
// @description    Enhances the box-score page with additional information. 
// @copyright      2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license        (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version        0.3.5
// @include        http://www.grid-iron.org/index.php?page=match&match_id=*&action=boxscore
// @include        http://grid-iron.org/index.php?page=match&match_id=*&action=boxscore
// @contributor    Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu)
// ==/UserScript==

window.setTimeout( function() 
{

    /**
     * Constructor for player
     * Mandatory Arguments: id and name
     */
    function Player(plrid, plrname) {
        if (arguments < 2) {
            alert('Too few arguments to constructor');
            return;
        }
        this.id = (plrid ? plrid : 0);
        this.name = (plrname ? plrname : "");
        // Defensive stats
        this.tackles = 0;
        this.missed = 0;
        this.tfl = 0;
        this.pressure = 0;
        this.sacks = 0;
        this.interceptions = 0;
        this.forcedFumbles = 0;
        
        // Offensive stats (general)
        this.fumbles = 0;
        
        // Running
        this.tackledBehindLOS = 0;
        this.firstDownsRun = 0;
        this.TDsRun = 0;
        
        // Passing
        this.passAttempts = 0;
        this.passCompleted = 0;
        this.passYards = 0;
        this.firstDownsThrown = 0;
        this.TDsThrown = 0;
        this.interceptionsThrown = 0;
        this.sacked = 0;
        // We can now calculate QB-rating
        
        // Catching
        this.firstDownsCaught = 0;
        this.TDsCaught = 0;
        
        // Special teams
        this.touchback = 0;
    } 

    function Team(teamid, teamname) {
        /*
        if (arguments < 2) {
            alert('Too few arguments to constructor');
            return;
        }
        */
        this.teamid = (teamid ? teamid : 0);
        this.teamname = (teamname ? teamname : 0);
        this.players = {};
        this.numberOfRuns = [0,0,0,0];
        this.numberOfPasses = [0,0,0,0];
        this.possession = [0,0,0,0];
        this.firstDowns = 0;
    }  

    function addTeamInformation(hometeam, awayteam, xpath) {
        var path = document.evaluate(xpath, document, null, 
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
        if (path.snapshotLength === 0) {
            return;
        }
     
        var table = path.snapshotItem(0);

        var rowHeader = document.createElement('tr');
        rowHeader.setAttribute('style', 'background-color: rgb(223, 224, 227);');
        table.appendChild(rowHeader);
        rowHeader.innerHTML = '<td style="border-top: 1px solid rgb(0, 0, 0); border-bottom: 1px dotted rgb(102, 102, 102); padding: 2px; font-size: 0.8em;"><b>Additional Information</b></td><td style="border-top: 1px solid rgb(0, 0, 0); border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="center" valign="middle" width="65">&nbsp;</td><td style="border-top: 1px solid rgb(0, 0, 0); border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="center" bgcolor="#cbcbcd" valign="middle" width="65">&nbsp;</td>';
        
        for(var i = 0; i < 4; i++) {
            var rowTOP = document.createElement('tr');
            rowTOP.setAttribute('style', 'background-color: rgb(223, 224, 227);');
            table.appendChild(rowTOP);
            var homePossession = hometeam.possession[i];
            var homePossessionSeconds = homePossession % 60;
            var awayPossession = awayteam.possession[i];
            var awayPossessionSeconds = awayPossession % 60;
            rowTOP.innerHTML = '<td style="border-bottom: 1px dotted rgb(102, 102, 102); padding: 2px; font-size: 0.8em;">Time of Possession Q' + (i+1) + '</td><td style="border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="center" valign="middle" width="65">' + 
                               Math.floor(homePossession / 60) + ':' + (homePossessionSeconds > 9 ? homePossessionSeconds : '0' + homePossessionSeconds) +
                               '</td><td style="border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="center" bgcolor="#cbcbcd" valign="middle" width="65">' +
                               Math.floor(awayPossession / 60) + ':' + (awayPossessionSeconds > 9 ? awayPossessionSeconds : '0' + awayPossessionSeconds) + '</td>';
        }
                           
        var rowFirstDowns = document.createElement('tr');
        rowFirstDowns.setAttribute('style', 'background-color: rgb(223, 224, 227);');
        table.appendChild(rowFirstDowns);
        rowFirstDowns.innerHTML = '<td style="border-bottom: 1px dotted rgb(102, 102, 102); padding: 2px; font-size: 0.8em;">First Downs</td><td style="border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="center" valign="middle" width="65">' + 
                           hometeam.firstDowns +
                           '</td><td style="border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="center" bgcolor="#cbcbcd" valign="middle" width="65">' +
                           awayteam.firstDowns + '</td>';

        // For the moment we ignore OT    
        for (var i2 = 0; i2 < 4; i2++) {
            var rowCurrentDownRun = document.createElement('tr');
            rowCurrentDownRun.setAttribute('style', 'background-color: rgb(223, 224, 227);');
            table.appendChild(rowCurrentDownRun);
            var homePercentage = parseInt(hometeam.numberOfRuns[i2] * 100 / (hometeam.numberOfRuns[i2] + hometeam.numberOfPasses[i2]), 10);
            var awayPercentage = parseInt(awayteam.numberOfRuns[i2] * 100 / (awayteam.numberOfRuns[i2] + awayteam.numberOfPasses[i2]), 10);
            rowCurrentDownRun.innerHTML = '<td style="border-bottom: 1px dotted rgb(102, 102, 102); padding: 2px; font-size: 0.8em;">Runs, Passes, Run percentage on ' + (i2*1+1) + ' down</td><td style="border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="right" valign="middle" width="65">' + 
                               hometeam.numberOfRuns[i2] + ', ' + hometeam.numberOfPasses[i2] + ', ' + (isNaN(homePercentage) ? 0 : homePercentage) + '%' +
                               '</td><td style="border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px dotted rgb(102, 102, 102); font-size: 0.8em;" align="right" bgcolor="#cbcbcd" valign="middle" width="65">' +
                               awayteam.numberOfRuns[i2] + ', ' + awayteam.numberOfPasses[i2] + ', ' + (isNaN(awayPercentage) ? 0 : awayPercentage) + '%</td>';
        }

        // 3 and 4 down converstions...
    }

    /**
     * data : playerid => Player object, xpath as before
     * * Make general insert info function 
     * (boolean flag overwrite information about players or not ?, 
     * list of headers, list of extraction functions: 
     * Player object -> information)
     *
     */
    function addInformation(players, xpath, headerList, dataList) {
        var path = document.evaluate(xpath, document, null, 
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (path.snapshotLength === 0) {
            return;
        }
        
        if (headerList.length !== dataList.length)
        {
            alert('The "headers" list and the "data" list are of different length');
            return;
        }

        var table = path.snapshotItem(0);
        
        // Add the new columns to the header
        var rows = table.getElementsByTagName('tr');
        rows[0].firstChild.colSpan = rows[0].firstChild.colSpan + headerList.length;

        // Add new headers to the header
        var startHeaderTag = '<td align="center" width="50" valign="middle" style="border-top: 1px solid rgb(170, 170, 170); border-left: 1px solid rgb(170, 170, 170); border-bottom: 1px solid rgb(0, 0, 0); font-size: 10px;">';
        var endTags = '</td>';
        
        var newHeaders = '';
        for(var j = 0; j < headerList.length; j++)
        {
            newHeaders += startHeaderTag + '<b>' + headerList[j] + '</b>' + endTags;
        }
        
        rows[1].innerHTML = rows[1].innerHTML + newHeaders;

        var startTags = '<td align="center" width="50" valign="middle" style="border-top: 1px solid rgb(170, 170, 170);border-left: 1px solid rgb(170, 170, 170); font-size: 10px;">';

        // Fill in the data stored in players
        for (var i = 2; i < rows.length; i++) {
            // Extract the playerid
            var plrid = rows[i].innerHTML.match('playerid=([0-9]+)')[1];

            var newData = '';
            // See if any stats are stored for this player in players
            var plrtackles = players[plrid];
            if (plrtackles !== undefined) {
                for(var i1 = 0; i1 < dataList.length; i1++)
                {
                    newData += startTags + dataList[i1](plrtackles) + endTags;
                }
            }
            else {
                // Add 0 in all the new columns
                for(var i2 = 0; i2 < dataList.length; i2++)
                {
                    newData += startTags + 0 + endTags;
                }
            }
            rows[i].innerHTML = rows[i].innerHTML + newData;
        }
    }
     
   
    /** 
     * Adds additional tackle stats to the team.
     * First arg:  a map from playerid to Player objects
     * Second arg: xpath expression to result table
     */
    function addTacklesTeam(data, xpath) {
        var path = document.evaluate(xpath, document, null, 
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (path.snapshotLength === 0) {
            return;
        }

        var table = path.snapshotItem(0);

        // Add 4 columns to the header
        var rows = table.getElementsByTagName('tr');
        rows[0].firstChild.colSpan = rows[0].firstChild.colSpan + 5;

        // Add headers: MISSED, TFL, PRESSURE, and Force Fumbles
        var startTags = '<td align="center" width="50" valign="middle" style="border-top: 1px solid rgb(170, 170, 170); border-left: 1px solid rgb(170, 170, 170); font-size: 10px;">';
        var endTags = '</td>';
        rows[1].innerHTML = rows[1].innerHTML + 
            startTags + '<b>MISSED</b>' + endTags +
            startTags + '<b>TFL</b>' + endTags +
            startTags + '<b>PRESSURE</b>' + endTags +
            startTags + '<b>FF</b>' + endTags +
            startTags + '<b>INT</b>' + endTags;

        var dupls = {}; // Map: id -> [tackles, sacks]

        // Remove duplicate entries and sum the tackles 
        for (var j = rows.length-1; j > 1; j--) {
            // Record player id and tackles
            var playerid = rows[j].innerHTML.match('playerid=([0-9]+)')[1];
            var tack = Number(rows[j].childNodes[1].innerHTML);
            var sck = Number(rows[j].childNodes[2].innerHTML);
            var ints = Number(rows[j].childNodes[3].innerHTML);
            var fumbs = Number(rows[j].childNodes[4].innerHTML);           
            
            if (!(playerid in dupls)) {
                // If the player is new add him to the map
                dupls[playerid] = [tack, sck, ints, fumbs];
            }
            else {
                // If the player is already in the map, 
                // add the number of tackles and remove the row
                dupls[playerid] = [dupls[playerid][0]+tack, dupls[playerid][1]+sck, dupls[playerid][2]+ints, dupls[playerid][3]+fumbs];
                table.removeChild(rows[j]);
            }
        }

        // Fill in the data stored in data
        for (var i = 2; i < rows.length; i++) {
            // Extract the playerid
            var plrid = rows[i].innerHTML.match('playerid=([0-9]+)')[1];

            // If the player was in more than one entry update the number of tackles, sacks, ints and fumbles
            if (plrid in dupls) {
                rows[i].childNodes[1].innerHTML = dupls[plrid][0];
                rows[i].childNodes[2].innerHTML = dupls[plrid][1];
                rows[i].childNodes[3].innerHTML = dupls[plrid][2];
                rows[i].childNodes[4].innerHTML = dupls[plrid][3];
            }

            // Remember the number of tackles (used to calculate the number 
            // of forced fumbles
            var presTackles = Number(rows[i].childNodes[1].innerHTML);

            // See if any stats are stored for this player in data
            var plrtackles = data[plrid];
            if (plrtackles !== undefined) {
                // If so, then extract stats
                var missed = plrtackles.missed;
                var TFL = plrtackles.tfl;
                var pressure = plrtackles.pressure;
                var tackles = Number(plrtackles.tackles);
                var inter = plrtackles.interceptions;

                // Insert stats
                rows[i].innerHTML = rows[i].innerHTML + 
                    startTags + missed + endTags + 
                    startTags + TFL + endTags + 
                    startTags + pressure + endTags +
                    // Forced fumbles = recorded tackles minus tackles mentioned in the 
                    // game report
                    startTags + (presTackles-tackles) + endTags + 
                    startTags + inter + endTags;
            }
            else {
                // Add 0 in all the new columns
                rows[i].innerHTML = rows[i].innerHTML + 
                    startTags + 0 + endTags + 
                    startTags + 0 + endTags + 
                    startTags + 0 + endTags + 
                    startTags + 0 + endTags +
                    startTags + 0 + endTags;
            }
        }

        // Insert players who did not make a tackle
        for (var missingPlayer in data) {
            // If the player is not already in the table, and if the player has some defensive stats
            if (!(missingPlayer in dupls) && (data[missingPlayer].missed > 0 || data[missingPlayer].pressure || data[missingPlayer].tackles || data[missingPlayer].interceptions)) {
                // Extract matchid
                var matchId = window.location.href.match('match_id=([0-9]+)')[1];

                // Create new row and insert the relevant data
                var newRow = document.createElement('tr');
                newRow.setAttribute('style', 'background-color: rgb(234, 235, 238);');
                table.appendChild(newRow);

                newRow.innerHTML = '<td style="border-top: 1px solid rgb(170, 170, 170); font-size: 10px; padding-left: 2px;"><a href="index.php?page=club&amp;subpage=pldetails&amp;back=match&amp;action=boxscore&amp;match_id=' + matchId + '&amp;playerid=' + missingPlayer + '" style="font-size: 10px;">' + data[missingPlayer].name + '</a></td>' +
                    startTags + 0 + endTags + 
                    startTags + 0 + endTags + 
                    startTags + 0 + endTags + 
                    startTags + 0 + endTags + 
                    startTags + data[missingPlayer].missed + endTags + 
                    startTags + 0 + endTags + 
                    startTags + data[missingPlayer].pressure + endTags + 
                    startTags + 0 + endTags +
                    startTags + data[missingPlayer].interceptions + endTags;
            }
        }
    }

    function insertData(res, tacklerId, tacklerName, index, amount) {
        if (res[tacklerId] === undefined) {
            res[tacklerId] = new Player(tacklerId, tacklerName);
            res[tacklerId][index] += amount;
        }
        else {
            res[tacklerId][index] += amount;
        }
    }


    // Updates the relevant property represented by the function
    // funct of the player in tackler
    function updatePlayer(team, tackler, prop) {
        var url = tackler.href;
        var tacklerId = url.slice(url.indexOf('playerid=')+9);
        var tacklerName = tackler.innerHTML;
        insertData(team, tacklerId, tacklerName, prop, 1);
    }
    
    function updatePlayerVal(team, tackler, prop, amount) {
        var url = tackler.href;
        var tacklerId = url.slice(url.indexOf('playerid=')+9);
        var tacklerName = tackler.innerHTML;
        insertData(team, tacklerId, tacklerName, prop, amount);
    }

    // Assumes that the time are in the following format MM:SS    
    function timeDiffInSeconds(time1, time2) {
        var timePat = /^(\d{2}):(\d{2})?$/;
        var matchArray1 = time1.match(timePat);
        var matchArray2 = time2.match(timePat);
        if (matchArray1 === null || matchArray2 === null) {
            alert("Time is not in a valid format");
        }
        return (matchArray1[1]-matchArray2[1])*60 + parseInt(matchArray1[2], 10) - parseInt(matchArray2[2], 10);
    }

    // Takes the url of the match data page, and the URLS of the two QBs
    function retrieveInformation(matchDataUrl, QBHome, QBAway) {
        if (!GM_xmlhttpRequest) {
            alert('Please upgrade to the latest version of Greasemonkey.');
            return;
        }

        GM_xmlhttpRequest({
            method: 'GET',
            url: matchDataUrl,
            headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8',
            'Accept': 'text/html,text/xml'},
            onload: function(responseDetails) {
            
            // Extract the content of the body of the request
            var html = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];

            html = html.replace(/<script[^>]*>((?:.|\n)*)<\/script>/gi,"");
            
            // Create a new (hidden) div element (with id "responseText") 
            // and insert the cleaned body into this element
            var responseTextdiv = document.createElement("div");
            responseTextdiv.id = "responseText";
            responseTextdiv.style.display = "none";
            responseTextdiv.innerHTML = html;
            document.body.appendChild(responseTextdiv); 

            // Loop through all the quarters, and store the results in homeTeamPlayers 
            // and awayTeamPlayers which are maps from player id to Player object
            var i = 1;            
            var homeTeam = new Team();
            var awayTeam = new Team();
            // Shorthands
            var homeTeamPlayers = homeTeam.players;
            var awayTeamPlayers = awayTeam.players;
            
            var currentDefPlayers;  // points to the current team defending
            var currentOffPlayers;  // points to the current team attacking
            var currentOffense;
            var currentDefense;
            var currentQB;

            // This only works if the two teams have different team names
            var teamNamePaths = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/*/a';
            // var homeTeamNamePath = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/td[3]/a';
            // var awayTeamNamePath = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/td[5]/a';

            // USE '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/table/tbody/tr/*/a' and then index 0 and 1
            // path.snapshotItem(0) and path.snapshotItem(1)

            var teamRes = document.evaluate(teamNamePaths, document, null, 
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

            if (teamRes.snapshotLength < 2) {
                alert('Cannot find team names');
                return;
            }
            var homeTeamName = teamRes.snapshotItem(0).innerHTML;
            // Remove the '&nbsp;&nbsp;' after the team name
            homeTeamName = homeTeamName.slice(0,homeTeamName.indexOf('&nbsp;'));
            var awayTeamName = teamRes.snapshotItem(1).innerHTML;

            // Variable to hold the parsed information (also used for debugging)
            var data;
            
            // To avoid problems with time since it is not shown in OT
            var isOT = false;

            // Loop through all the quarters
            try {          
                while(true) {
                    var quarter = document.getElementById('quarter_' + i);
                    // No more quarters
                    if (quarter === null) {
                        break;
                    }

                    if (i === 5) {
                        isOT = true;
                    }
                    
                    var currentTime = '14:59';
                                       
                    // Select all the elements (events) within the quarter
                    var trs = quarter.getElementsByTagName('tr');

                    for (var j = 0; j < trs.length; j++) {
                        // Check header for change change of possession
                        if (trs[j].childNodes.length !== 3) {
                            // Detect the current offense and defense
                            var label = trs[j].childNodes[0].innerHTML;
                            
                            // Is the home team in possession ?
                            if (label.match('^' + homeTeamName)) {
                                currentOffPlayers = homeTeamPlayers;
                                currentDefPlayers = awayTeamPlayers;
                                currentOffense = homeTeam;
                                currentDefense = awayTeam;
                                currentQB = QBHome;
                            }
                            else if (label.match('^' + awayTeamName)) {
                                currentOffPlayers = awayTeamPlayers;
                                currentDefPlayers = homeTeamPlayers;
                                currentOffense = awayTeam;
                                currentDefense = homeTeam;
                                currentQB = QBAway;
                            }
                            else {
                                alert('Cannot decide possession. Label = ' + label);
                                return;
                            }
                            
                            if (!isOT) {
                                // Extract the time
                                var newTime = label.match(/\d{2}:\d{2}$/)[0];
                                var timeInSeconds = timeDiffInSeconds(currentTime, newTime);
                                currentDefense.possession[i-1] += parseInt(timeInSeconds, 10);
                                currentTime = newTime;
                            }
                        }
                        // else the row contains an event in the game
                        else {
                            // data contains the events of the play
                            data = trs[j].childNodes[2]; 
                            // Extract the players of the play
                            var players = data.getElementsByTagName('a');
                            var down = trs[j].childNodes[0].innerHTML.charAt(3);

                            // Detect the kind of play
                            switch(trs[j].childNodes[1].innerHTML) {
                            case 'Rush':
                                // Either detect negative yards and TFL or
                                // detect 3 missed tackles or regular run
                                if (data.innerHTML.match('-[0-9]+ yards')) {
                                    updatePlayer(currentDefPlayers, players[1], 'tfl');
                                    updatePlayer(currentDefPlayers, players[1], 'tackles');
                                    updatePlayer(currentOffPlayers, players[0], 'tackledBehindLOS');
                                }
                                else if (data.innerHTML.match('Missed tackle') && players.length == 3) {
                                    updatePlayer(currentOffPlayers, players[0], 'TDsRun');
                                    updatePlayer(currentDefPlayers, players[1], 'missed');
                                    updatePlayer(currentDefPlayers, players[2], 'missed');
                                }
                                else if (data.innerHTML.match('Missed tackle')) {
                                    updatePlayer(currentOffPlayers, players[0], 'TDsRun');
                                    updatePlayer(currentDefPlayers, players[1], 'missed');
                                    updatePlayer(currentDefPlayers, players[2], 'missed');
                                    updatePlayer(currentDefPlayers, players[3], 'missed');
                                }
                                else if (data.innerHTML.match('TOUCHDOWN')) {
                                    updatePlayer(currentOffPlayers, players[0], 'TDsRun');
                                }
                                else {
                                    updatePlayer(currentDefPlayers, players[1], 'tackles');
                                }
                                
                                if (data.innerHTML.match('1st down')) {
                                    updatePlayer(currentOffPlayers, players[0], 'firstDownsRun');
                                    currentOffense.firstDowns++;
                                }
                                
                                currentOffense.numberOfRuns[down-1]++;
                                
                                break;

                                // Either detect pressure or 
                                // detect 2 missed tackles
                            case 'Pass':
                                // Every pass starts with the QB
                                updatePlayer(currentOffPlayers, players[0], 'passAttempts');
                                
                                if (data.innerHTML.match('under pressure')) {
                                    updatePlayer(currentDefPlayers, players[1], 'pressure');
                                }
                                else if (data.innerHTML.match('Missed tackle') && players.length == 3) {
                                    updatePlayer(currentOffPlayers, players[0], 'TDsThrown');
                                    updatePlayer(currentOffPlayers, players[0], 'passCompleted');
                                    updatePlayerVal(currentOffPlayers, players[0], 'passYards', parseInt(data.innerHTML.match('for ([0-9]+) yards')[1], 10));
                                    updatePlayer(currentOffPlayers, players[1], 'TDsCaught');
                                    updatePlayer(currentDefPlayers, players[2], 'missed');
                                }
                                else if (data.innerHTML.match('Missed tackle')) {
                                    updatePlayer(currentOffPlayers, players[0], 'TDsThrown');
                                    updatePlayer(currentOffPlayers, players[0], 'passCompleted');
                                    updatePlayerVal(currentOffPlayers, players[0], 'passYards', parseInt(data.innerHTML.match('for ([0-9]+) yards')[1], 10));
                                    updatePlayer(currentOffPlayers, players[1], 'TDsCaught');
                                    updatePlayer(currentDefPlayers, players[2], 'missed');
                                    updatePlayer(currentDefPlayers, players[3], 'missed');
                                } else if (data.innerHTML.match('first down')) {
                                    updatePlayer(currentOffPlayers, players[0], 'firstDownsThrown');
                                    updatePlayer(currentOffPlayers, players[0], 'passCompleted');
                                    updatePlayerVal(currentOffPlayers, players[0], 'passYards', parseInt(data.innerHTML.match('for ([0-9]+) yards')[1], 10));
                                    updatePlayer(currentOffPlayers, players[1], 'firstDownsCaught');
                                    currentOffense.firstDowns++;
                                }
                                else if (data.innerHTML.match('TOUCHDOWN')) {
                                    updatePlayer(currentOffPlayers, players[0], 'passCompleted');
                                    updatePlayerVal(currentOffPlayers, players[0], 'passYards', parseInt(data.innerHTML.match('for ([0-9]+) yards')[1], 10));
                                    updatePlayer(currentOffPlayers, players[0], 'TDsThrown');
                                    updatePlayer(currentOffPlayers, players[1], 'TDsCaught');
                                } else if (!data.innerHTML.match('incomplete')) {
                                    updatePlayer(currentOffPlayers, players[0], 'passCompleted');
                                    updatePlayerVal(currentOffPlayers, players[0], 'passYards', parseInt(data.innerHTML.match('for ([0-9]+) yards')[1], 10));
                                }
                                
                                currentOffense.numberOfPasses[down-1]++;
                                
                                break;

                            case 'Sack': 
                                updatePlayer(currentDefPlayers, players[1], 'tackles');
                                updatePlayer(currentOffPlayers, players[0], 'sacked');
                                break;
                            case 'Kickoff':
                            case 'Punt':
                                if (data.innerHTML.match('fumbles')) {
                                    updatePlayer(currentDefPlayers, players[1], 'fumbles');
                                }
                                else if (players.length === 1) { 
                                    updatePlayer(currentOffPlayers, players[0], 'touchback');
                                }
                                // If the return is not a fumble then the last (3rd) player is the tackler
                                else { 
                                    updatePlayer(currentOffPlayers, players[2], 'tackles');
                                }
                                break;
                                // WHAT ABOUT TD and missed tackles on interceptions ????
                            case 'Interception':
                                updatePlayer(currentOffPlayers, currentQB, 'interceptionsThrown');
                                updatePlayer(currentDefPlayers, players[1], 'interceptions');
                                updatePlayer(currentOffPlayers, players[2], 'tackles');
                                break;
                            case 'Fumble':
                                updatePlayer(currentOffPlayers, players[0], 'fumbles');
                                break;
                            }
                        }
                    }

                    if (!isOT) {
                        // Extract the time
                        var timeInSecondsRemaining = timeDiffInSeconds(currentTime, '00:00');
                        currentDefense.possession[i-1] += parseInt(timeInSecondsRemaining, 10)+1;
                    }

                    i++;
                }
            }
            catch (e)
            {
                GM_log(e);
                GM_log('Error parsing "' + data.innerHTML + '"');
            }
                
            addTeamInformation(homeTeam, awayTeam, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center/table/tbody');

            // HOME TEAM
            addTacklesTeam(homeTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[8]/table/tbody');
            // AWAY TEAM
            addTacklesTeam(awayTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[9]/table/tbody');

            // QBs
            function calcQB(p) 
            {
                // The QB rating is the sum of 4 values a,b,c,d. Also a,b,c,d can not be less than zero or greater than 2.375 otherwise the stats are invalid or can not be used to get a good reading.
                var a = Math.max(Math.min((((p.passCompleted/p.passAttempts) * 100) -30) / 20, 2.375), 0);
                var b = Math.max(Math.min(((p.TDsThrown/p.passAttempts) * 100) / 5, 2.375), 0);
                var c = Math.max(Math.min((9.5 - ((p.interceptionsThrown/p.passAttempts) * 100)) / 4, 2.375), 0);
                var d = Math.max(Math.min(((p.passYards/p.passAttempts) - 3) / 4, 2.375), 0);
                
                return Math.round (((a + b + c + d) / 0.06) * 100) / 100;
                //return p.passAttempts + ":" + p.passCompleted + ":" + p.TDsThrown + ":" + p.interceptionsThrown + ":" + p.passYards;
            }
            addInformation(homeTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[2]/table/tbody', ['FUM', '1Down', 'TDs', 'Int', 'Sacked', 'QB-rat'], [function(p) {return p.fumbles;}, function(p) {return p.firstDownsThrown;}, function(p) {return p.TDsThrown;}, function(p) {return p.interceptionsThrown;}, function(p) {return p.sacked;}, function(p) {return calcQB(p);}]);
            addInformation(awayTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[3]/table/tbody', ['FUM', '1Down', 'TDs', 'Int', 'Sacked', 'QB-rat'], [function(p) {return p.fumbles;}, function(p) {return p.firstDownsThrown;}, function(p) {return p.TDsThrown;}, function(p) {return p.interceptionsThrown;}, function(p) {return p.sacked;}, function(p) {return calcQB(p);}]);

            // RBs
            addInformation(homeTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[4]/table/tbody', ['FUM', 'TFL', '1Down', 'TDs'], [function(p) {return p.fumbles;}, function(p) {return p.tackledBehindLOS;}, function(p) {return p.firstDownsRun;}, function (p) {return p.TDsRun;}]);
            addInformation(awayTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[5]/table/tbody', ['FUM', 'TFL', '1Down', 'TDs'], [function(p) {return p.fumbles;}, function(p) {return p.tackledBehindLOS;}, function(p) {return p.firstDownsRun;}, function (p) {return p.TDsRun;}]);

            // WRs
            addInformation(homeTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[6]/table/tbody', ['FUM', '1Down', 'TDs'], [function(p) {return p.fumbles;}, function(p) {return p.firstDownsCaught;}, function(p) {return p.TDsCaught;}]);
            addInformation(awayTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[7]/table/tbody', ['FUM', '1Down', 'TDs'], [function(p) {return p.fumbles;}, function(p) {return p.firstDownsCaught;}, function(p) {return p.TDsCaught;}]);
            
            // ADD TBs for punters
            addInformation(homeTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[12]/table/tbody', ['TB'], [function(player) {return player.touchback;}]);
            addInformation(awayTeamPlayers, '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[13]/table/tbody', ['TB'], [function(player) {return player.touchback;}]);
        }
        });
    }

    // The url of the page
    var url = window.location.href;
    
    // Retrieve the identity of the two QBs, since they are not mentioned in interceptions anymore
    var QBPath = ['//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[2]/table/tbody//a',  
                  '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td/center[2]/center[3]/table/tbody//a'];
    var QBIden = ['', ''];
    
    for (var j = 0; j < QBPath.length; j++) {
        var path = document.evaluate(QBPath[j], document, null, 
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            
        if (path.snapshotLength > 0) {
	    QBIden[j] = path.snapshotItem(0);    
        }        
    }

    
    // Retrieve the url of the match page
    var matchDataUrl = url.replace(/&action.*/,"");
    retrieveInformation(matchDataUrl, QBIden[0], QBIden[1]);
}, 100);