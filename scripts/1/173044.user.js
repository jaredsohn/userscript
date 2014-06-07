// ==UserScript==
// @name           Hide D Play Text
// @namespace      www.goallineblitz.com
// @description    Hide Custom D Play Text
// @include        http://goallineblitz.com/game/team_package.pl?team_id=0&type=d&edit=*
// ==/UserScript==



// var playlistdiv = document.getElementsByClassname('description_text');
// playlistdiv.style.display = 'none';
// elements = document.getElementsByClassName('description_text')
// elements.parentNode.removeChild(elements);
descriptext = document.getElementsByClassName("description_text")[0];
descriptext.parentNode.removeChild(descriptext);
document.getElementById('play_area_canvas').setAttribute ("style","positioning: relative; top: -300px;");