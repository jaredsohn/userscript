// ==UserScript==
// @name           LWM Arcomage Notify
// @description    alert when anybody join to challenge
// @include        http://www.lordswm.com/tavern.php
// @include        http://www.heroeswm.ru/tavern.php
// 
// ==/UserScript==
//
// ========================================================
var hunt_icon = 'i/top/line/cards.gif';
var all_td_Elements, this_td_Element;

all_td_Elements = document.getElementsByTagName('td');

for (var i = 0; i < all_td_Elements.length; i++) {
  this_td_Element = all_td_Elements[i];
  if(this_td_Element.innerHTML.indexOf(hunt_icon) != -1  ) {
    alert("Arcomage challenge is ready");
    break;
  }
}
