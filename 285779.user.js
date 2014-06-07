// ==UserScript==
// @name        Grooveshark notifications
// @namespace   http://www.toniazzi.net/gmscripts
// @description Shows a desktop notification when a song is played
// @include     http://grooveshark.com/*
// @version     1
// @grant       none
// ==/UserScript==

var h = document.createElement("script");
h.setAttribute("src", "https://raw.github.com/ttsvetko/HTML5-Desktop-Notifications/master/desktop-notify-min.js");
document.body.appendChild(h);

var last = 0;
var cb = function(event) {
    var song = event.song;
    var type = event.status;
    
    // console.log("Got a song event: %s %o", type, song);
    
    if (type !== "playing") {
        return;
    }
    
    // skip multiple notifications for the same song
    if (song.songID === last) {
        return;
    }
    last = song.songID;
    
    var level = notify.permissionLevel();
    if (level === notify.PERMISSION_DEFAULT) {
        notify.requestPermission();
    } else if (level === notify.PERMISSION_DENIED) {
        return;
    }
    
    notify.createNotification(
        "Playing " + event.song.songName,
        {
            body: event.song.artistName + " in " + event.song.albumName,
            icon: event.song.artURL
        }
    );
}

// wait for Grooveshark
var i = window.setInterval(function() {
    if (!("Grooveshark" in unsafeWindow)) {
        return;
    }
    
    window.clearInterval(i);
    unsafeWindow.Grooveshark.setSongStatusCallback(cb);
}, 500);
