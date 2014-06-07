// ==UserScript==
// @name       attackCheker
// @namespace  bro555.org
// @version    0.1
// @description  Imperiaonline attackChecker
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012+, You
// ==/UserScript==


document.body.style.background = 'green';
setInterval(
function checker(){
var sound = document.createElement('embed');
sound.setAttribute('width', '5px');
sound.setAttribute('height', '5px');
sound.setAttribute('src', 'http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3');
var currElements = document.getElementsByClassName('incoming province');
    for(var i=0;i<currElements.length;i++){
        if(currElements[i].className == 'incoming province'){
  document.body.appendChild(sound);
    document.body.style.background = 'red';
        }
    };
    //location.reload();
    xajax_find_babysit(1, 1);
    
},15000);