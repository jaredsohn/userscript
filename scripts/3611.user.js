// Show Cell Headers
// version 0.1 BETA!
// 2006-03-21
// by Jim Biancolo
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Show Cell Headers", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Show Cell Headers
// @namespace     http://www.biancolo.com
// @description   When you hover over a table cell, highlight all other cells referenced by its HEADERS attribute.  Cells with bad references are flagged.  You might want to change the value of @include to only include your development environment before installing.
// @include       http://localhost*
// ==/UserScript==

document.addEventListener('mouseover', function(event) {
  if (event.target.tagName.toLowerCase()=='td') {  
    toggleHeaderCells(event.target, 'on');
  }
}, true);

document.addEventListener('mouseout', function(event) {
  if (event.target.tagName.toLowerCase()=='td') {  
    toggleHeaderCells(event.target, 'off');
  }
}, true);

// Note that I originally intended to highlight cells by changing their border,
// but for some reason that didn't work on the pages I was testing (only one
// edge of the border was changed).  So I did the background instead.
function toggleHeaderCells(cell, flag) {
  if (cell.headers != '') {
    var ids = new Array();
    ids = cell.headers.split(/ /);

    if (flag == 'on') {
      for (i=0; i<ids.length; i++) { 
        try {
          var parent = document.getElementById(ids[i]);
          parent.style.background = '#ff6';
          parent.style.color = '#000';
        }
        catch(e) {
          cell.style.background = '#fcc';
        }
      }
    } else {
      for (i=0; i<ids.length; i++) { 
        try {
          var parent = document.getElementById(ids[i]);
          parent.style.background = '';
          parent.style.color = '';
        }
        catch(e) {
          // do nothing
        }
      }
    }
  }
}

