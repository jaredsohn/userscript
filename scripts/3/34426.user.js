// ==UserScript==
// @name        Google Maps Show Coords Link
// @namespace   http://inge.org.uk/userscripts
// @description Creates a link on Google Maps to show the map centre lat/lon coordinates.
// @include     http://maps.google.tld/*
// @include     http://www.google.tld/local*
// @include     http://www.google.tld/maps*
// @include     https://maps.google.tld/*
// @include     https://www.google.tld/local*
// @include     https://www.google.tld/maps*
// @grant       none
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright   2011-2013, James Inge (http://geo.inge.org.uk/)
// @version     0.10.0
// ==/UserScript==

//  v0.10.0 - Added https URLs to support secure access to Google Maps. Removed Clipboard code and GM_ API calls, for better browser compatibility.
//  v0.9.2 - Fixed for another new Google layout.
//  v0.9.1 - Fixed for new Google layout. Format change now using script variable.
//  v0.9  - Added copy to clipboard function.
//  v0.8.1 - Bugfixes
//  v0.8  - Ability to display in DD.ddd and DD MM.mmm formats.
//  v0.7  - Now works with any top-level domain version of Google Maps
//  v0.2 to 0.6 - Updates to match various minor changes in Google Maps' page structure; No changes in functionality.

(function () {
  'use strict';

  // Set the decDegrees variable below to true for DD.ddd or false for DD MM.mmm
  var decDegrees = false,
  css, mySpan, targetDiv, targets = document.evaluate("//div[@id='topbar-startcol']/div[@class='start-edge-links']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
  showScript = ['function dmm(deg) {var s=(deg<0)?\'-\':\'\';var d = Math.abs(deg);var m = ((d - Math.floor(d))*60).toFixed(3);d = Math.floor(d);return s+d+ \' \' + m;}\
    var lat = gApplication.getMap().getCenter().lat(),\
    lon = gApplication.getMap().getCenter().lng();',
    decDegrees ? 'document.getElementById(\'coordtxt\').innerHTML=lat.toFixed(6) + \'<br/>\' + lon.toFixed(6);' : 'document.getElementById(\'coordtxt\').innerHTML=dmm(+lat) + \'<br/>\' + dmm(+lon);',
    'return false;'
  ].join('');

  if (targets.snapshotLength === 1) {
    targetDiv = targets.snapshotItem(0);
    mySpan = document.createElement("span");
    mySpan.innerHTML += '<a title="Click to show coordinates at map centre." class="kd-button small" style="line-height:13px;width:60px;" id="coordtxt" onclick="'+ showScript +'">Show coords</a>';
    targetDiv.appendChild(mySpan);
    css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.kd-button{padding:0 2px;margin-right:3px;vertical-align:middle;}';
    document.documentElement.firstChild.appendChild(css);
  }
}());