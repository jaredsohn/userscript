// AuctionSearchKit - "Postcodes on Google Maps" User Script
// Version 1.0
// 2009-10-30
// Copyright (c) 2009, Auction Search Kit. All rights reserved.
// Feedback to auctionsearchkit@gmail.com is welcome.
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
// select "Postcodes on Google Maps", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Postcodes on Google Maps
// @namespace     http://www.auctionsearchkit.co.uk
// @description   Show all UK postcodes in the current webpage on a Google Map. Invoked by ALT+CTRL+SHIFT+M or GreaseMonkey menu
// @include       *
// ==/UserScript==

// Constants
var DEBUG_MODE = false;
var CHAR_CODE_A = 65; // The ASCII code for A, which will be the first marker on the map

// Shortcut key combination - change these values if a different shortcut combination is required
var ALT_REQUIRED = true; // True if ALT needs to be held down when invoking the shortcut, otherwise false
var CTRL_REQUIRED = true; // True if CTRL needs to be held down when invoking the shortcut, otherwise false
var SHIFT_REQUIRED = true; // True if SHIFT needs to be held down when invoking the shortcut, otherwise false
var SHORTCUT_KEY = 'm'; // The shortcut key to press

var POSTCODE_REGEXP_STR = '[^A-Z0-9](GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\\s*[0-9][ABD-HJLNP-UW-Z]{2})[^A-Z0-9]';
var GOOGLE_MAP_URL_BASE = 'http://maps.google.co.uk/maps?t=m&f=q';

// If in DEBUG mode and FireBug is installed, define a logging function using the FireBug console
if ((DEBUG_MODE === true) && (unsafeWindow.console)) {
  // Log a variable's value via the Firebug console (if debug mode is turned on)
  function fbLog(name, value) {
    if (DEBUG_MODE === true) {
      switch (typeof value) {
        case 'ftp://ftp.':
          unsafeWindow.console.log(name + ' is undefined');
          break;
        case 'object':
          if (value === null) {
            unsafeWindow.console.log(name + ' is null');
          } else {
            if (value.constructor === Date) {
              unsafeWindow.console.log(name + ' = ' + value);
            } else if (typeof value.length == 'undefined') {
              unsafeWindow.console.log(name + ':');
            } else if (value.length === 0) {
              unsafeWindow.console.log(name + ' is empty (length = 0)');
            } else {
              unsafeWindow.console.log(name + ' (length = ' + value.length + '):');
            }
            unsafeWindow.console.dir(value);
          }
          break;
        case 'string':
          unsafeWindow.console.log(name + ' = "' + value + '"');
          break;
        default:
          unsafeWindow.console.log(name + ' = ' + value);
          break;
      }
    }
  }
} else {
  // Assign a function that does nothing whenever a logging call is made
  function fbLog() {}
}

// Enclose everything in a try...catch block for ease of debugging
try {
  var googleMapUrl = null;
  
  // Get URLs for mapping all post codes on this webpage
  function getMapUrls() {
    // Initialise globals
    var uniquePostcodes = [];
    var markerNum = 0;

    var newPageSource = unsafeWindow.document.documentElement.innerHTML;
    var pageSourceWithoutTags = newPageSource.replace(/(<[^>]*>[\s]*)+/g, ' ');
    
    // Set up a regular expression for matching all possible UK post codes in the page source
    var allPostcodesRegExp = new RegExp(POSTCODE_REGEXP_STR, 'gi');
    var allPostcodeMatches = pageSourceWithoutTags.match(allPostcodesRegExp);
    if (allPostcodeMatches != null) {
      // Set base Google Map URL
      googleMapUrl = GOOGLE_MAP_URL_BASE;

      // Check whether this is the first time the menu command has been invoked. If not, set the start index
      // accordingly
      fbLog('unsafeWindow.PCOGMIndexStart', unsafeWindow.PCOGMIndexStart);
      if (typeof unsafeWindow.PCOGMIndexStart == 'number') {
        var indexStart = unsafeWindow.PCOGMIndexStart;
        if (indexStart >= allPostcodeMatches.length) {
          indexStart = 0;
        }

        // Remove all previous markers from the page
        newPageSource = newPageSource.replace(
              / <strong>\[[A-Z]\]<\/strong>/gi,
              '');
      } else {
        var indexStart = 0;
      }

      // Now loop through each match
      for (var index = indexStart; index < allPostcodeMatches.length; index++) {
        // Convert the postcode to all upper case and remove any whitespace
        var postcode = allPostcodeMatches[index].substring(1, allPostcodeMatches[index].length - 1)
                       .toUpperCase().replace(/\s/g, '');
        postcode = postcode.substring(0, postcode.length - 3) + ' ' + postcode.substring(postcode.length - 3)
        fbLog('postcode', postcode);
        if (typeof uniquePostcodes[postcode] == 'undefined') {
          // Update Google Map URL
          if (markerNum == 0) {
            googleMapUrl += '&saddr=' + postcode;
          } else if (markerNum == 1) {
            googleMapUrl += '&daddr=' + postcode;
          } else {
            googleMapUrl += '+to:' + postcode;
          }

          // Update source code to include bracketed reference(s) to this postcode
          postcodeReplaceRegExp = new RegExp('([^A-Z0-9])(' + postcode.substring(0, postcode.length - 4) + '(\\s*(<[^>]*>\\s*)*)*'
                                             + postcode.substring(postcode.length - 3) + ')([^A-Z0-9])', 'gi');
          newPageSource = newPageSource.replace(
              postcodeReplaceRegExp,
              '$1$2 <strong>[' + String.fromCharCode(CHAR_CODE_A + markerNum) + ']</strong>$5');
          
          // Undo any changes that were in <input> html elements
          newPageSource = newPageSource.replace(
              /(<\s*(input>?|textarea|title>?)[^>]*) <strong>\[[A-Z]\]<\/strong>/gi,
              '$1');

          // Add new post code to the list of unique postcodes
          uniquePostcodes[postcode] = true;
          markerNum++;
          
          // Google Maps only supports up to 25 markers using its "Get Directions" feature
          if (markerNum == 25) {
            index++;
            break;
          }
        }
      }
    
      // If only one unique postcode was found, make the destination the same as the start
      if (markerNum == 1) {
        googleMapUrl += '&daddr=' + postcode;
      }

      // Replace page contents
      unsafeWindow.document.documentElement.innerHTML = newPageSource;
      
      fbLog('googleMapUrl', googleMapUrl);
      fbLog('index', index);
      fbLog('allPostcodeMatches.length', allPostcodeMatches.length);
      
      // Save the next starting index in case there are still any postcodes remaining, 
      unsafeWindow.PCOGMIndexStart = index;
    }
  }

  // Open a new window with a Google map showing all post codes
  function postcodesOnGoogleMap() {
    if ((googleMapUrl == null) || (typeof unsafeWindow.PCOGMIndexStart != 'undefined')) {
      getMapUrls();
    }
    if (googleMapUrl == null) {
      alert('No UK post codes were found in the source of this webpage');
    } else {
      window.open(googleMapUrl, 'googleMapWindow');
    }
  }

  // Handles keypress event
  function onKeyEvent(e) {
    var evt = e || window.event;
    if ((evt.altKey == ALT_REQUIRED) &&
        (evt.ctrlKey == CTRL_REQUIRED) &&
        (evt.shiftKey == SHIFT_REQUIRED) &&
        (evt.charCode == SHORTCUT_KEY.toUpperCase().charCodeAt(0))) {
      postcodesOnGoogleMap();
    }
    return false;
  }
  
  GM_registerMenuCommand('Post codes for this webpage on a Google Map', postcodesOnGoogleMap, 'c');
  document.addEventListener('keypress', onKeyEvent, false);
} catch(err) {
  fbLog('Error', err);
}
