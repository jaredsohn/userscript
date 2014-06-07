// ==UserScript==
// @name           No Adds
// @namespace      noplace.fictitional.com
// @description    AE ad removal tool
// @include        http://ceti.astroempires.com/*
// ==/UserScript==

var version = "0.1";

removeAds();
function removeAds() {
  var allTables, theAdTable;
  allTables = document.getElementsByTagName('table');
  for (var i = 0; i < allTables.length; i++) {
    if (allTables[i].innerHTML.indexOf("Remove advertising") != -1) {
      theAdTable = allTables[i];
      theAdTable.parentNode.removeChild(theAdTable);
    }
  }
}

