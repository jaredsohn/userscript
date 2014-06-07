// ==UserScript==
// @name        cheat for clicking bad
// @namespace   http://clickingbad.nullism.com/
// @include     http://clickingbad.nullism.com/
// @version     1
// @grant       none
// ==/UserScript==
//
//
//

function start(){
var inter = setInterval(function(){

    do_make_click();
    do_sell_click();
    console.log('sell more more more...');
    
},1);
}

window.onload = start();
