// ==UserScript==
// @name        MTurk Best Case Scenario Calculator
// @namespace   localhost
// @description Shows what your approval rate would be in best case scenario (all pending approved)
// @include     https://www.mturk.com/mturk/dashboard
// @version     2.1
// @downloadURL https://userscripts.org/scripts/source/145810.user.js
// @updateURL   https://userscripts.org/scripts/source/145810.user.js
// @grant       none
// ==/UserScript==

//
// 2012-09-14 First public release by ThirdClassInternationalMasterTurker
//
// 2012-10-06 Added GUI for setting RATE_GOOD and RATE_OK
//            (Click 'Pending (Best Case Scenario)')
//
// 2012-12-02 2.1: Added @downloadURL and @updateURL
//

// --- SETTINGS ------------------------------------------------------- //
var RATE_GOOD = (localStorage['BCS_GOOD']) ? localStorage['BCS_GOOD'] : 99.0;
var RATE_OK   = (localStorage['BCS_OK']) ? localStorage['BCS_OK'] : 95.0;

var COLOUR_GOOD    = 'lightgreen';
var COLOUR_OK      = 'orange';
var COLOUR_BAD     = 'red';

// -------------------------------------------------------------------- //

function config_func()
{
  return function()
  {
    var t = prompt('MTurk Best Case Scenario\nSet your RATE_GOOD and RATE_OK.\nFor example: 99.0;95.0',
                    '' + RATE_GOOD + ';' + RATE_OK);
    if (!t)
      return;

    var rates = t.split(';', 2);
    rates[0] = parseFloat(rates[0]).toFixed(1);
    rates[1] = parseFloat(rates[1]).toFixed(1);
    
    if (rates[0] > 0 && rates[0] <= 100)
      localStorage['BCS_GOOD'] = rates[0];
    if (rates[1] > 0 && rates[1] <= 100)
      localStorage['BCS_OK'] = rates[1];
  };  
}

var rows = document.evaluate('//tr[@class]',
           document,
           null,
           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 

var submitted;
var returned;
var abandoned;
var approved;
var rejected;
var pending;


for (var i=0;i<rows.snapshotLength;i++) {
  var row = rows.snapshotItem(i);

  if (row.cells.length != 3)
    continue;
  if (row.className.match('odd|even') == null) {
    continue;
  }

  if (row.cells[0].textContent.match('\\.\\.\\. Submitted')) {
    submitted = parseInt(row.cells[1].textContent);
  }

  if (row.cells[0].textContent.match('\\.\\.\\. Returned')) {
    returned = parseInt(row.cells[1].textContent);
  }

  if (row.cells[0].textContent.match('\\.\\.\\. Abandoned')) {
    abandoned = parseInt(row.cells[1].textContent);
  }

  if (row.cells[0].textContent.match('\\.\\.\\. Approved')) {
    approved = parseInt(row.cells[1].textContent);
    approved_p = parseFloat(row.cells[2].textContent);

    if (approved_p >= RATE_GOOD) {
      row.cells[2].style.backgroundColor = COLOUR_GOOD;
    }
    else if (approved_p >= RATE_OK) {
      row.cells[2].style.backgroundColor = COLOUR_OK;
    }
    else {
      row.cells[2].style.backgroundColor = COLOUR_BAD;
    }
  }

  if (row.cells[0].textContent.match('\\.\\.\\. Rejected')) {
    rejected = parseInt(row.cells[1].textContent);
  }

  if (row.cells[0].textContent.match('\\.\\.\\. Pending')) {
    pending = parseInt(row.cells[1].textContent);

    row.cells[0].innerHTML += " <small>(Best Case Scenario)</small>";

    if (RATE_GOOD > approved_p) {
      var p = 1.0 - RATE_GOOD/100;
      var x = (rejected-(p*submitted))/p;
      row.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + COLOUR_GOOD + "\">(~" + Math.round(x) + " accepts => " + RATE_GOOD + "%)</span>";
    }
    if (RATE_OK > approved_p) {
      var p = 1.0 - RATE_OK/100;
      var x = (rejected-(p*submitted))/p;
      row.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + COLOUR_OK + "\">(~" + Math.round(x) + " accepts => " + RATE_OK + "%)</span>";
    }

    WCS = ((approved+pending)/(approved+rejected+pending) * 100).toFixed(1);
    row.cells[2].innerHTML = '(' + WCS + '%)';

    if (WCS >= RATE_GOOD) {
      row.cells[2].style.backgroundColor = COLOUR_GOOD;
    }
    else if (WCS >= RATE_OK) {
      row.cells[2].style.backgroundColor = COLOUR_OK;
    }
    else {
      row.cells[2].style.backgroundColor = COLOUR_BAD;
    }
    row.cells[0].addEventListener("click", config_func(), false);
    row.cells[2].addEventListener("click", config_func(), false);
  }
}


