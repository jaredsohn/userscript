//
// Copyright (c) 2005, Vlajbert
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
// select "FoxNews Ad Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FoxNews Ad Remover
// @namespace     http://vlajbert.blogspot.com/
// @description   Removes the top banner, middle banner and middle right box ads.
// @include       http://www.foxnews.com/*
// @version       0.0.1
// ==/UserScript==

(function() {
  // Banner and Box ads.
  deleteme( document.getElementById( 'topAd'));  
  deleteme( document.getElementById( 'hide0'));  
  deleteme( document.getElementById( 'hide1'));  
  // Story body inline google ad.
  deleteme( getObject( document, "//DIV[IFRAME/@name='google_ads_frame']"));


  function deleteme( obj) {
    try { obj.parentNode.removeChild( obj); }
    catch( e) {}
  }

  function getObject( obj, xpath) {
    try { return document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
    catch( e) { return null; }
  }


})();
