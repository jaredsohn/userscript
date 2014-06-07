// --------------------------------------------------------------------
// GoogleReaderOpenInTab
// version 0.9
// 2008-02-07
//
// Copyright (c) 2008, Robert L Pyron
// Released under GPLv3.
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Reader Quick Links", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Google Reader Open In Tab
// @namespace     http://www.rpyron.com/greasemonkey/
// @description   Define Google Reader 'b' key to open link in new tab.
// @include       https://reader.google.com/*
// @include       http://reader.google.com/*
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       https://google.com/reader/*
// @include       http://google.com/reader/*
// ==/UserScript==
// --------------------------------------------------------------------

function keyHandler(event) {
  // I don't know why this comes out as upper 'B' rather than lower 'b'.
  var key = String.fromCharCode( event.which || event.keyCode );
  switch(key){
    case 'B': // Open link in new tab.
      var entry = document.getElementById('current-entry');
      if(entry) {
        var link = entry.getElementsByTagName('a')[0].href;
        if(link) {
          GM_openInTab(link);
	      return true;
        }
      }
    break;
  }
  return false;
}

// main() invocation 
window.addEventListener('keydown', keyHandler, false);


