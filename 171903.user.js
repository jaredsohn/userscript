// ==UserScript==
// @name        Turntable.fm Shuffle
// @namespace   newtscripts
// @description Adds Turntable.fm Playlist Shuffle
// @include     http://turntable.fm/*
// @include     https://turntable.fm/*
// @exclude     http://turntable.fm/lobby
// @exclude     https://turntable.fm/lobby
// @exclude     http://turntable.fm/about
// @exclude     https://turntable.fm/about
// @exclude     http://turntable.fm/events
// @exclude     https://turntable.fm/events
// @exclude     http://turntable.fm/jobs
// @exclude     https://turntable.fm/jobs
// @version     1.4
// @run-at      document-end
// @grant       none
// ==/UserScript==

function makeCall(e, callback) {
    var v = turntable;
    var s = util;
    var g = turntable.user;
    if ("room.now" != e.api) {
        e.msgid = v.messageId, e.client = "web", v.messageId += 1, e.clientid = v.clientId, g.id && !e.userid && (e.userid = g.id, e.userauth = g.auth);
        var i = JSON.stringify(e);
        v.socketVerbose && LOG(s.nowStr() + " Preparing custom message " + i);
        var n = $.Deferred();
        return v.whenSocketConnected(function () {
            v.socketVerbose && LOG(s.nowStr() + " Sending message " + e.msgid + " to " + v.socket.host), "websocket" == v.socket.transport.type && v.socketLog(v.socket.transport.sockets[0].id + ":<" + e.msgid), v.socket.send(i), v.socketKeepAlive(!0), v.pendingCalls.push({
                msgid: e.msgid,
                handler: callback,
                deferred: n,
                time: s.now()
            })
        }), n.promise()
    }
};
function moveRandomToPosition(i, start) {
    var n = playlist.queue.options.songids.length;
    if (i >= n) {
        return;
    }
    var r = Math.floor(Math.random() * (n-i)+i);
    var data = {
        api: "playlist.reorder",
        playlist_name: playlist.activePlaylist,
        index_from: r,
        index_to: start
    };
    playlist.lockQueueEdits();
    makeCall(data, function () {
        playlist.queue.reorder(r, start);
        playlist.unlockQueueEdits();
        moveRandomToPosition(++i, start);
    });
}
function shufflePlaylist() {
        
    if (!playlist.queue.locked) {
        var start = (playlist.queue.currentlyPlayingSongid &&
                playlist.queue.currentlyPlayingSongid == playlist.queue.options.songids[0]) ? 1 : 0;
        moveRandomToPosition(start,start);
    }
}
var SoloStateTimer = null;
var timerName = null;
var unmuteFunction = null;
function updateSoloState(e) {
    clearInterval(SoloStateTimer);
    if(document.getElementById("solo-play").checked) {
        SoloStateTimer = setInterval(soloStateCallback, 2000);
    }
}

function soloStateCallback() {
    if(document.getElementById("solo-play").checked) {
        if (timerName) {
            for (var timeout in turntable[timerName].timers) {
                clearTimeout(turntable[timerName].timers[timeout]);
            }
        }
        if (unmuteFunction) {
            unmuteFunction.apply(turntablePlayer, [!1]);
        }
    }
}
function addButton() {
    if (document.getElementById("shuffle-button")) {
        return;
    }
    
    var leftPane = document.getElementById("queue-view");
    var songQueue = document.getElementById("songs-wrapper");
    
    var newDiv = document.createElement("div");
    newDiv.id = "shuffle-header";
    newDiv.style.background = "linear-gradient(to bottom, #E8E8E8 0px, #CDCDCD 100%) repeat scroll 0 0 transparent";
    newDiv.style.borderBottom = "1px solid #878787";
    newDiv.style.borderTop = "1px solid white";
    newDiv.style.lineHeight = "36px";
    newDiv.style.textAlign = "left";
    newDiv.style.paddingLeft = "49px";
    newDiv.style.transition = "height 0.3s ease 0s";
    
    var btnDiv = document.createElement("div");
    btnDiv.id = "shuffle-button";
    btnDiv.style.left = "5px";
    btnDiv.style.top = "3px";
    btnDiv.style.position = "absolute";
    
    var btn = document.createElement("button");
    btn.style.border = "0 none";
    btn.style.cursor = "pointer";
    btn.style.display = "block";
    btn.style.height = "30px";
    btn.style.overflow = "hidden";
    btn.style.textIndent = "-9999px";
    btn.style.width = "33px";
    btn.style.background = 'url("http://i.imgur.com/VmgsTSP.png") no-repeat scroll 0 0 transparent';
    btn.innerHTML = "Shuffle playlist";
    
    btnDiv.appendChild(btn);
    newDiv.appendChild(btnDiv);
    newDiv.insertAdjacentHTML('beforeend', "Shuffle");
    
    var keepPlaying = document.createElement("input");
    keepPlaying.id = "solo-play";
    keepPlaying.type = "checkbox";
    keepPlaying.checked = true;
    keepPlaying.style.margin = "0 10px 0 30px";
    keepPlaying.style.verticalAlign = "-1px";
    
    newDiv.appendChild(keepPlaying);
    newDiv.insertAdjacentHTML('beforeend', "Play when solo");
    
    leftPane.insertBefore(newDiv, songQueue);
    songQueue.style.top = "114px";
    $("#shuffle-header").addClass('floating-panel-header');
    $("#shuffle-button button").hover(function() { $(this).css("background-position", "0 -30px"); },
        function() { $(this).css("background-position", "0 0"); });
    $("#shuffle-button").on('click',shufflePlaylist);
    $("#solo-play").on('change',updateSoloState);
    
    for (var key in turntable) {
        if (turntable[key] && turntable[key].timers) {
            timerName = key;
        }
    }
    for (var key in turntablePlayer) {
        if (turntablePlayer[key] && turntablePlayer[key] instanceof Function &&
                turntablePlayer[key].toString() && turntablePlayer[key].toString().indexOf("e.setVolume(e.volume)") > -1) {
            unmuteFunction = turntablePlayer[key];
        }
    }
    
    updateSoloState();
}
setTimeout(addButton,5000);
