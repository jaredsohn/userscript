//  Copyright (C) 2007  Daniel Dawson
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You can download a copy of the GNU General Public License at
//  http://www.fsf.org/licensing/licenses/gpl.html or get a free printed
//  copy by writing to the Free Software Foundation, Inc., 51 Franklin
//  Street, Fifth Floor, Boston, MA 02110-1301, USA.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
// 
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script. A dialog should pop up
// asking you to confirm you really want to install the script. Click
// "install", and that's it; the next page you visit will be modified by
// the script (if it applies).
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "hzportal account client-side table sort", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           hzportal account client-side table sort
// @namespace      http://www.icehouse.net/ddawson/
// @description    Replaces column-sort links in Horizon Information Portal (library catalog software) pages by client-side sorting code.
// @exclude        *submenu=holds*
// ==/UserScript==

// NOTE: Since there is no general way to match HIP sites by URL, you must add
// an appropriate include pattern for your library's catalog system. Something
// like: http://your.library's.hip.server/ipac20/ipac.jsp*menu=account*

// TODO: handle holds submenu properly! Since it has two tables, I'll have to
// redo the code. And I don't have any holds right now. Of course, if anyone
// wants to help out, contact me at ddawson at icehouse dot net.

(function () {
  var match = /&submenu=([^&]+)/.exec(document.location.href);
  if (!match || !match[1]) return;
  var submenu = match[1];
  var itemTBody = document.evaluate(
    '//table/tbody[tr/td/a[contains(@href,"&sortby=")]]',
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!itemTBody) return;
  
  const NUMERIC_SORT = 0, DATE_SORT = 1, DOLLARS_SORT = 2, LEXICAL_SORT = 3,
    TITLE_SORT = 4;
  const sortKeyMap = {
    'numrenewals': NUMERIC_SORT,
    'ckodate': DATE_SORT,
    'duedate': DATE_SORT,
    'amount': DOLLARS_SORT,
    'sorttitle': TITLE_SORT,
    'reason': LEXICAL_SORT
  };
  
  var curHost = document.location.host;
  var curSortKey =
    GM_getValue(curHost + '/' + submenu + '.sortkey', undefined),
    curSortReverse = GM_getValue(curHost + '/' + submenu + '.reverse', false),
    curSortColIdx;
  
  function numberCompare (a, b) {
    function normalizeNumber (cell) {
      var str = cell.firstChild.textContent;
      return Number(str);
    }
    
    return normalizeNumber(a) - normalizeNumber(b);
  }
  
  function dateCompare (a, b) {
    function normalizeDate (cell) {
      var str = cell.firstChild.textContent;
      var parts = str.split('/');
      return parts[2] + parts[0] + parts[1];
    }
    var na = normalizeDate(a), nb = normalizeDate(b);
    if (na < nb)
      return -1;
    else if (na > nb)
      return 1;
    else
      return 0;
  }
  
  function dollarsCompare (a, b) {
    function normalizeDollars (cell) {
      var dac = cell.firstChild.textContent.substring(1).split('.');
      return Number(dac[0]+dac[1]);
    }
    
    return normalizeDollars(a) - normalizeDollars(b);
  }
  
  function lexicalCompare (a, b) {
    function normalizeString (cell) {
      return cell.firstChild.textContent.toLowerCase();
    }
    
    var na = normalizeString(a), nb = normalizeString(b);
    if (na < nb)
      return -1;
    else if (na > nb)
      return 1;
    else
      return 0;
  }
  
  function titleCompare (a, b) {
    function normalizeTitle (cell) {
      var fc = cell.firstChild, tn = fc.tagName.toLowerCase(), str = null;
      if (tn == 'table')
	str = fc.rows[0].cells[0].firstChild.textContent;
      else if (tn == 'a')
	str = fc.firstChild.textContent;
      else {
	GM_log('Unexpected structure in cell during normalizeTitle()');
	return 0;
      }
      
      str = str.replace(String.fromCharCode(0xA0), ' ');
      var words = str.toLowerCase().split(' ');
      if (words[0] == 'the')
	words.push(words.shift());
      return words;
    }
    
    var na = normalizeTitle(a), nb = normalizeTitle(b);
    for (var i = 0; i < na.length && i < nb.length; i++) {
      if (na[i] < nb[i])
	return -1;
      else if (na[i] > nb[i])
	return 1;
    }
    if (na.length < nb.length) {
      return -1;
    } else if (na.length > nb.length) {
      return 1;
    } else
      return (na.length < nb.length ? -1 : na.length > nb.length ? 1 : 0);
  }
  
  const comparatorMap = [
    // Sorry, can't use symbolic names for keys (would be treated as property
    // names).
    numberCompare,
    dateCompare,
    dollarsCompare,
    lexicalCompare,
    titleCompare
  ];
  
  function sortRows (compareCol) {
    if (curSortColIdx != undefined && curSortColIdx == compareCol.idx)
      curSortReverse = !curSortReverse;
    else
      curSortReverse = false;
    curSortColIdx = compareCol.idx;
    
    for (var rowList = [], rows = itemTBody.rows, i = 1; i < rows.length; i++)
      rowList.push(rows[i]);
    for each (var row in rowList) itemTBody.removeChild(row);
    rowList.sort(
      function (a, b) {
	var cellA = a.cells[compareCol.idx],
	  cellB = b.cells[compareCol.idx];
	if (curSortReverse) {
	  var t = cellA;
	  cellA = cellB, cellB = t;
	}
	
	var aEmpty = cellA.childNodes.length == 0,
	  bEmpty = cellB.childNodes.length == 0;
	if (aEmpty && !bEmpty)
	  return -1;
	else if (!aEmpty && bEmpty)
	  return 1;
	else if (aEmpty && bEmpty)
	  return 0;
	else
	  return compareCol.comparator(cellA, cellB);
      });
    for each (var n in rowList) itemTBody.appendChild(n);
  }
  
  var hdrCells = itemTBody.rows[0].cells;
  var sortKeyIdxs = new Object();
  for (var i = 0; i < hdrCells.length; i++) {
    var cont = hdrCells[i].firstChild;
    if (cont.tagName.toLowerCase() == 'a') {
      var match = /&sortby=([^&]+)/.exec(cont.href);
      if (match && match[1] in sortKeyMap) {
	var sortKey = match[1];
	var compareCol = {
	  idx: i,
	  sortKey: sortKey,
	  comparator: comparatorMap[sortKeyMap[sortKey]]
	};
	sortKeyIdxs[sortKey] = compareCol;
	cont.href = 'javascript:void(0)';
	cont.addEventListener(
	  'click',
	  (function (compareCol) {  // Create unique binding for this closure.
	    return function () {
	      sortRows(compareCol);
	      GM_setValue(curHost + '/' + submenu + '.sortkey',
			  compareCol.sortKey);
	      GM_setValue(curHost + '/' + submenu + '.reverse',
			  curSortReverse);
	    };
	  })(compareCol),
	  false);
      }
    }
  }
  
  if (curSortKey) sortRows(sortKeyIdxs[curSortKey]);
})();
