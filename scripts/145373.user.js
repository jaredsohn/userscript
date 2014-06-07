// ==UserScript==
// @name        MTurk Dashboard Change Notifier
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker
// @description Shows changes in submitted HITs, bonuses and earnings since last page load
// @include     https://www.mturk.com/mturk/dashboard
// @version     1.1
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/145373.user.js
// @updateURL   https://userscripts.org/scripts/source/145373.user.js
// ==/UserScript==

//
// 2012-09-09 First public release by ThirdClassInternationalMasterTurker
//
// 2012-09-20 1.0 First vorking version
//
// 2012-12-02 1.1 Added @downloadURL and @updateURL
//
  
function to_fixed(str) {
  str = str.slice(1).replace(',', '');
  return parseFloat(str).toFixed(2);
}

var rows = document.evaluate('//tr[@class]',
           document,
           null,
           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

if (localStorage['prev_approved'] === undefined)
  prev_approved = "$0";
else
  prev_approved  = localStorage.getItem('prev_approved');

if (localStorage['prev_bonuses'] === undefined)
  prev_bonuses = "$0";
else
  prev_bonuses   = localStorage.getItem('prev_bonuses');

if (localStorage['prev_total'] === undefined)
  prev_total = "$0";
else
  prev_total     = localStorage.getItem('prev_total');

if (localStorage['prev_submitted'] === undefined)
  prev_submitted = 0;
else
  prev_submitted = parseInt(localStorage.getItem('prev_submitted'));

for (var i=0;i<rows.snapshotLength;i++) {
  var row = rows.snapshotItem(i);

  if (row.cells.length == 2) {
    if (row.className.match('odd|even') == null) {
      continue;
    }

    if (row.cells[0].textContent.match('Approved HITs')) {
      var new_approved = row.cells[1].childNodes[0].textContent;
      if (new_approved != prev_approved) {
        row.cells[0].innerHTML += "<span style=\"color:grey;float:right;\">+ $" + (to_fixed(new_approved) - to_fixed(prev_approved)).toFixed(2) + "</span>";
        localStorage.setItem('prev_approved', new_approved);
      }
    }

    if (row.cells[0].textContent.match('Bonuses')) {
      var new_bonuses = row.cells[1].childNodes[0].textContent;
      if (new_bonuses != prev_bonuses) {
        row.cells[0].innerHTML += "<span style=\"color:grey;float:right;\">+ $" + (to_fixed(new_bonuses) - to_fixed(prev_bonuses)).toFixed(2) + "</span>";
        localStorage.setItem('prev_bonuses', new_bonuses);
      }
    }

    if (row.cells[0].textContent.match('Total Earnings')) {
      new_total = row.cells[1].childNodes[0].textContent;
      if (new_total != prev_total) {
        row.cells[0].innerHTML += "<span style=\"color:grey;float:right;\">+ $" + (to_fixed(new_total) - to_fixed(prev_total)).toFixed(2) + "</span>";
        localStorage.setItem('prev_total', new_total);
      }
    }
  }
  if (row.cells.length == 6) {
    if (row.className.match('odd|even') == null) {
      continue;
    }
    if (row.cells[0].textContent.match('Today')) {
      var new_submitted = parseInt(row.cells[1].textContent);
      if (new_submitted <= prev_submitted) {
        localStorage.setItem('prev_submitted', new_submitted);
      }
      else if (new_submitted > prev_submitted) {
        row.cells[1].innerHTML = "<span style=\"color:grey;float:left;\">+" + (new_submitted-prev_submitted) + "</span>" + row.cells[1].innerHTML;
        localStorage.setItem('prev_submitted', new_submitted);
      }
    }

  }
}
