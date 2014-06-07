// ==UserScript==
// @name           TL Huk
// @namespace      all credit to 'visual77' http://visual77.com/
// @description    Liquid Huk = "Huk"
// @include        http://www.teamliquid.net/forum/viewmessage.php*
// ==/UserScript==

(function() {
    document.body.innerHTML = document.body.innerHTML.replace(/Liquid'Huk/ig, "Huk");
}());