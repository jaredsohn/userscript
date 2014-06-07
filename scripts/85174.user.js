// ==UserScript==
// @name           Ogame-Allianzen-Punkte-Mod
// @description    Fuegt die Punkte hinter den Platz
// @version        0.1
// @include        http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

window.onload = function() { 

alert('test');

var nodes = document.getElementsByClassName('member_score');
    for(i = 0; i < nodes.length; i++) {
        var span = nodes[i].getElementsByClassName('tipsStandard');
        var reExp = new RegExp("\\|");
        var points = " (" + span[0].title.replace(reExp, ' ').replace(/Punkte/g, '') + ")";

        span[0].innerHTML += points;
    }

}