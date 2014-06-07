// ==UserScript==
// @name       Kamiro Auto Replay
// @namespace  http://ihome.ust.hk/~stanab/
// @version    0.2
// @description  make the player in kamiro auto shift to the next.
// @updateURL      https://userscripts.org/scripts/source/167960.user.js
// @include      http://kamiro.net/diary/*
// @license        MIT License
// @grant          none
// @copyright  2013, John Tan
// ==/UserScript==

(function() {
    function init() {
        var players = document.body.querySelectorAll('embed[src*=dewplayer]'), 
            i, pl, new_pl, parent;
        for(i = 0; i < players.length; i++) {
            pl = players[i];
            new_pl = pl.cloneNode();
            new_pl.src = new_pl.src + "&autoreplay=true";
            parent = pl.parentNode;
            parent.replaceChild(new_pl, pl);
        }
    }
        
	document.addEventListener('DOMContentLoaded', init, false);
}());