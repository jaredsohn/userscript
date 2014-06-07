// ==UserScript==
// @name        MTurk Dashboard HIT Status links
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker
// @description Adds quick links to rejected and pending hits
// @include     https://www.mturk.com/mturk/dashboard
// @version     1.1
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/145118.user.js
// @updateURL   https://userscripts.org/scripts/source/145118.user.js
// ==/UserScript==

//
// 2012-09-07 First public release by ThirdClassInternationalMasterTurker
//
// 2012-12-02 1.1 Added @downloadURL and @updateURL
//

// --- SETTINGS ------------------------------------------------------- //
var USE_COLOURS = true;
var USE_PENDING_LIMITS = true;

var LIMIT_GOOD = 0;
var LIMIT_OK   = 1000;

var COLOUR_GOOD_ODD    = '#44DD44';
var COLOUR_GOOD_EVEN   = '#88EE88';
var COLOUR_OK_ODD      = '#FFFF66';
var COLOUR_OK_EVEN     = '#FFFFAA';
var COLOUR_BAD_ODD     = '#FF5555';
var COLOUR_BAD_EVEN    = '#FF8888';

// -------------------------------------------------------------------- //

var rows = document.evaluate('//tr[@class]',
           document,
           null,
           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i=0;i<rows.snapshotLength;i++) {
  var row = rows.snapshotItem(i);

  if (row.cells.length != 6)
    continue;
  if (row.className.match('odd|even') == null) {
    continue;
  }

  var odd = row.className.match('odd');
  var approved = parseInt(row.cells[2].innerHTML);
  var rejected = parseInt(row.cells[3].innerHTML);
  var pending  = parseInt(row.cells[4].innerHTML);
  //var earnings = row.cells[5].childNodes[0].innerHTML;
  //var dollars = parseFloat(earnings.slice(earnings.search('\\$')+1));

  if (approved > 0) {
    row.cells[2].innerHTML = '<a href="' + row.cells[0].childNodes[1].href + '&sortType=Approved">' + approved + '</a>';
  }  
  if (rejected > 0) {
    row.cells[3].innerHTML = '<a href="' + row.cells[0].childNodes[1].href + '&sortType=Rejected">' + rejected + '</a>';
  }
  if (pending > 0) {
    row.cells[4].innerHTML = '<a href="' + row.cells[0].childNodes[1].href + '&sortType=Pending">' + pending + '</a>';
  }

  if (USE_COLOURS) {
    if (pending <= LIMIT_GOOD) {
      row.cells[4].style.backgroundColor = (odd)?COLOUR_GOOD_ODD:COLOUR_GOOD_EVEN;
    }
    else if (pending <= LIMIT_OK) {
      row.cells[4].style.backgroundColor = (odd)?COLOUR_OK_ODD:COLOUR_OK_EVEN;
    }
    else {
      row.cells[4].style.backgroundColor = (odd)?COLOUR_BAD_ODD:COLOUR_BAD_EVEN;
    }

    if (rejected == 0) {
      row.cells[3].style.backgroundColor = (odd)?COLOUR_GOOD_ODD:COLOUR_GOOD_EVEN;
    }
    else {
      row.cells[3].style.backgroundColor = (odd)?COLOUR_BAD_ODD:COLOUR_BAD_EVEN;
    }
  }
}



