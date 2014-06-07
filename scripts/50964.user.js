// Chessworld force to XTable
// force tournament pages to jump to crosstables page
// released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Chessworld force to XTable", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Chessworld force to XTable
// @namespace     http://bit.ly/djackmanson
// @description   jump directly to crosstable page
// @include       http://www.chessworld.net/chessclubs/tournamentviewone.asp?TournamentID=*
// @exclude       http://www.chessworld.net/chessclubs/tournamentviewone.asp?TournamentID=*ViewPairings*

// ==/UserScript==

window.location.href = window.location.href += '&ViewPairings=1'; 