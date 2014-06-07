// ==UserScript==
// @name           Monsterkill Scout
// @namespace      MonsterkillScout
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// ==/UserScript==
alert('Stop using this script.\n\nIt does not work anymore\n\nUninstall this one and go install Monsterkill Script v2\n\nhttp://userscripts.org/scripts/show/46765');

// Include Dojo from the AOL CDN
var dojoElement = document.getElementById('dojoscript');
if (dojoElement == null) {
    var script = document.createElement('script');
    script.id = 'dojoElement';
    script.src="http://o.aolcdn.com/dojo/1.2.3/dojo/dojo.xd.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}
// version number so that saved data can know what version of the parser
// was used. if data is saved with an old version, it can be overwritten
var parserVersion = 8;

// array and index
var currentPbpIndexToParse = -1;
var pbpIdsToParse = [];

var gameId = -1;

// holds data from the saved configuration value
// also holds data from the current replay as it is
// parsed
var savedData = {};

function getGameIdFromLocation() {
    var gid = window.location.search;
    gid = gid.slice(gid.indexOf('game_id=')+'game_id='.length);
    if (gid.indexOf('&') > -1) {
        gid = gid.slice(0, gid.indexOf('&'));
    } else {
        gid = gid.slice(0);
    }
    return gid;
}

function saveReplayData() {
    // pull in any changes that might have been saved
    // while this page was parsing. ex if you open 2
    // replays in tabs and start both of them scouting
    // at the same time, the second one to finish would
    // erase the previous one
    var tmpGameData = savedData[gameId];
    tmpGameData.parserVersion = parserVersion;
    evalReplayData();
    savedData[gameId] = tmpGameData;
    GM_setValue('replayData', dojo.toJson(savedData));
}

/*
loads all data saved to the configuration value
*/
function evalReplayData() {
    if (GM_getValue('replayData')!=null) {
        eval("savedData="+GM_getValue('replayData')+";");
    }
}
/*
window.addEventListener('load', function(event) {
    dojo = unsafeWindow["dojo"];

    evalReplayData();
    
    dojo.addOnLoad(function() {
        gameId = getGameIdFromLocation();
        //
        //  only show the start button if this replay hasnt already been
        //  parsed and saved with the current version
        //
        if (savedData[gameId] != null &&
            savedData[gameId].parserVersion != null &&
            savedData[gameId].parserVersion == parserVersion) {
            startParsing();
        } else {
            var br = document.createElement('br');
            dojo.query("#pbp div.medium_head")[0].appendChild(br);
    
            var downloadButton = document.createElement('input');
            downloadButton.id = "downloadButton";
            downloadButton.type="button";
            downloadButton.value = "Start Scouting";
            dojo.query("#pbp div.medium_head")[0].appendChild(downloadButton);
    
            var statusText = document.createElement('div');
            statusText.id = "statusText";
            statusText.className = "medium_head";
            dojo.query("#pbp div.medium_head")[0].appendChild(statusText);
    
            dojo.connect(downloadButton, 'onclick', startParsing);
        }
    });
}, 'false');
*/
function startParsing() {
    /*
    create a list of pbp ids by parsing the current page
    */
    var links = dojo.query("td.pbp_replay", "play_by_play_table");
    for (var i = 0; i < links.length; i++) {
        var pbpId = "noplay";
        if (links[i].childNodes[0].href != undefined) {
            var url = links[i].childNodes[0].href;
            pbpId = url.slice(url.indexOf("pbp_id=")+"pbp_id=".length);
        }
        pbpIdsToParse[++currentPbpIndexToParse] = pbpId;
    }
    currentPbpIndexToParse = 0;
    if (savedData[gameId] != null &&
        savedData[gameId].parserVersion != null &&
        savedData[gameId].parserVersion == parserVersion) {
        displayFormations();
    } else {
        parseNextReplay();
    }
}

function parseNextReplay() {    
    if (currentPbpIndexToParse < pbpIdsToParse.length) {
        dojo.byId('statusText').innerHTML = "# of replays left to parse: " + (pbpIdsToParse.length-currentPbpIndexToParse);
        if (pbpIdsToParse[currentPbpIndexToParse] != "noplay") {
            dojo.xhrGet({
                url: "http://goallineblitz.com/game/replay.pl", 
                content : {game_id: gameId, pbp_id: pbpIdsToParse[currentPbpIndexToParse]},
                load: parseSingleReplay,
                error : function() {},
                handleAs: "text"
            });
        } else {
            currentPbpIndexToParse++;
            parseNextReplay();
        }
    } else {
        dojo.byId('statusText').innerHTML = "- Done Parsing -";
        setTimeout(saveReplayData, 1000);
        // insert all of the data on the page
        displayFormations();
    }
}

function displayFormations() {
    for (pbpIndex in pbpIdsToParse) {
        if (savedData[gameId][pbpIndex]!=null) {
            var offenseMessage = "Offense: <b>" + offenses[savedData[gameId][pbpIndex].offForm];
            if (savedData[gameId][pbpIndex].teShift == 1) {
                offenseMessage += " w/ TE shift";
            }
            offenseMessage += "</b>";
            addScoutRow(pbpIndex, offenseMessage);
        
            var defenseMessage = "Defense: <b>" + defenses[savedData[gameId][pbpIndex].defForm]
            if (savedData[gameId][pbpIndex].coverage > -1) {
                defenseMessage += " | Cover "+savedData[gameId][pbpIndex].coverage;
            }
            defenseMessage += "</b>";

            addScoutRow(pbpIndex, defenseMessage);
        }
    }
    displayStatistics();
}

var offenses = ['Pro Set','Strong I','Weak I','I Formation','Singleback','Shotgun','Shotgun 5WR','Goal Line','Single Back Big', 'Kick Return', 'Punt Return'];
var defenses = ['4-3','3-4','4-2-5 Nickel (3 CBs)','3-3-5 Nickel (3 CBs)','4-1-6 Dime (4 CBs)','3-2-6 Dime (4 CBs)','3-1-7 Quarter (5 CBs)','Goal Line', 'Kickoff', 'Punt'];
var coverageFormations = [0,1,2,3,4,5,6];

/*
times that the team ran a certain defense agaisnt the specific offense
*/
var stats = [];
var team0 = -1;
var team0Name = 'Team 0';
var team1 = -1;
var team1Name = 'Team 1';

function populateStats() {
    team0 = savedData[gameId][0].defTeamId;
    team1 = savedData[gameId][0].offTeamId;

    stats[0] = [];
    // initialize
    // team 0
    for (d in defenses) {
        stats[0][d] = [];
        for (o in offenses) {
            stats[0][d][o] = {};
            stats[0][d][o].count = 0;
            stats[0][d][o].countC0 = 0;
            stats[0][d][o].countC1 = 0;
            stats[0][d][o].countC2 = 0;
        }
    }
    // team 1
    stats[1] = [];
    for (d in defenses) {
        stats[1][d] = [];
        for (o in offenses) {
            stats[1][d][o] = {};
            stats[1][d][o].count = 0;
            stats[1][d][o].countC0 = 0;
            stats[1][d][o].countC1 = 0;
            stats[1][d][o].countC2 = 0;
        }
    }
    for (var replay in savedData[gameId]) {
        if (replay != "parserVersion") {
            var i = 0;
            if ( savedData[gameId][replay].defTeamId == team1) {
                i = 1;
            }
            if (savedData[gameId][replay].coverage == 0) {
                stats[i][savedData[gameId][replay].defForm][savedData[gameId][replay].offForm].countC0++;
            } else if (savedData[gameId][replay].coverage == 1) {
                stats[i][savedData[gameId][replay].defForm][savedData[gameId][replay].offForm].countC1++;
            } else if (savedData[gameId][replay].coverage == 2) {
                stats[i][savedData[gameId][replay].defForm][savedData[gameId][replay].offForm].countC2++;
            } else {
                stats[i][savedData[gameId][replay].defForm][savedData[gameId][replay].offForm].count++;
            }
        }
    }

    var teamLinks = dojo.query("#scoreboard table tbody tr.team_row td.team_name a");
    var id = teamLinks[0].href.slice(teamLinks[0].href.indexOf('team_id=')+8);
    if (id == team0) {
        team0Name = teamLinks[0].innerHTML;
        team1Name = teamLinks[1].innerHTML;
    } else {
        team1Name = teamLinks[0].innerHTML;
        team0Name = teamLinks[1].innerHTML;
    }
    
}
function displayStatistics() {
    populateStats();
    displayStatsTable(0);
    displayStatsTable(1);
}
function displayStatsTable(teamIndex) {
    var tbody = document.createElement('tbody');

    var tr = document.createElement('tr');
    tr.className = "nonalternating_color pbp_quarter";
    
    var td = document.createElement('td');
    if (teamIndex==0) {
        td.innerHTML = team0Name + " Def. vs";
    } else {
        td.innerHTML = team1Name + " Def. vs";
    }
    tr.appendChild(td);

    for (var o in offenses) {
        td = document.createElement('td');
        td.align = "center";
        td.innerHTML = offenses[o];
        tr.appendChild(td);
    }
    tbody.appendChild(tr);

    for (var d in stats[teamIndex]) {
        if (d in coverageFormations) {
            // make more rows for cover 0,1,2
            for (var cc=0; cc<3; cc++) {
                tr = document.createElement('tr');
                tr.className = "alternating_color" + ((d%2)+1) +" pbp_team";

                td = document.createElement('td');
                td.innerHTML = defenses[d]+" Cover "+cc;
                tr.appendChild(td);

                for (o in stats[teamIndex][d]) {
                    td = document.createElement('td');
                    td.align = "center";
                    if (stats[teamIndex][d][o]['countC'+cc] > 0) {
                        td.innerHTML = stats[teamIndex][d][o]['countC'+cc];
                    } else {
                        td.innerHTML = ".";
                    }
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
        } else {
            tr = document.createElement('tr');
            tr.className = "alternating_color" + ((d%2)+1) +" pbp_team";

            td = document.createElement('td');
            td.innerHTML = defenses[d];
            tr.appendChild(td);

            for (o in stats[teamIndex][d]) {
                td = document.createElement('td');
                td.align = "center";
                if (stats[teamIndex][d][o].count > 0) {
                    td.innerHTML = stats[teamIndex][d][o].count;
                } else {
                    td.innerHTML = ".";
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }

    var table = document.createElement('table');
    table.appendChild(tbody);

    var statsDiv = document.createElement('div');
    statsDiv.id = "statsDiv";
    statsDiv.className = "medium_head";
    statsDiv.appendChild(table);

    var parent = dojo.query("#pbp")[0];
    parent.insertBefore(statsDiv, parent.firstChild);
}

function parseSingleReplay(response, ioArgs) {
    var tmp = {};
    // pull out the offense team id
    response = response.slice(response.indexOf('team_id=') + 'team_id='.length);
    tmp.offTeamId = response.slice(0, response.indexOf('"'));

    // pull out the defense team id
    response = response.slice(response.indexOf('team_id=') + 'team_id='.length);
    tmp.defTeamId = response.slice(0, response.indexOf('"'));

    // pull out players data
    response = response.slice(response.indexOf('var players = '));
    var playersText = response.slice(0, response.indexOf('var play_data ='));
    eval(playersText);

    // pull out play_data
    response = response.slice(response.indexOf('var play_data = '));
    var playDataText = response.slice(0, response.indexOf(';')+1);
    eval(playDataText);
    if (play_data.length > 0) {
        var playerIds = getPlayerIdsByPosition(players);

        tmp.offForm = detectOffensiveFormation(playerIds, play_data);
        tmp.defForm = detectDefensiveFormation(playerIds, play_data);
        tmp.teShift = getTEShift(playerIds, play_data);
        if (tmp.defForm in coverageFormations) {
            tmp.coverage = getCoverage(play_data, playerIds);
        } else {
            tmp.coverage = -1;
        }
        if (savedData[gameId] == null) {
            savedData[gameId] = {};
        }
        savedData[gameId][currentPbpIndexToParse]=tmp;
    } else {
        // it was a timeout
    }

    currentPbpIndexToParse++;
    parseNextReplay();
}

// add message under the row in the replay list
function addScoutRow(index, message) {
    var row = document.createElement('tr');
    var alternatingColor = (index % 2)+1;
    row.className = "alternating_color"+alternatingColor+" pbp_play_row";
    var col1 = document.createElement('td');
    col1.colSpan = 3;
    col1.className = "pbp_play";
    row.appendChild(col1);
    var col2 = document.createElement('td');
    col2.colSpan = 2;
    col2.className = "pbp_play";
    col2.innerHTML = message;
    row.appendChild(col2);
    dojo.query("#play_"+(Number(index)+1))[0].appendChild(row);
}
/*
reorganize by position. so we can query 'what player id is at position X'. 
could be multiple people for a listed position so it's a map of lists
map 
    key : position
    value : list of playerIds
*/
function getPlayerIdsByPosition(players) {
    var newMap = {};
    for (x in players) {
        var p = players[x].position;
        if (newMap[p] != null) {
            newMap[p][newMap[p].length] = x;
        } else {
            var newList = [];
            newList[0] = x;
            newMap[p] = newList;
        }
    }
    return newMap;
}

// detect formation by positions on the field and placement of the positions
function detectOffensiveFormation(playerIdsByPosition, pd) {
    var hasWR5 = false;
    var has3TE = false;
    var hasHB = false;
    var hasFB = false;
    var hasK = false;
    var hasP = false;
    var countTE = 0;

    if (playerIdsByPosition['WR5'] != null) {
        hasWR5 = true;
    }
    if (playerIdsByPosition['TE'] != null) {
        countTE = playerIdsByPosition['TE'].length;
    }
    if (playerIdsByPosition['FB'] != null) {
        hasFB = true;
    }
    if (playerIdsByPosition['HB'] != null) {
        hasHB = true;
    }
    if (playerIdsByPosition['P'] != null) {
        hasP = true;
    }
    if (playerIdsByPosition['K'] != null) {
        hasK = true;
    }
    var formation = "Unknown";
    if (hasP) {
        formation = 10;
    } else if (hasK) {
        formation = 9;
    } else if (hasWR5) {
        formation = 6;
    } else if (countTE == 3) {
        formation = 7;
    } else if (countTE == 2) {
        formation = 8;
    } else if (hasHB && !hasFB) {
        // Shotgun or Singleback
        var qbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['QB'][0]);
        if (qbDelta.y > 7 || qbDelta.y < -7) {
            formation = 5;
        } else {
            formation = 4;
        }
    } else {
        // I / Weak I / Strong I / Pro Set
        var fbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FB'][0]);
    	if (fbDelta.y < 0) {
    		// offense heading north
    		if (fbDelta.y <= -10) {
    	            formation = 0;
            	} else if (fbDelta.x <= -3) {
    	            formation = 1;
            	} else if (fbDelta.x >= 3) {
    	            formation = 2;
            	} else {
    	            formation = 3;
    		}
    	} else {
    		// offense heading south
    		if (fbDelta.y >= 10) {
    	            formation = 0;
            	} else if (fbDelta.x >= 3 ) {
    	            formation = 1;
            	} else if (fbDelta.x <= -3) {
    	            formation = 2;
            	} else {
    	            formation = 3;
    		}
    	}
    }
    return formation;
}

/*
returns 1 if the te was shifted left
*/
function getTEShift(f, playerIdsByPosition, pd) {
    if (f >= 0 && f <= 5) {
        var teDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['TE'][0]);
        var cDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['C'][0]);
        var coverCount = 0;
        if ((cDelta.y < 0 && teDelta.x < 0) || (cDelta.y > 0 && teDelta.x > 0)) {
            return 1;
        }
    }   
    return 0;
}

function getPositionLocationRelativeToBall(playData, playerId) {
    var ballLoc = {};
    var posLoc = {};
    for (var i=0; i < playData[0].length; i++) {
        if (playData[0][i].id == 'ball') {
            ballLoc.x = playData[0][i].x;
            ballLoc.y = playData[0][i].y;
        } else if (playData[0][i].id == playerId) {
            posLoc.x = playData[0][i].x;
            posLoc.y = playData[0][i].y;
        }
    }
    if (posLoc.x == null) {
        console.log('didnt find position for playerId '+playerId);
    }
    return {x: ballLoc.x-posLoc.x, y: ballLoc.y-posLoc.y};
}

/*
takes in an array of players taken from the replay screen
*/
function detectDefensiveFormation(playerIdsByPosition, pd) {
    var isDT = false;
    var is5CB = false;
    var is4CB = false;
    var is3CB = false;
    var is1FS = false;
    var isKR = false;
    var isPR = false;
    if (playerIdsByPosition['DT'] != null) {
        isDT = true;
    }
    if (playerIdsByPosition['CB5'] != null) {
        is5CB = true;
    }
    if (playerIdsByPosition['CB4'] != null) {
        is4CB = true;
    }
    if (playerIdsByPosition['CB3'] != null) {
        is3CB = true;
    }
    if (playerIdsByPosition['FS'] != null) {
        is1FS = true;
    }
    if (playerIdsByPosition['P'] != null) {
        isPR = true;
    }
    if (playerIdsByPosition['K'] != null) {
        isKR = true;
    }
    var formation = '';
    if (isKR) {
        formation = 8;
    } else if (isPR) {
        formation = 9;
    } else if (!is1FS) {
        formation = 7;
    } else if (is5CB) {
        formation = 6;
    } else if (isDT) {
        if (is4CB) {
            formation = 4;
        } else if (is3CB) {
            formation = 2;
        } else {
            formation = 0;
        }
    } else {
        if (is4CB) {
            formation = 5;
        } else if (is3CB) {
            formation = 3;
        } else {
            formation = 1;
        }
    }
    return formation;
}

/*
returns -1 if the formation cant have a cover 0-1-2 
otherwise it returns the coverage number 0, 1, or 2 
*/
function getCoverage(pd, playerIdsByPosition) {
        // check for cover 0-1-2
        var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
        coverCount = 0;
        //if (fsDelta.y > 17 || fsDelta.y < -17) {
        if (fsDelta.y > 32.5 || fsDelta.y < -32.5) {
            coverCount++;
        }
        //if (ssDelta.y > 23 || ssDelta.y < -23) {
        if (ssDelta.y > 32.5 || ssDelta.y < -32.5) {
            coverCount++;
        }
    return coverCount;
}
