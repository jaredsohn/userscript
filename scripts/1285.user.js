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
// select "NYPost Ad Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NYPost Ad Remover
// @namespace     http://vlajbert.blogspot.com/
// @description   Removes the story inline ad.
// @include       http://www.nypost.com/*
// ==/UserScript==

(function() {
  //  This is very inefficient but I couldn't find and attributes to hook off of.
  var t = document.getElementsByTagName( 'SCRIPT');
  for( var i=0; i < t.length; ++i) {
    if( t[i].text.match( /OAS_AD\('Middle'\);/)) deleteme( getObject( t[i], 'ancestor::P[1]'));
  }

  function deleteme( obj) {
    try { obj.parentNode.removeChild( obj); }
    catch( e) {}
  }
  
  function getObject( obj, xpath) {
    try { return document.evaluate( xpath, obj, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; } 
    catch( e) { return null; }
  }

})();

