// ==UserScript==
// @name           Coverage
// @namespace      Coverage
// @description    Tracks the times that any receiver caught a pass near the defender
// @include        http://goallineblitz.com/game/player_game_log.pl?player_id=*
// ==/UserScript==

// Include Dojo from the AOL CDN
var ds = document.getElementById('dojoscript');
if (ds == null) {
    var script = document.createElement('script');
    script.id = 'dojoscript';
    script.src="http://o.aolcdn.com/dojo/1.2.0/dojo/dojo.xd.js";
    document.getElementsByTagName('head')[0].appendChild(script);
}

var taButton = document.createElement('input');
taButton.id = "taButton";
taButton.type="button";
taButton.value = "Load Coverage Stats";
document.getElementById('content').appendChild(taButton);

var statusTextSpan = document.createElement('span');
statusTextSpan.id = "statusTextSpan";
document.getElementById('content').appendChild(statusTextSpan);

/* 
   mapping of caught on data
   key: the game id
   value : times someone caught on the defender
*/
var dataCache = {};
var playerId = 0;
var gamesRemainingToParse = -1;
var replaysRemainingToParse = -1;
/*
    2 is roughly 5 yards
*/
var defenderDistance = 2;
var catchDistance = 0.6;

/*
for stopping the interval functions
*/
var displayMonitorId=0;
var gameLookupMonitorId=0;

function startParsing() {
    dojo = unsafeWindow["dojo"];
    console = unsafeWindow["console"];

    playerId = getPlayerIdFromLocation();
    // loop through the links with a game id in the parameters
    var links = dojo.query("tbody tr td a[href*='game_id']", "career_stats");
    dojo.forEach(links, function(gameLink, index, array) {
        var gameUrl = gameLink.href;
        var gameId = gameUrl.slice(gameUrl.indexOf("game_id=")+"game_id=".length);
        gameIdsToParse[++nextGameIndexToParse] = gameId;
    });
    /*
     * every 4 seconds lookup the next game and parse it
     */
    gameLookupMonitorId = setInterval(lookupGamePlayByPlay, 5000);

    /*
    every 2 seconds check to see if all games and replays have been parsed 
    that'll be the time to display results 
    */
    displayMonitorId = setInterval(displayCoverageColumn, 2000);
}

/*
    since it takes some time to load and parse all the replays,
    keep checking every few seconds to see when all the data has
    been collected
*/
function displayCoverageColumn() {
    if (nextGameIndexToParse == -1 && replaysRemainingToParse==0) {
        dojo.byId('statusTextSpan').innerHTML = "";
        clearInterval(displayMonitorId);
        var rows = dojo.query('table#career_stats tbody tr');
        dojo.forEach(rows, function(row, index) {
            if (index==0) {
                var newCol = document.createElement('td');
                newCol.setAttribute('class', 'career_stat_head');
                newCol.setAttribute('align', 'center');
                newCol.appendChild(document.createTextNode('Coverage'));
                row.appendChild(newCol);
            } else if (index==1) {
                var newCol = document.createElement('td');
                newCol.setAttribute('align', 'right');
                newCol.appendChild(document.createTextNode('Caught On'));
                row.appendChild(newCol);
            } else if (index>1) {
                var columns = dojo.query("td a[href*='game_id']", row);
                if (columns.length > 0) {
                    var url = columns[0].href;
                    var gameId = url.slice(url.indexOf("game_id=")+"game_id=".length);
                    var newCol = document.createElement('td');
                    newCol.setAttribute('align', 'right');
                    if (dataCache[gameId]!=null && dataCache[gameId].length>0) {
                        newCol.appendChild(document.createTextNode(dataCache[gameId].length));
                        for (x in dataCache[gameId]) {
                            newCol.appendChild(document.createTextNode(" | "));
                            var newLink = document.createElement("a");
                            newLink.setAttribute('href', dataCache[gameId][x]);
                            newLink.innerHTML = "replay";
                            newCol.appendChild(newLink);
                        }
                    } else {
                        newCol.appendChild(document.createTextNode("0"));
                    }
                    row.appendChild(newCol);
                }
            }
        });
    } else {
        dojo.byId('statusTextSpan').innerHTML = "Remaining # of games to parse: "+(nextGameIndexToParse+1);
        console.log('remaining parses : '+replaysRemainingToParse);
    }
}

window.addEventListener('load', function(event) {
    var dojo = unsafeWindow["dojo"];

    dojo.addOnLoad(function() {
        dojo.connect(dojo.byId('taButton'), 'onclick', startParsing);
    });
}, 'false');


function getPlayerIdFromLocation() {
    var pid = window.location.search;
    pid = pid.slice(pid.indexOf('player_id=')+'player_id='.length);
    if (pid.indexOf('&') > -1) {
        pid = pid.slice(0,pid.indexOf('&'));
    } else {
        pid = pid.slice(0);
    }
    return pid;
}

/* 
   interval function to lookup a game play by play 
*/
var nextGameIndexToParse = -1;
var gameIdsToParse = [];
function lookupGamePlayByPlay() {
    if (nextGameIndexToParse > -1) {
        var dojo = unsafeWindow["dojo"];
        dojo.xhrGet({
            url: "http://goallineblitz.com/game/game.pl", 
            content : {game_id: gameIdsToParse[nextGameIndexToParse--], mode: "pbp"},
            load: parseGameReplaysForCatches,
            error : function() {
                      //alert('network error');
            },
            handleAs: "text"
        });
    } else {
        clearInterval(gameLookupMonitorId);
    }
}
/* 
   for a given play by play list, check all replays that had a sack happen.
   it parses for the text 'sacked by'
*/
function parseGameReplaysForCatches(response, ioArgs) {
    var console = unsafeWindow["console"];
    var dojo = unsafeWindow["dojo"];
    var text = response;
    var pbpId=0;
    var gameId = ioArgs.args.content.game_id;
    dataCache[gameId] = [];

    while (text.indexOf('pass to ') != -1) {
        text = text.slice(text.indexOf('pass to ')+'pass to '.length);
        // next should be the receiver's name
        var playText = text.slice(0, text.indexOf('</td>'));
        var receiverName = '';
        if (playText.indexOf(", hurried by ") != -1) {
            receiverName = playText.slice(0, playText.indexOf(', hurried by '));
        } else if (playText.indexOf('up the right side') != -1) {
            receiverName = playText.slice(0, playText.indexOf(' up the right side'));
        } else if (playText.indexOf('up the left side') != -1) {
            receiverName = playText.slice(0, playText.indexOf(' up the left side'));
        } else if (playText.indexOf('over the middle') != -1) {
            receiverName = playText.slice(0, playText.indexOf(' over the middle'));
        }
        // dont bother if it was deflected, intercepted or incomplete
        if (receiverName != '' && playText.indexOf('incomplete') == -1 && playText.indexOf('intercepted') == -1) {
            text = text.slice(text.indexOf('pbp_id=')+'pbp_id='.length);
            pbpId = text.slice(0,text.indexOf('"'));
            if (replaysRemainingToParse == -1) {
                replaysRemainingToParse = 0;
            }
            replaysRemainingToParse++;
            dojo.xhrGet({
                url: "http://goallineblitz.com/game/replay.pl", 
                content : {game_id: ioArgs.args.content.game_id, pbp_id: pbpId},
                load: parseSingleReplayForCharacterCaughtOn,
                receiverName: receiverName,
                error : function(one, two) {
                                  console.log(one, two);
                                  replaysRemainingToParse--;
                },
                handleAs: "text"
            });
        }
    }
    return response;
}

/* 
  for a single replay, count it if the player was near the ball and the receiver at the same time.
*/
function parseSingleReplayForCharacterCaughtOn(response, ioArgs) {
    var console = unsafeWindow["console"];
    var gameId = ioArgs.args.content.game_id;
    var pbpId = ioArgs.args.content.pbp_id;
    if (response.indexOf("/game/player.pl?player_id="+playerId) != -1) {
        // if it got this far then the player was at least on the field
        // get the id of the receiver
        response = response.slice(response.indexOf('var players = '));
        var playersText = response.slice(0, response.indexOf(';')+1);
        eval(playersText);

        response = response.slice(response.indexOf('var play_data = '));
        var playDataText = response.slice(0, response.indexOf(';')+1);
        eval(playDataText);
        var receiverId=null;
        for(id in players) {
            if (players[id].name == ioArgs.args.receiverName) {
                receiverId = id;
            }
        }
        var defenderGotBeat = false;
        var frameIndex = 0;
        while (!defenderGotBeat && frameIndex < play_data.length) {
            // loop through frames until the ball + receiver + defender are within a certain distance
            b = {};
            r = {};
            d = {};
            for (p in play_data[frameIndex]) {
                if (play_data[frameIndex][p].id == playerId) {
                    d.x = play_data[frameIndex][p].x;
                    d.y = play_data[frameIndex][p].y;
                    // small change to include receiver catches if you're running this for a receiver
                    if (playerId == receiverId) {
                        r.x=d.x;
                        r.y=d.y;
                    }
                } else if (play_data[frameIndex][p].id == receiverId) {
                    r.x = play_data[frameIndex][p].x;
                    r.y = play_data[frameIndex][p].y;
                } else if (play_data[frameIndex][p].id == "ball") {
                    b.x = play_data[frameIndex][p].x;
                    b.y = play_data[frameIndex][p].y;
                } 
            }
            if (isWithinDistance(b.x, b.y, r.x, r.y, catchDistance) && isWithinDistance(d.x, d.y, r.x, r.y, defenderDistance)) {
                defenderGotBeat = true;
            }
            frameIndex++;
        }
        if (defenderGotBeat) {
            if (dataCache[gameId]==null) {
                dataCache[gameId]=[];
            }
            dataCache[gameId][dataCache[gameId].length] = "http://goallineblitz.com/game/replay.pl?game_id="+gameId+"&pbp_id="+pbpId;
        }
    }
    replaysRemainingToParse--;
    return response;
}

function isWithinDistance(x1, y1, x2, y2, maxDistance) {
    var distance = Math.sqrt((y2-y1)*(y2-y1) + (x2-x1)*(x2-x1));
    if (distance < maxDistance) {
        return true;
    } else {
        return false;
    }
}