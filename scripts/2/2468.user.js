// RHP Additions
//
// Purpose: Add functionality to RHP.
//
// Revision History:
//
// 2005-SEP-06  ouroboros  Initial revision.
//
// ==UserScript==
// @name          RHP Additions
// @namespace     http://members.shaw.ca/ouroboros/RHP/
// @description   Add functionality to RHP.
// @include       http://www.redhotpawn.com/*
// @include       http://www.chessatwork.com/*
// @include       http://www.timeforchess.com/*
// @include       http://www.redhotchess.com/*
// ==/UserScript==

var add_before = 'My Inbox';
var menu_items = document.getElementById('myHomeMenu').childNodes;
var myClans = '/clan/index.php?ismyclans=true';

if (menu_items && menu_items.length > 0) {
   for (var i = 0 ; i < menu_items.length ; i++) {
      if (menu_items[i].tagName &&
          menu_items[i].tagName.toLowerCase() == 'a' &&
          menu_items[i].innerHTML == add_before) {
         var newElement = document.createElement('a');
         newElement.setAttribute('href', myClans);
         newElement.setAttribute('class', 'menuItem');
         newElement.innerHTML = 'My Clans';
         menu_items[i].parentNode.insertBefore(newElement, menu_items[i]);
         break;
      }
   }
}
