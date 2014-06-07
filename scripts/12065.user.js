// ==UserScript==
// @name           Pitchfork Redirect
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Instead of showing the "You are being redirected" message, just redirect
// @include        http://www.pitchforkmedia.com/*
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-09-07 - Made

*/

if(document.body.textContent == 'You are being redirected.')
  location.replace(document.links[0].href);