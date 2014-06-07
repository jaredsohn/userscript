// ==UserScript==
// @name           Neopets battle
// @namespace      Neopets battle
// @description    Neopets battle

// ==/UserScript==
rand1 = Math.random()*2000;
rand2 = rand1 + Math.random()*2000;
rand3 = rand2 + Math.random()*2000;
rand4 = rand3 + Math.random()*2000;
setTimeout(function(){activate_equip(1);}, rand1);
setTimeout(function(){activate_equip(2);}, rand2);
setTimeout(function(){document.fightform.selectmove.selectedIndex = 1;}, rand3);
setTimeout(function(){document.fightform.submit();}, rand4);