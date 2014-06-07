// more maxim.us - del.icio.us resizer
//
// Resizes del.icio.us extension post window to a useable size.
//
// This is a modified version of del.icio.us maxim.us by Jeremy Price http://forestfortrees.edublogs.edu/
// Original script at http://userscripts.org/scripts/show/2025
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.5 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "del.icio.us more maxim.us", and click Uninstall.
//
// ==UserScript==
// @name          del.icio.us more maxim.us
// @namespace     http://engtech.wordpress.com
// @description   Widens the input fields on the del.icio.us tag extension to 800x600.
// @include       http://del.icio.us/*
// ==/UserScript==

(function() {
  // If we're in the del.icio.us tag extension pop-up window then resize it
  if (window.innerWidth < 800) {
    window.innerWidth = 800;
  }
  if (window.innerHeight < 600) {
    window.innerHeight = 600;
  }
  var allTableCells, thisTableCell;
  allTableCells = document.getElementsByTagName('td');
  for (var i = 0; i < allTableCells.length; i++) {
    thisTableCell = allTableCells[i];
    if (thisTableCell.innerHTML == " space separated" || thisTableCell.innerHTML == " optional" || thisTableCell.innerHTML == " 		") {
      thisTableCell.parentNode.removeChild(thisTableCell);
    }
  }
  var windowWidth = window.innerWidth;
  var newFieldWidth = windowWidth-130;
  var newFieldStyle = "width:" + newFieldWidth + "px;";
  var allInputs, thisInput;
  allInputs = document.getElementsByTagName('input');
  for (var i = 0; i < allInputs.length; i++) {
    thisInput = allInputs[i];
    if (thisInput.id == "tags" || thisInput.name == "extended" || thisInput.name == "description" || thisInput.name == "url") {
      thisInput.setAttribute("style", newFieldStyle);
    }
  }

  allInputs = document.getElementsByTagName('textarea');
  for (var i = 0; i < allInputs.length; i++) {
    thisInput = allInputs[i];
    if (thisInput.name == "notes") {
      thisInput.setAttribute("style", newFieldStyle);
      thisInput.rows = 4;
    }
  }

  /*var tagField = document.getElementById("tags");
    var extendedField = document.getElementByName("extended");
    alert(extendedField.value);
    tagField.setAttribute("style", newFieldStyle);*/
 })();
