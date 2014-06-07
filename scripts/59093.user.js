// ==UserScript==
// @name          Set Focus
// @namespace     http://splib.pbworks.com
// @description   Set focus to Amazon search box & select any text.
// @include       http://*.amazon.*
// @creator       Cab Vinton
// @source        http://userscripts.org/scripts/show/
// @identifier    http://userscripts.org/scripts/source/
// ==/UserScript==

function getFocus(){
    if(document.getElementById("twotabsearchtextbox")){
        document.getElementById("twotabsearchtextbox").select();
        return;
    }
    setTimeout(function(){
        getFocus();
    },100);
}
getFocus();