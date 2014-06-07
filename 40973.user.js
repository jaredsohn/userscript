// ==UserScript==
// @name           Offense in Play Creator
// @namespace      GLB
// @author         
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// ==/UserScript==
// 

function offen() {
playarea.appendChild(button);;
}

var playarea = document.getElementById('play_area');
var button = document.createElement('div');
document.addEventListener("mousemove", offen, true);
button.innerHTML = '<div class="player" style="background-image: url(/images/LG.png); left: 220px; bottom: -2px;"/></div><div class="player"style="background-image: url(/images/C.png); left: 238px; bottom: 0px;"/></div><div class="player" style="background-image: url(/images/RG.png); left: 256px; bottom: -2px;"/></div><div class="player" style="background-image: url(/images/ROT.png); left: 277px; bottom: -2px;"/></div><div class="player" style="background-image: url(/images/LOT.png); left: 199px; bottom: -2px;"/></div><div  class="player" style="background-image: url(/images/TE.png); left: 298px; bottom: -2px;"/></div></div><div  class="player" style="background-image: url(/images/WR1.png); left: 103px; bottom: 0px;"/></div></div><div class="player" style="background-image: url(/images/WR2.png); left: 373px; bottom: -2px;"/></div>';
playarea.appendChild(button);

