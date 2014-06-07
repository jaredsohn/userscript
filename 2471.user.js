// RHP Get Pgn or FEN Page
//
// Purpose: Add a look to the tablebase server.
//
// Revision History:
//
// 2005-AUG-10  ouroboros  Initial revision.
//
// ==UserScript==
// @name          RHP Tablebase Server Lookup
// @namespace     http://members.shaw.ca/ouroboros/RHP/
// @description   Add a tablebase lookup link.
// @include       http://www.redhotpawn.com/gameanalysis/pgncutandpaste.php*
// @include       http://www.chessatwork.com/gameanalysis/pgncutandpaste.php*
// @include       http://www.timeforchess.com/gameanalysis/pgncutandpaste.php*
// @include       http://www.redhotchess.com/gameanalysis/pgncutandpaste.php*
// ==/UserScript==

var tablebaseServer = 'http://mx2.lokasoft.com/tbweb/tbweb2.asp?feninp=';
var inputTags = document.getElementsByTagName('input');
var fen = inputTags[0];

var newElement;

if (fen.value != '') {
   newElement = document.createElement('br');
   fen.parentNode.appendChild(newElement);

   newElement = document.createElement('a');
   newElement.setAttribute('href', tablebaseServer + escape(fen.value));
   newElement.innerHTML = 'Tablebase Lookup';
   fen.parentNode.appendChild(newElement);
}
