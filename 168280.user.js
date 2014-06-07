// ==UserScript==
// @name            Google Search Keys
// @version         1.0.0
// @author          Wild Eyes
// @namespace       wilde_gsk
// @description     Use google-search with shortcuts. x\c + 1...5 for opening any of the first 5 links (c opens in a new tab).
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include         http://www.google.*/*
// @include         https://www.google.*/*
// ==/UserScript==

/*scr      =document.createElement('script');
scr.type ='text/javascript';
scr.src  ='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(scr);

setTimeout(gSearchKeys,200);
function gSearchKeys() {*/
document.addEventListener('keydown', function(e) {
    var target = null,
        num = e.which - 48,
        mod = false
    if ( e.altKey )
        mod = "_newtab"
    else if (e.shiftKey)
        mod = ""
        console.log(num)
    if(num < 6 && num > 0 && mod != false) {
        target = $('.r a')[num - 1];
        debugger
        window.open(target.href,mod);
    }
});
//}
/*
document.addEventListener('keydown', function(e) {
    console.log(e.which);
})
*/