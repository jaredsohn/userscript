// Flickr Search for Creative Commons
//
// This script will force all searches on Flickr to return creative commons
// images. This is *very* useful if you want to use flickr for finding photos
// to reuse in other projects.
//
// You can further tweak the settings by surfing to http://flickr.com and using your
// Firefox browser menu to select Tools >> GreaseMonkey >> User Scripts Commands
//
// http://InternetDuctTape.com/tools/flickr-always-search-for-creative-commons/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.9 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select this script, and click Uninstall.
//
// ==UserScript==
// @name          Flickr Search for Creative Commons
// @namespace     http://InternetDuctTape.com
// @description   Always search for creative commons photos on Flickr
// @include       http://flickr.com/search/*
// ==/UserScript==

(function() {
  setupConfig();
  // l=cc&ct=0
  if (! location.href.match(/search\/advanced/)) {
    if (! location.href.match(/l=/)) {
      changeSearchURL(false);
    }
  }
 })();

function changeSearchURL (clean_search) {
  var url = location.href;
  if (clean_search) {
    url = url.replace(/&l=(commderiv|cc|comm|deriv)/ig, "");
  }
  if (GM_getValue("comm", false)) {
    if (GM_getValue("deriv", false)) {
      location.replace(url+"&l=commderiv");
    }
    else {
      location.replace(url+"&l=comm");
    }
  }
  else {
    if (GM_getValue("deriv", false)) {
      location.replace(url+"&l=deriv");
    }
    else {
      location.replace(url+"&l=cc");
    }
  }
}

function setupConfig () {
  GM_registerMenuCommand('Display settings', displaySettings);
  GM_registerMenuCommand('[OPTION 1] Limit search to photos that can be used commercially', setCommTrue);
  GM_registerMenuCommand('[OPTION 1] Do not limit search to photos that can be used commercially', setCommFalse);
  GM_registerMenuCommand('[OPTION 2] Limit search to photos that can be modified, adapted or built upon', setDerivTrue);
  GM_registerMenuCommand('[OPTION 2] Do not limit search to photos that can be modified, adapted, or built upon', setDerivFalse);
}

function setCommTrue(e) {
  GM_setValue("comm", true);
  changeSearchURL(true);
}

function setCommFalse(e) {
  GM_setValue("comm", false);
  changeSearchURL(true);
}

function setDerivTrue(e) {
  GM_setValue("deriv", true);
  changeSearchURL(true);
}

function setDerivFalse(e) {
  GM_setValue("deriv", false);
  changeSearchURL(true);
}


function displaySettings(e) {
  var text = "";
  if (GM_getValue("comm")) {
    text += "Limiting search to photos that can be used commercially\n";
  }
  if (GM_getValue("deriv")) {
    text += "Limiting search to photos that can be modified, adapted or built upon\n";
  }
  if (text == "") {
    text += "Searching for any CC-licensed photos (may not be allowed to be used commercially or modified)\n";
  }
  alert(text);
}
