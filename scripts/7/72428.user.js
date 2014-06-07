//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Base Uploader - Remove AE Ad's
// @description   Removes Most Ad's With Free Accounts
// @include       *.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==


//================================================================
//========================REMOVE AE AD'S==========================
//================================================================

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

//================================================================
//===========================END AE AD'S==========================
//================================================================