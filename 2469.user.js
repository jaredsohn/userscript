// RHP Ratings Calculator
//
// Purpose: Adds the amount of ratings adjustment for a win/loss/draw
//          beside each player's rating.
//
// Limitations: Does not work for provisionally rated players because it
//              it would hit the server too much to get ratings history.
//
// Revision History:
//
// 2005-AUG-10  XanthosNZ  Added redhotchess.com domain.
//
// 2005-AUG-09  ouroboros  Initial revision.
//
// ==UserScript==
// @name          RHP Ratings Calculator
// @namespace     http://members.shaw.ca/ouroboros/RHP/
// @description   Adds the amount of ratings adjustment for a win/loss/draw.
// @include       http://www.redhotpawn.com/core/playchess.php*
// @include       http://www.redhotpawn.com/gameanalysis/boardhistory.php*
// @include       http://www.chessatwork.com/core/playchess.php*
// @include       http://www.chessatwork.com/gameanalysis/boardhistory.php*
// @include       http://www.timeforchess.com/core/playchess.php*
// @include       http://www.timeforchess.com/gameanalysis/boardhistory.php*
// @include       http://www.redhotchess.com/core/playchess.php*
// @include       http://www.redhotchess.com/gameanalysis/boardhistory.php*
// ==/UserScript==

var players, rating, k, p, winExp, myRating, oppRating, win, lose, draw;
var ratingNode = new Array(2);
var ratings = new Array(2);

players = document.evaluate(
   "//a[starts-with(@href, '/profile/playerprofile.php?uid')]",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);

for (var i = 0 ; i < players.snapshotLength ; i++) {
   ratingNode[i] = players.snapshotItem(i).parentNode.nextSibling;
   rating = ratingNode[i].nodeValue;
   ratings[i] = rating.substring(2, rating.length - 1);
}

if (ratingNode.length == 2) {
   for (var i = 0 ; i < ratingNode.length ; i++) {
      var j = (i == 0) ? 1 : 0;

      if (ratings[i].indexOf('p') == -1) {
         myRating = parseInt(ratings[i]);

         if (ratings[j].indexOf('p') == -1) {
            oppRating = parseInt(ratings[j]);
            p = 1;
         }
         else {
            oppRating = parseInt(ratings[j].substring(2, ratings[j].length));
            p = 2;
         }

         if (myRating < 2100)      {  k = 32;  }
         else if (myRating < 2400) {  k = 24;  }
         else                      {  k = 16;  }

         winExp = 1 / (Math.pow(10, ((oppRating - myRating) / 400)) + 1);

         win = Math.round(k * (1 - winExp) / p);
         lose = Math.round(k * (0 - winExp) / p);
         draw = Math.round(k * (0.5 - winExp) / p);

         if (win >= 0) { win = '+' + win; }
         if (lose >= 0) { lose = '+' + lose; }
         if (draw >= 0) { draw = '+' + draw; }

         ratingNode[i].nodeValue += ' ' + win + ' ' + lose + ' ' + draw;
       }
   }
}
else {
   alert("Couldn't calculate ratings adjustments!");
}
