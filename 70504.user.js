// ==UserScript==
// @name           Working XP-Dev ads remover
// @namespace      xpdev
// @description    Removes all ads from xpdev
// @author         Razvan Aurariu
// @version        1.0
// @include        http://www.xp-dev.com/*
// ==/UserScript==

(function() {
    var e = document.getElementsByClassName("center");
    for(i in e) {
        if(e[i].tagName == "DIV") {
            e[i].style.display = "none";
        }
    }

})();