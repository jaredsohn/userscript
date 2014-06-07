// ==UserScript==

// @name           Disable instant Google Previews

// @namespace      http://manu.fun.gg/

// @description    Disable Google Instant Previews of search resuts.

// @include        http://*.google.*/search*

// @include        https://encrypted.google.com/*

// @version        1.2

// ==/UserScript==

(function(){

    var vsc = document.getElementsByClassName("vsc");



vsc[20].className=vsc[19].className=vsc[18].className=vsc[17].className=vsc[16].className=vsc[15].className=vsc[14].className=vsc[13].className=vsc[12].className=vsc[11].className=vsc[10].className=vsc[0].className=vsc[1].className=vsc[2].className=vsc[3].className=vsc[4].className=vsc[5].className=vsc[6].className=vsc[7].className=vsc[8].className=vsc[9].className="newmagic";


})();

/*
This scripts works for default search results, but not for the results from
"[+]show more results from <xyz.com>"

Updated to make it work on https://encrypted.google.com/

*/