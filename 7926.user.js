// GoogleReaderBlockLinks
// version 0.8
// 2007-03-14
// Copyright (c) 2005, Ben Beckwith
// Copyright (c) 2007, Ugo Di Profio
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Reader Block Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Original version by Ben Beckwith
// This script will label the links (0-9) and allow quick access
// to any link by pressing 'f' and then the corresponding digit.
// This script also allows a page to be loaded in the background by
// pressing 'f' and then 'f'
// The script uses GM_openInTab for the links.
//
// Extended version by Ugo Di Profio
// Added support for handling post with more than 10 links. 
// Pressing keystroke f+l multiple times will move by blocks of
// 10 consecutive links, tagged [0-9] as in the original script.
// At any give time, only a subset of 10 links will be available.
// Blocks will restart from top when the last link in the post is
// reached.
// 
// --------------------------------------------------------------------
// Changelog
// 0.5
// Updated to work with latest Google Reader
// Changed the key presses to require an 'f' first to activate commands
// This is to avoid conflicts with Google Reader's built-in shortcuts
// 0.2
// Update due to google changing their Javascript on the page.
// links are now added after the keystroke 'l'
// Also updated so that 'f' will show the original in a new tab.
// 0.1
// Initial version
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// Changelog by Ugo
// 0.8
// Added support for handling post with more than 10 links. 
// Pressing keystroke f+l multiple times will move by blocks of
// 10 consecutive links, tagged [0-9] as in the original script.
// At any give time, only a subset of 10 links will be available.
// Blocks will restart from top when the last link in the post is
// reached.
// 0.7
// Added secure (https) versions in include directives
// 0.6
// Initial version based on version 0.5 of original code
// --------------------------------------------------------------------

//
// ==UserScript==
// @name          Google Reader Block Links
// @namespace     http://zelig.wordpress.com/greasemonkey
// @description   Adds shortcut keys for links in the body of an item in Google Reader.
// @include       http://reader.google.com/*
// @include       https://reader.google.com/*
// @include	  http://www.google.com/reader/*
// @include	  https://www.google.com/reader/*
// @include	  http://google.com/reader/*
// @include	  https://google.com/reader/*
// ==/UserScript==

var controlkey = 0;
var linkOffset = 0;
var linkNumber = 10;

// Apply the numberical [X] to the links
function LabelLinks() {
  // Get the number of links in the item's body
  var links = document.getElementById("current-entry").getElementsByTagName('INS')[0].getElementsByTagName("A"); 
  // Remove Labels from previous block
  for(var i = 0; (linkOffset>=linkNumber)&&(i < links.length )&&(i<linkNumber); i++){
    linkname = links[(linkOffset-linkNumber)+i].innerHTML;
    links[(linkOffset-linkNumber)+i].innerHTML = linkname.substring(0,linkname.length-4);
  }
  // Check if last block of links have been labeled already, and reset offset.
  if ( linkOffset+linkNumber > links.length ) {
    linkOffset = 0;
  }
  // Loop through the links, adding the identifier
  for(var i = 0; (i < links.length )&&(i<linkNumber); i++){
    links[i+linkOffset].innerHTML += " [" + i + "]";
  }
}

// Function to handle the keypress events
function LinkKey(event) {
  // Get the key pressed in string format
  var k = String.fromCharCode(event.which);
  // Check to see if it fits our range
  if (k >= "0" && k <= "9" && controlkey){
    var link = document.getElementById("current-entry").getElementsByTagName('INS')[0].getElementsByTagName("A")[k]; 
    if(link){
      GM_openInTab(link.href);
    }
    event.stopPropagation();
  }
  if (k == "l" && controlkey){
    LabelLinks();
    linkOffset += linkNumber;
    event.stopPropagation();
  }
  if (k == "f"){
    if(controlkey){
      GM_openInTab(document.getElementById("current-entry").getElementsByTagName("A")[0].href);
      controlkey = 0;
      linkOffset = 0;
    }else{
      controlkey = 1;
    }
  }
  if (k != "f" && controlkey){
    controlkey = 0;
  }
  if ( k == "o" || k == "j" || k == "k" || event.which == 13 ){
    if(controlkey==0){
      linkOffset = 0;
    }
  }
}

// Add listener for to handle the keypress events.
document.addEventListener("keypress", LinkKey, true);

