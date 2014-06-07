// ==UserScript==
// @name           FC Remove Ads
// @namespace      local
// @include        http://*fantasticcontraption.com/*
// ==/UserScript==

document.getElementById('topad').style.display = 'none';
var menu = document.getElementById('adleft').childNodes;
for (var i = 0; i < menu.length; ++i) {
  if (menu[i].tagName == 'P') {
    menu[i].style.display = 'none';
  }
}
document.getElementById('adright').style.display = 'none';
document.getElementById('bottombar').style.display = 'none';