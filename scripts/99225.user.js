// ==UserScript==
// @name           Alice's Army Games refresh
// @namespace      none
// @description    Adds 'Refresh Games' link to the game lobby, so you don't have to leave, and come back in anymore.
// @include        http://www*.kingdomofloathing.com/gamestore.php?place=lobby
// ==/UserScript==


var tmp = document.body.innerHTML;
tmp = tmp.replace(/Back to the Game Store<\/a>/,
    'Back to the Game Store</a> </br> </br> </a> <a target="mainpane" href="gamestore.php?place=lobby">Refresh Games</a> ');
document.body.innerHTML = tmp;