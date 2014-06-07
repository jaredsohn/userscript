// ==UserScript==
// @name           Revision3 wget Links
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Rewrite download links to use wget helper script. More info at http://domnit.org/2007/09/wget
// @include        http://revision3.com/*
// @include        http://www.revision3.com/*
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-09-24 - Made

*/

for(var c = 0, link; link = document.links[c]; c++)
  if(/\.(mov|m4v|wmv|avi|theora\.ogg)$/.test(link.href))
    link.href = 'data:application/x-wget-url,' + link.href;