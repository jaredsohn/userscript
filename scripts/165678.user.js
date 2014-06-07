// ==UserScript==
// @name        RTLReplayNoAds
// @namespace   poet
// @description removes ads from rtl replay flash player (requires click2play, otherwise flash loads too early)
// @include     http://tele.rtl.lu/waatleeft/replay/*
// @version     1
// @grant       none
// ==/UserScript==

var numTries = 50;
var found = false;

function main(){
    var flashVars = document.getElementsByName('flashvars');
    
    for(var i = 0; i < flashVars.length; i++){
        flashVars[i].value = new String(flashVars[i].value).replace(/[&]plugins[=].*/i, '');
        found = true;
    }
    if(!found && --numTries > 0){
        //console.log('retrying ' + numTries + ' more times');
        setTimeout(main, 300);        
    }
}

main();