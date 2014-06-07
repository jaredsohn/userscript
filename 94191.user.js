// ==UserScript==
// @name          Cleaner Blight of the Immortals
// @namespace     http://blight.ironhelmet.com/game
// @description   Removes the ads from the side of Blight of the Immortals
// @include       http://blight.ironhelmet.com/game/*
// ==/UserScript==
window.setTimeout(function() {
  try {
    var table = document.body.getElementsByTagName("table")[0],
      rows = table.getElementsByTagName("td"),
      adRow = rows[1];
    adRow.parentNode.removeChild(adRow);
  }
  catch (ex) {
    //alert("Exception: " + ex);
  }
}, 0);