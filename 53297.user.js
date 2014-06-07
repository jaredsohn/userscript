// ==UserScript==
// @name           Automatically Pick Player
// @namespace      CourtRivals
// @description    Defeats the shitty security implementation to prevent botting.
// @include        http://www.courtrivals.com/
// ==/UserScript==

var playerlist = document.getElementById('frmPlayerId');
var curplayerid = parseInt(playerlist.options[playerlist.selectedIndex].value);
window.location = 'http://www.courtrivals.com/processing/playerSwitch.php?pid=' + curplayerid;