// Poker highlighting
// version 0.2
// 2008-02-4
// created by Mumbles at need-name.com
// Not Copyrighted - do whatever the heck you want with it
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "PokerHilightr", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PokerHilightr
// @namespace     http://need-name.com
// @description   Highlight the names of your favorite poker players on Cardplayer.com
// @include       http://www.cardplayer.com/tournaments/chip_counts/*
// @include       http://www.pokernews.com/live-reporting/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This script borrows heavily from NHL at bbta and is alo dedicated to Cory Doctorow, even though he will not know why.
//
var FAVORITEPLAYERS = [ 'Joe Sebok', 'Gavin Smith', 'Barry Greenstein', 'Chris Moneymaker', 'Daniel Negreanu', 'Joseph Hachem', 
                        'Haralabos Voulgaris', 'Justin Bonomo', 'Mike Matusow', 'Eugene Todd', 'Phil Hellmuth Jr.' ];

var FAVORITECOLOR = '#ff0000';

var allDivs, thisDiv, count;

//alert (document.domain);
if (document.domain == "www.cardplayer.com") 
{
  allDivs = document.evaluate("//a[@href]", document, null, 
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  //alert (allDivs.snapshotLength);
  for (var i = 0; i <allDivs.snapshotLength; i++)
   {
     thisDiv = allDivs.snapshotItem(i);
     var player = thisDiv.textContent;
     if ( FAVORITEPLAYERS.indexOf(player) > -1 )
     {
       //alert (player);
       thisDiv.style.backgroundColor = FAVORITECOLOR;
     }
   }
}

if (document.domain == "www.pokernews.com") 
{
  allDivs = document.evaluate("//a[@href]", document, null, 
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  //alert (allDivs.snapshotLength);
  for (var i = 0; i <allDivs.snapshotLength; i++)
   {
     thisDiv = allDivs.snapshotItem(i);
     var player = thisDiv.textContent;
     if ( FAVORITEPLAYERS.indexOf(player) > -1 )
     {
       //alert (player);
       thisDiv.style.backgroundColor = FAVORITECOLOR;
     }
   }
}





//
// ChangeLog
// 2008-01-30 - 0.1 - JTE - First attempt (after 40 ish goofs)
// 2008-2-4 - 0.2 - JTE - Added pokernews support
