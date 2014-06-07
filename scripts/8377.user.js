// ==UserScript==
// @name          LineCounter for Developpez.net
// @description   ...
// @include       *developpez.net*
// ==/UserScript==

(function() {
    var allPRE = document.getElementsByTagName("PRE");
    for (var i=0; i<allPRE.length; i++) {
        if (allPRE[i].className=="alt2") {
            var div = allPRE[i].getElementsByTagName("div")[0];
            div.style.background="#E1E4F2 url('http://www.saint-boni.be/atelier/perso/500.png') left top repeat-y";
            div.style.paddingLeft="45px"
        }
    }
})();