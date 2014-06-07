// ==UserScript==
// @name           Hide Banner
// @description    Hide banner gladiatus.fr
// @namespace      Hide banner
// @include     http://www.s*.gladiatus.fr/game/index.php?mod=*
// @version     1.0
// ==/UserScript==

if(document.getElementById("banner_top").style.display == "") {
    document.getElementById("banner_top").click();
}

