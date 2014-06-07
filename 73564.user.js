// ==UserScript==
// @name          Set Focus/Google
// @namespace     http://splib.pbworks.com
// @description   Set focus to Amazon search box & select any text.
// @include       http://*.google.com/finance*
// @creator       Cab Vinton
// @source        http://userscripts.org/scripts/show/
// @identifier    http://userscripts.org/scripts/source/
// ==/UserScript==

function getFocus(){
    if(document.getElementById("searchbox")){
        document.getElementById("searchbox").select();
        return;
    }
    setTimeout(function(){
        getFocus();
    },100);
}
getFocus();