// ==UserScript==
// @name           SFF
// @namespace      Sff
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// ==/UserScript==

// Include Dojo from the AOL CDN
var dojoElement = document.getElementById('dojoscript');
if (dojoElement == null) {
    var script = document.createElement('script');
    script.id = 'dojoElement';
    script.src="http://o.aolcdn.com/dojo/1.2.3/dojo/dojo.xd.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}

// array and index
var currentPbpIndexToParse = -1;
var pbpIdsToParse = [];

var gameId = -1;


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

window.addEventListener('load', function(event) {
    dojo = unsafeWindow["dojo"];

    dojo.addOnLoad(function() {
        gameId = getGameIdFromLocation();

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
    });
}, 'false');

function startParsing() {
    console = unsafeWindow["console"];
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
    parseNextReplay();
}

function parseNextReplay() {
    console = unsafeWindow["console"];
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
    }
}

function parseSingleReplay(response, ioArgs) {
    console = unsafeWindow["console"];

    // pull out players data
    response = response.slice(response.indexOf('var players = '));
    var playersText = response.slice(0, response.indexOf(';')+1);
    eval(playersText);

    // pull out play_data
    response = response.slice(response.indexOf('var play_data = '));
    var playDataText = response.slice(0, response.indexOf(';')+1);
    eval(playDataText);

    if (play_data.length > 0) {
        var playerIds = getPlayerIdsByPosition(players);
        var defFormation = detectDefensiveFormation(playerIds, play_data);
        var offFormation = detectOffensiveFormation(playerIds, play_data);
    
        var offenseMessage = "Offense: <b>" + offFormation+"</b>";
        addScoutRow(currentPbpIndexToParse, offenseMessage);
        
        var defenseMessage = "Defense: <b>" + defFormation+"</b>";
        addScoutRow(currentPbpIndexToParse, defenseMessage);
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
    dojo.query("#play_"+(index+1))[0].appendChild(row);
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
        formation = 'Punt Return';
    } else if (hasK) {
        formation = 'Kick Return';
    } else if (hasWR5) {
        formation = 'Shotgun 5WR';
    } else if (countTE == 3) {
        formation = 'Goal Line';
    } else if (countTE == 2) {
        formation = 'Single Back Big';
    } else if (hasHB && !hasFB) {
        // Shotgun or Singleback
        var qbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['QB'][0]);
        if (qbDelta.y > 7 || qbDelta.y < -7) {
            formation = 'Shotgun';
        } else {
            formation = 'Singleback';
        }
    } else {
        // I / Weak I / Strong I / Pro Set
        var fbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FB'][0]);
        if ((fbDelta.x >= 5 && fbDelta.y >= 10) || (fbDelta.x <= -5 && fbDelta.y <= -10)) {
            formation = "Pro Set ";
        } else if ((fbDelta.x >= 7 && fbDelta.y >= 7) || (fbDelta.x <= -7 && fbDelta.y <= -7)) {
            formation = "Strong I ";
        } else if ((fbDelta.x <= 7 && fbDelta.x >= -7)) {
            formation = "I Formation ";
        } else if ((fbDelta.x <= -7 && fbDelta.y >= 7) || (fbDelta.x >= 7 && fbDelta.y <= -7)) {
            formation = "Weak I ";
        }
    }
    return formation;
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
        formation = 'Kickoff'
    } else if (isPR) {
        formation = 'Punt'
    } else if (!is1FS) {
        formation = 'Goal Line';
    } else if (is5CB) {
	// Coverage
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
	var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        if ((fsDelta.y >= 25 && ssDelta.y >=25) || (fsDelta.y <= -25 && ssDelta.y<=-25)) {
            formation = '3-1-7 Quarter (5 CBs) Cover 2';
        } else if ((fsDelta.y >= 25 && ssDelta.y <=25) || (fsDelta.y <= -25 && ssDelta.y>=-25)) {
            formation = '3-1-7 Quarter (5 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y >=25) || (fsDelta.y >= -25 && ssDelta.y<=-25)) {
            formation = '3-1-7 Quarter (5 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y <=25) || (fsDelta.y >= -25 && ssDelta.y>=-25)) {
            formation = '3-1-7 Quarter (5 CBs) Cover 0';
	}
    } else if (isDT) {
        if (is4CB) {
	// Coverage
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
	var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        if ((fsDelta.y >= 25 && ssDelta.y >=25) || (fsDelta.y <= -25 && ssDelta.y<=-25)) {
            formation = '4-1-6 Dime (4 CBs) Cover 2';
        } else if ((fsDelta.y >= 25 && ssDelta.y <=25) || (fsDelta.y <= -28 && ssDelta.y>=-25)) {
            formation = '4-1-6 Dime (4 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y >=25) || (fsDelta.y >= -28 && ssDelta.y<=-25)) {
            formation = '4-1-6 Dime (4 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y <=25) || (fsDelta.y >= -28 && ssDelta.y>=-25)) {
            formation = '4-1-6 Dime (4 CBs) Cover 0';
	}
        } else if (is3CB) {
	// Coverage
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
	var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        if ((fsDelta.y >= 25 && ssDelta.y >=25) || (fsDelta.y <= -25 && ssDelta.y<=-25)) {
            formation = '4-2-5 Nickel (3 CBs) Cover 2';
        } else if ((fsDelta.y >= 25 && ssDelta.y <=25) || (fsDelta.y <= -25 && ssDelta.y>=-25)) {
            formation = '4-2-5 Nickel (3 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y >=25) || (fsDelta.y >= -25 && ssDelta.y<=-25)) {
            formation = '4-2-5 Nickel (3 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y <=25) || (fsDelta.y >= -25 && ssDelta.y>=-25)) {
            formation = '4-2-5 Nickel (3 CBs) Cover 0';
	}
        } else {
	// Coverage
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
	var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        if ((fsDelta.y >= 25 && ssDelta.y >=25) || (fsDelta.y <= -25 && ssDelta.y<=-25)) {
            formation = '4-3 Cover 2';
        } else if ((fsDelta.y >= 25 && ssDelta.y <=25) || (fsDelta.y <= -25 && ssDelta.y>=-25)) {
            formation = '4-3 Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y >=25) || (fsDelta.y >= -25 && ssDelta.y<=-25)) {
            formation = '4-3 Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y <=25) || (fsDelta.y >= -25 && ssDelta.y>=-25)) {
            formation = '4-3 Cover 0';
	}
        }
    } else {
        if (is4CB) {
	// Coverage
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
	var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        if ((fsDelta.y >= 25 && ssDelta.y >=25) || (fsDelta.y <= -25 && ssDelta.y<=-25)) {
            formation = '3-2-6 Dime (4 CBs) Cover 2';
        } else if ((fsDelta.y >= 25 && ssDelta.y <=25) || (fsDelta.y <= -25 && ssDelta.y>=-25)) {
            formation = '3-2-6 Dime (4 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y >=25) || (fsDelta.y >= -25 && ssDelta.y<=-25)) {
            formation = '3-2-6 Dime (4 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y <=25) || (fsDelta.y >= -25 && ssDelta.y>=-25)) {
            formation = '3-2-6 Dime (4 CBs) Cover 0';
	}
        } else if (is3CB) {
	// Coverage
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
	var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        if ((fsDelta.y >= 25 && ssDelta.y >=25) || (fsDelta.y <= -25 && ssDelta.y<=-25)) {
            formation = '3-3-5 Nickel (3 CBs) Cover 2';
        } else if ((fsDelta.y >= 25 && ssDelta.y <=25) || (fsDelta.y <= -25 && ssDelta.y>=-25)) {
            formation = '3-3-5 Nickel (3 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y >=25) || (fsDelta.y >= -25 && ssDelta.y<=-25)) {
            formation = '3-3-5 Nickel (3 CBs) Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y <=25) || (fsDelta.y >= -25 && ssDelta.y>=-25)) {
            formation = '3-3-5 Nickel (3 CBs) Cover 0';
	}
        } else {
	// Coverage
        var ssDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['SS'][0]);
	var fsDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FS'][0]);
        if ((fsDelta.y >= 25 && ssDelta.y >=25) || (fsDelta.y <= -25 && ssDelta.y<=-25)) {
            formation = '3-4 Cover 2';
        } else if ((fsDelta.y >= 25 && ssDelta.y <=25) || (fsDelta.y <= -25 && ssDelta.y>=-25)) {
            formation = '3-4 Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y >=25) || (fsDelta.y >= -25 && ssDelta.y<=-25)) {
            formation = '3-4 Cover 1';
        } else if ((fsDelta.y <= 25 && ssDelta.y <=25) || (fsDelta.y >= -25 && ssDelta.y>=-25)) {
            formation = '3-4 Cover 0';
	}
        }
    }
    return formation;
}
