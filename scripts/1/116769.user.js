// ==UserScript==
// @name           show play call
// @namespace      com.fishdan.greasemonkey
// @description    toggle the play call box
// @include        http://goallineblitz.com/game/replay.pl?game_id=*
// ==/UserScript==

function KeyCheck(e){
  var kc=e.keyCode;
  if(kc == 90){
    var myDiv=document.getElementById('play_container');
    myDiv.style.removeProperty("display");    
    myDiv=document.getElementById('defense_play_container');
    myDiv.style.removeProperty("display");    
  }
}

window.addEventListener('keydown', KeyCheck, true);
