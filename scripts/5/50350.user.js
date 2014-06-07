// ==UserScript==
// @name           Clear GLB Offer Default Team
// @namespace      GLB
// @description    Clears the default team from the make offer page in GLB, so you don't make offers from the wrong team.
// @include        http://goallineblitz.com/game/make_offer.pl?player_id=* 
// @include        http://goallineblitz.com/game/trade.pl*
// ==/UserScript==

window.setTimeout( function() 
{

function addToList(listField, newText, newValue) {
      var len = listField.length++; 
      listField.options[len].value = newValue;
      listField.options[len].text = newText;
      listField.selectedIndex = len; 
}

var droplist= document.getElementById('team_id');

if (droplist) {
   addToList(droplist, '---SELECT TEAM---', '0');
}

var tradedroplist= document.getElementById('my_team_select');

if (tradedroplist) {
   addToList(tradedroplist, '---SELECT TEAM---', '0');
}


},100);