// ==UserScript==
// @name           Yahoo Fantasy Basketball Max Games Adjustment
// @namespace      http://userscripts.org/users/Trecetratops/maxgamesadjusment
// @description    Adjustment of -14 games needed to calculate actual projections in Rotisserie leagues.
// @include        http://basketball.fantasysports.yahoo.com/nba/*

// @license        Creative Commons Reconocimiento-No comercial-Sin obras derivadas 3.0
//                 España License
// @author         Trecetratops
// @version        0.1
// @date           2012-Jan-03

// ==/UserScript==
/*
   Yahoo hasn't adjusted actual games after lockout so projections are based on 80 games instead of 66. 

   Change log:

      2012-Jan-03  Initial version. 

*/
(function() {

  var totElmnts = 0, GAP = 14, mult = 0, projGames = 0, diffGames = 0, maxGames = 0;
  var pos, emClass, emSign, tdsHtml;
  
  allElements = document.evaluate(
    "//*[contains(@class, 'position')]/..",
    document.getElementById('positioncaps'),
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  totElmnts = allElements.snapshotLength;

    // burn the first row; they are headers, not games per position
  for (var i = 1; i < totElmnts ; i++) {
     thisElement = allElements.snapshotItem(i);
     tds = thisElement.getElementsByTagName('td');
     pos = tds[0].innerHTML;

     if (pos == 'C' || pos == 'Util') {
       mult = 2;
     }
     else {
       mult = 1;
     }

     maxGames = parseInt(tds[4].innerHTML);

     if ( parseInt(tds[1].innerHTML) < maxGames ) {

        projGames = parseInt(tds[3].innerHTML) - (GAP*mult);
        diffGames = maxGames - projGames;

        if ( diffGames > 0 ){
          emClass = 'positive';
          emSign = '+';
        }
        else if ( diffGames == 0 ){
          emClass = 'positive';
          emSign = '';
        }
        else {
         emClass = 'negative';
         emSign = '';
        }
        tdsHtml = String(projGames) + '&nbsp;&nbsp;(<em class="' + emClass + '">' + emSign + String(diffGames) + '</em>)';
    }
    else {
       tdsHtml = 'N/A';
    }

    tds[3].innerHTML = tdsHtml;
  }
})();
