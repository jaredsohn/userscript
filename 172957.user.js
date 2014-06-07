// ==UserScript==
// @name        Newly Listed
// @description Created by Jefferson (http://userscripts.org/users/JeffersonScher)
// @include     http://steamcommunity.com/market/
// @version     1
// ==/UserScript==

function trytryagain(){
  $('tabRecentSellListings').click();
  $('tabRecentSellListings').scrollIntoView();
  if ($('tabRecentSellListings').className.indexOf("inactive") > -1) window.setTimeout(trytryagain, 250);
}
trytryagain();