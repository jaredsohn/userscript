// Toronto MLS Google Maps integration
// version 0.1
// 2006-02-07
// Copyright (c) 2006, Jordan Baker
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TorontoMLS Google Maps
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Highlight addresses in TorontoMLS for GoogleMaps.  Short and simple.
// @exclude       *
// @include       http://*.torontomls.net/PublicWeb/CL_PM.asp*
// ==/UserScript==

function mungeAddresses(document) {
  var results = document.evaluate("//tr/td[@colspan=2]/font", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  //alert(results.snapshotLength);
  
  for (var i = 0; i < results.snapshotLength; ++i) {
    result = results.snapshotItem(i);
    txt = result.innerHTML;
    //alert(txt);
    address = txt.replace(/&nbsp;/g, '') + ', Toronto, ON';
    //alert(address);
    googleURL = 'http://maps.google.ca?q=' + escape(address);
    newHTML = '<a target="_blank" href="' + googleURL + '">' + txt + '</a>';
    result.innerHTML = newHTML;
  }

  return "Hello world";
}

// find the tag containing the address
mungeAddresses(document);
// change tag into a link to google



