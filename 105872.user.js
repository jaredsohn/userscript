// ==UserScript==
// @name Avatars on Roster Page
// @namespace pbr/aor
// @include http://goallineblitz.com/game/roster.pl?team_id=*
// ==/UserScript==

for (var j=0; j<document.getElementsByClassName("player_name").length; j++) {
var pn = document.getElementsByClassName("player_name")[j];
var pid = parseInt(pn.firstChild.firstChild.href.toString().split("=")[1]);
var img = document.createElement("img");
img.src = "/game/player_pic.pl?player_id="+pid;
img.width = 32;
img.height = 32;
pn.firstChild.insertBefore(img, pn.firstChild.firstChild);
}