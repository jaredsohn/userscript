// ==UserScript==
// @name       aaaaaa
// @namespace  Dome
// @version    1.0
// @description  N22222
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012, You
// ==/UserScript==


document.body.style.background = 'aqua';
setInterval(
function checker(){
var sound = document.createElement('embed');
sound.setAttribute('width', '5px');
sound.setAttribute('height', '5px');
sound.setAttribute('src', 'http://soundbible.com/2056-Missile-Alert.html#Missile Alert Sound');
var currElements = document.getElementsByClassName('incoming province');
    for(var i=0;i<currElements.length;i++){
        if(currElements[i].className == 'incoming province'){
 	document.body.appendChild(sound);
    document.body.style.background = 'red';
        }
    };
    xajax_spiesSubTabs(999,2);
    
},10000);