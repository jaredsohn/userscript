// RHP Game Page
//
// Purpose: Adds some more functionality to the active game page.
//
// Revision History:
//
// 2005-AUG-10  ouroboros  Initial revision.  Adds 'Get PGN/FEN' link and
//                         'Search games between players' link.
//
// ==UserScript==
// @name          RHP Game Page
// @namespace     http://members.shaw.ca/ouroboros/RHP/
// @description   Enhance the active game page.
// @include       http://www.redhotpawn.com/core/playchess.php*
// @include       http://www.chessatwork.com/core/playchess.php*
// @include       http://www.timeforchess.com/core/playchess.php*
// @include       http://www.redhotchess.com/core/playchess.php*
// ==/UserScript==

var pgnUrl = '/gameanalysis/pgncutandpaste.php?gameid=';
var linkImg = '/img/bllt/link.gif';
var searchUrl = '/core/viewpublicgames.php?showgamescode=A';

pgnfen();
search();

// Add 'Get PGN/FEN' link.

function pgnfen() {
   var elements, thisElement, newElement, gameid;

   elements = document.evaluate(
      "//a[starts-with(@href, '/gameanalysis/boardprintable.php?gameid')]",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

   if (elements.snapshotLength > 0) {
      gameid = document.URL.substring(document.URL.indexOf('gameid=') + 7,
                                      document.URL.length);

      thisElement = elements.snapshotItem(0);

      newElement = document.createElement('a');
      newElement.setAttribute('href', pgnUrl + gameid);
      newElement.innerHTML = 'Get PGN/FEN';
      thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);

      newElement = document.createTextNode(' ');
      thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);

      newElement = document.createElement('img');
      newElement.setAttribute('src', linkImg);
      thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);

      newElement = document.createTextNode(' ');
      thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);
   }

   return true;
}

// Search for games with both these players.

function search() {
   var players, thisElement, container;
   var nick = new Array(2);

   players = document.evaluate(
      "//a[starts-with(@href, '/profile/playerprofile.php?uid')]",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

   for (var i = 0 ; i < players.snapshotLength ; i++) {
      thisElement = players.snapshotItem(i);
      nick[i] = thisElement.innerHTML;
      container = thisElement.parentNode.parentNode;
   }

   newElement = document.createElement('br');
   container.appendChild(newElement);

   newElement = document.createElement('a');
   newElement.setAttribute('href', searchUrl + '&p1name=' + nick[0] +
                                   '&p2name=' + nick[1]);
   newElement.innerHTML = 'Search games between players';
   container.appendChild(newElement);

   return true;
}
