// ==UserScript==
// @name       ArmyHomeAlarm
// @namespace  Bela
// @version    0.1
// @description  ArmyHomeAlarm
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012+, You
// ==/UserScript==

document.body.style.background = 'lightgreen';
setInterval(
function checker(){
var sound = document.createElement('object');
sound.setAttribute('width', '5px');
sound.setAttribute('height', '5px');
sound.setAttribute('data', 'http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3');
  
    
    if(document.getElementsByClassName('outgoing province')[0] == null){
 	document.body.appendChild(sound);
    }
    //location.reload();
    //xajax_spiesSubTabs(999,2);
    xajax_find_babysit(1, 1);
},15000);