// Neopets - Low Quality Games
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Low Quality Games
// @namespace      http://userscripts.org/users/22349
// @description    V 1.00 - Sets the default game quality to low. Changes the game link for the New Game Challenge to the low quality version.
// @include        http://neopets.com/games/play.phtml?game_id=*
// @include        http://www.neopets.com/games/play.phtml?game_id=*
// @include        http://neopets.com/games/new-game-challenge/*
// @include        http://www.neopets.com/games/new-game-challenge/*
// @version        1.00
// @updated        2009.11.08 
// ==/UserScript==

if (document.getElementsByName('qual_dd')[0]){document.getElementsByName('qual_dd')[0].options[0].selected = true;}

if (document.location.href.match('games/new-game-challenge')){
  allDivs = document.evaluate('//div[@class="content"]//a[@onclick]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var x = 0, thisDiv; thisDiv = allDivs.snapshotItem(x); x++){
    thisDiv.removeAttribute('onclick');
    thisDiv.setAttribute('href', thisDiv.getAttribute('href').replace(/quality=high/gi, 'quality=low'));
  }
}