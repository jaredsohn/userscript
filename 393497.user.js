// ==UserScript==
// @name      ImpAttack
// @namespace  linkee1 
// @version    2.0
// @description  facebook
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// ==/UserScript==
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
                document.body.style.background = 'DarkRed';
            }
        };
        xajax_spiesSubTabs(999,2);
        
    },10000);