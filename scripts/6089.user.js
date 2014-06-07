// ==UserScript==
// @name          Fallacy Files Frame Fixer
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Make the weird iframe setup behave like real frames
// @include       http://fallacyfiles.org/*
// @include       http://www.fallacyfiles.org/*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-09-04 - Started

*/

GM_addStyle('\
iframe[src="contents.html"] {\
  height: 100%;\
  position: fixed;\
}\
\
iframe[src="contents.html"] + table {\
  margin-left: 30%;\
}\
');