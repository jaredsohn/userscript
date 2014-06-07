// Neopets - Needed Trophy Tables
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Needed Trophy Tables
// @namespace      http://userscripts.org/users/22349
// @description    V 1.01 - Changes the links of games you have a Gold trophy in to gray.
// @include        http://neopets.com/gamescores.phtml
// @include        http://www.neopets.com/gamescores.phtml
// @include        http://neopets.com/prizes.phtml
// @include        http://www.neopets.com/prizes.phtml
// @version        1.01
// @updated        2009.07.22 
// ==/UserScript==
(function(){
  if (document.location.href.match('gamescores.phtml')){
    gameids = GM_getValue('graygames', '').split(',');
    GM_log('You have '+gameids.length+' high score tables marked.');
    allTables = document.evaluate('//table[@border="1"][@cellpadding="3"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    newRow = allTables.snapshotItem(0).insertRow(0);
    ac = newRow.insertCell(0);
    ac.align = 'center';
    ac.innerHTML = '<a href="gamescores.phtml?game_id=532"><b>Bouncy Supreme</b></a>';
    bc = newRow.insertCell(1);
    bc.align = 'center';
    bc.innerHTML = '<a href="gamescores.phtml?game_id=359"><b>Jelly Blobs of Doom</b></a>';

    allLinks = document.evaluate('//table[@border="1"][@cellpadding="3"]//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var x = 0, thisLink; thisLink = allLinks.snapshotItem(x); x++){
      thisLinkId = thisLink.href.match(/=(\d+)$/)[1];
      for (y in gameids){
        if (thisLinkId == gameids[y]){
          thisLink.innerHTML = '<font color="#A9A9A9">'+thisLink.innerHTML+'</font>';
          gameids.splice(y,1);
          break;
        }
      }
    }
  }
  else if (document.location.href.match('prizes.phtml')){
    trophies = '';
    allTrophies = document.evaluate('//table[@width="600"]//img',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var x = 0, thisTrophy; thisTrophy = allTrophies.snapshotItem(x); x++){
      if (thisTrophy.src.match('_1.gif')){
        trophies += thisTrophy.src.match(/\/(\d+)_1\.gif/)[1]+',';
      }
    }
    GM_setValue('graygames', trophies);
  }
})();
