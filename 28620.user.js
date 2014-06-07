// ==UserScript==
// @name           Bigger Depth Chart - Fits 15 Players
// @namespace      GLB
// @description    This Depth Chart is bigger and set to fit 15 players (Original script by RandomBeast)
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// ==/UserScript==

window.setTimeout( function() 
{

var dcbox= document.getElementById('position_players');

if (dcbox) {
    dcbox.style.height = "345px";
}


},100);