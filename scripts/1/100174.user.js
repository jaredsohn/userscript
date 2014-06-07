// ==UserScript==
// @name            Song and Artist as Window Title for Amazon Cloud Player
// @author          Ryan Mott / Sprout Software LLC
// @namespace       http://userscripts.org/scripts/show/100174
// @datecreated 2011-03-29
// @lastupdated 2011-03-30
// @include         https://www.amazon.com/gp/dmusic/mp3/player*
// @match           https://www.amazon.com/gp/dmusic/mp3/player*
// @version         1.1.3
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

window.addEventListener("load", function() {
    exec(function() {
        amznMusic.events.bind("#nowPlaying",function(){
            current = amznMusic.widgets.player.getCurrent();
            if (!current) {
                document.title = amznMusic.strings.get("dmusic_amp_title");
                return;
            }
            document.title = current.metadata.title + ' ' + amznMusic.strings.get("dmusic_amp_by") + ' ' + current.metadata.artistName;
        });
    });
}, false);