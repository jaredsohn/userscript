// ==UserScript==
// @name            Song and Artist as Window Title for Songza
// @author          Ryan Mott / Sprout Software LLC
// @namespace       http://userscripts.org/users/175403
// @datecreated 2012-03-19
// @lastupdated 2012-03-19
// @include         http://songza.com/*
// @match           http://songza.com/*
// @version         1.1.0
// @license         MIT license
// @description Change the document/tab/window title to match the currently playing song and artist for easy visiblitiy in the taskbar
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}

    exec(function() {
        require(["songza/app"], function(App) {
            App.postInit(function() {
                t = function(a) {
                    document.title = a.song.get("title") + " by " + a.song.get("artist");
                };
                i = App.getInstance();
                i.bind("player-song-started", t);
                i.bind("player-song-play", t);
                i.bind("player-song-pause", t);
            });
        });
    });

