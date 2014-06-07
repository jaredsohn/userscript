// ==UserScript==
// @name           SacksAllowed
// @namespace      SacksAllowed
// @description    shows how many sacks happened while that player was on the field for a given game
// @include        http://goallineblitz.com/game/player_game_log.pl?player_id=*
// ==/UserScript==

// Include Dojo from the AOL CDN
var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.2.0/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script);

var saButton = document.createElement('input');
saButton.id = "saButton";
saButton.type="button";
saButton.value = "Load Sacks Allowed";
document.getElementById('content').appendChild(saButton);

var playerId = 0;

function startParsing() {
    dojo = unsafeWindow["dojo"];
    console = unsafeWindow["console"];
    /*
        since it takes some time to load and parse all the replays,
        keep checking every few seconds to see when all the data has
        been collected
    */
    displayMonitorId = setInterval(function() {
        if (replaysRemainingToParse==0) {
            clearInterval(displayMonitorId);
            var rows = dojo.query('table#career_stats tbody tr');
            dojo.forEach(rows, function(row, index) {
                if (index==0) {
                    var newCol = document.createElement('td');
                    newCol.setAttribute('class', 'career_stat_head');
                    newCol.setAttribute('align', 'center');
                    newCol.appendChild(document.createTextNode('Pass Protection'));
                    row.appendChild(newCol);
                } else if (index==1) {
                    var newCol = document.createElement('td');
                    newCol.setAttribute('align', 'right');
                    newCol.appendChild(document.createTextNode('Sacks Allowed'));
                    row.appendChild(newCol);
                } else if (index>1) {
                    var columns = dojo.query("td a[href*='game_id']", row);
                    if (columns.length > 0) {
                        var url = columns[0].href;
                        var gameId = url.slice(url.indexOf("game_id=")+"game_id=".length);
                        var newCol = document.createElement('td');
                        newCol.setAttribute('align', 'right');
                        newCol.appendChild(document.createTextNode(dataCache[gameId]));
                        row.appendChild(newCol);
                    }
                }
            });
        } else {
            console.log('remaining parses : '+replaysRemainingToParse);
        }
    }, 1000);

    playerId = getPlayerIdFromLocation();
    // loop through the links with a game id in the parameters
    var links = dojo.query("tbody tr td a[href*='game_id']", "career_stats");
    dojo.forEach(links, function(gameLink, index, array) {
        var gameUrl = gameLink.href;
        var gameId = gameUrl.slice(gameUrl.indexOf("game_id=")+"game_id=".length);
        console.log(gameId);
        lookupGamePlayByPlay(gameId);
    });
}

/* 
   mapping of sacks allowed data
   key: the game id
   value : sacks allowed in that game
*/
var dataCache = {};

var seasonSacksAllowed = 0;
var replaysRemainingToParse = -1;
var displayMonitorId=0;

window.addEventListener('load', function(event) {
    var dojo = unsafeWindow["dojo"];

    dojo.addOnLoad(function() {
        dojo.connect(dojo.byId('saButton'), 'onclick', startParsing);
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
   lookup a game play by play 
*/
function lookupGamePlayByPlay(gameId) {
    var dojo = unsafeWindow["dojo"];
    dojo.xhrGet({
        url: "http://goallineblitz.com/game/game.pl", 
        content : {game_id: gameId, mode: "pbp"},
        load: parseGameReplaysForSacks,
        error : function() {alert('network error')},
        handleAs: "text"
    });
}

/* 
   for a given play by play list, check all replays that had a sack happen.
   it parses for the text 'sacked by'
*/
function parseGameReplaysForSacks(response, ioArgs) {
    var console = unsafeWindow["console"];
    var dojo = unsafeWindow["dojo"];
    var text = response;
    var pbpId=0;
    var gameId = ioArgs.args.content.game_id;
    dataCache[gameId] = 0;
    while (text.indexOf('sacked by') != -1) {
        text = text.slice(text.indexOf('sacked by'));
        text = text.slice(text.indexOf('pbp_id=')+'pbp_id='.length);
        pbpId = text.slice(0,text.indexOf('"'));
        if (replaysRemainingToParse == -1) {
            replaysRemainingToParse = 0;
        }
        replaysRemainingToParse++;
        dojo.xhrGet({
            url: "http://goallineblitz.com/game/replay.pl", 
            content : {game_id: ioArgs.args.content.game_id, pbp_id: pbpId},
            load: parseSingleReplayForCharacterPresence,
            error : function() {alert('network error')},
            handleAs: "text"
        });
    }
    return response;
}

/* 
  for a single replay, count it if the player was on the field.
*/
function parseSingleReplayForCharacterPresence(response, ioArgs) {
    var console = unsafeWindow["console"];
    var gameId = ioArgs.args.content.game_id;
    var pbpId = ioArgs.args.content.pbp_id;
    if (response.indexOf("/game/player.pl?player_id="+playerId) != -1) {
        dataCache[gameId] = dataCache[gameId] + 1;
    }
    replaysRemainingToParse--;
    return response;
}
