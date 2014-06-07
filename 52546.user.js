// ==UserScript==
// @name           Neopets - Games Room Link Fix
// @namespace      http://userscripts.org/users/22349
// @description    V 2.00 - Neopets messed up their game links.  Use this until they fix it.
// @include        http://neopets.com/games/arcade.phtml
// @include        http://www.neopets.com/games/arcade.phtml
// @version        2.00
// @updated        2009.08.11 
// ==/UserScript==

// Featured Game Fix Links
var fg = document.getElementById('featuredGame').getElementsByTagName('img')[0].src.match(/fg_(\d+)\.gif/)[1];
document.getElementById('featured').getElementsByTagName('a')[0].href = '/games/play.phtml?game_id='+fg;
document.getElementById('featuredGame').getElementsByTagName('a')[0].href = '/games/play.phtml?game_id='+fg;
document.getElementById('doubleNP').getElementsByTagName('a')[0].href = '/games/play.phtml?game_id='+fg;
// Showcase Games Fix Links
allDivs = document.evaluate('//div[@class="carouselItem"]/a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var x = 0, thisDiv; thisDiv = allDivs.snapshotItem(x); x++){
  thisDiv.href = '/games/play.phtml?game_id='+thisDiv.innerHTML.match(/icon_(\d+)\.gif/)[1];
}
