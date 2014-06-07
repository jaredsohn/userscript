// ==UserScript==
// @name           Neopets Gormbal wait 2
// @namespace      neopets
// @description    waits 2 seconds option in gormball
// @include        http://www.neopets.com/space/gormball*
// ==/UserScript==
if (document.body.innerHTML.match('gormball.phtml')) { 
document.getElementsByName("player_backed")[0].options.selectedIndex = 1; // 1 = thysassa, 2 = gargarox, ect..
}
if (document.body.innerHTML.match('gormball2.phtml')) { 
document.getElementsByName("turns_waited")[0].value = "2";
}
