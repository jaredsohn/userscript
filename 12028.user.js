// ==UserScript==
// @name           New Yorker Single Page
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Loads the article as a single page (i.e. disables pagination)
// @include        http://www.newyorker.com/*
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-09-06 - Made

*/

if(document.getElementById('articlebody') &&
   document.evaluate('//div[@class="pagination"]', document,
                     null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null).singleNodeValue) {
  location.href = 'javascript:location.replace("?currentPage=all")';
}