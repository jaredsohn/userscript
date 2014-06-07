// ==UserScript==
// @name           tsoya.blogspot -> maxfun
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Redirect old TSOYA blog entries from before the move to maximumfun.org
// @include        http://tsoya.blogspot.com/*
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-07-15 - Created

*/

location.replace(location.href.replace('http://tsoya.blogspot.com/', 'http://www.maximumfun.org/blog/'));