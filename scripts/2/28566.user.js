// ==UserScript==
// @name           Bigger GLB Depth Chart Box
// @namespace      GLB
// @description    Increases the height of the depth chart box for GLB
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// ==/UserScript==

window.setTimeout( function() 
{

var dcbox= document.getElementById('position_players');

if (dcbox) {
    dcbox.style.height = "250px";
}


},100);