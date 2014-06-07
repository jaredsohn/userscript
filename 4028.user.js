// ==UserScript==
// @name          New York Times permalinker
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Get the permanent, no-login, linkable NY Times article
// @include       http://www.nytimes.com/glogin?URI=*
// ==/UserScript==

/*

(C) 2006-7 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-04-15 - NYT apparently reverted their gatekeeper, so this script is
             reverted too. bzr revision 20 has the qEscape stuff that was put
             in on 2007-03-28.
2007-03-28 - Script stopped working after NYTimes "improved" their gatekeeper
             code. Hacked around that. Script was completely remade.
2006-02-17 - Started

*/

location.href = 'http://nytimes.blogspace.com/genlink?redirect=1&q=' + location.href.match(/URI=([^&]+)/)[1];