// ==UserScript==
// @name           The Pirate Bay Hide Bogus User Torrents
// @namespace      thepiratebay
// @description    Hides users that are known to upload bogus torrents.
// @include        http*://thepiratebay.*/search/*
// @include        http*://thepiratebay.*/browse/*
// @include        http*://thepiratebay.*/top/*
// @version        0.0.4
// ==/UserScript==

var douchebagArray = [
'cv_otaku',
'NLUPPER002'
]
var regex = new RegExp(douchebagArray.join("|"), "im");
var results = document.getElementById('searchResult');
if (results) {
  var colLength = results.rows[0].cells.length;
  var rowCount = results.rows.length;
  for (i = results.rows.length - 1; i >= 1; i--) {
    if (regex.test(results.rows[i].cells[1].innerHTML)) {
      results.deleteRow(i);
    }
  }
}
