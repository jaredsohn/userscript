

// ==UserScript==
// @name       Logout
// @namespace  rodolfo1010.org
// @version    0.1
// @description  enter something useful
// @match      http://*.imperiaonline.org/imperia/game_v6/game/homepage.php?games=ok&ref=http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012+, You
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


document.body.style.background = 'Black';
setInterval(
function checker(){
var sound = document.createElement('object');
sound.setAttribute('width', '5px');
sound.setAttribute('height', '5px');
    sound.setAttribute('data', 'http://s1download-universal-soundbank.com/mp3/sounds/9248.mp3');//'http://www.soundjay.com/clock/sounds/alarm-clock-1.mp3');
//var currElements = document.getElementsByClassName('incoming province');
    //for(var i=0;i<currElements.length;i++){
        //if(currElements[i].className == 'modal-out'){
    if(document.getElementsByClassName('modal-out')[0] != null){
 	document.body.appendChild(sound);
    document.body.style.background = 'red';
        }
    
    //location.reload();
    //xajax_spiesSubTabs(999,2);
    xajax_find_babysit(1, 1);
},5000);