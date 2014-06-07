// ==UserScript==
// @name        Google Maps List Geocaches Link
// @namespace   http://inge.org.uk/userscripts
// @description Creates a link on Google Maps to list geocaches near the map centre.
// @include     http://maps.google.tld/*
// @include     http://www.google.tld/local*
// @include     http://www.google.tld/maps*
// @include     https://maps.google.tld/*
// @include     https://www.google.tld/local*
// @include     https://www.google.tld/maps*
// @grant       none
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright   2006-2013, James Inge (http://geo.inge.org.uk/greasemonkey.htm)
// @version     0.9.1
// ==/UserScript==

//  v0.9.1 - Added https URLs to support secure access to Google Maps. Cleaned up code & improved integration.
//  v0.9  - Moved to Google menu, due to another layout change.
//  v0.8  - Updated to match change in Google Maps layout. New icon.
//  v0.7  - Now works with any top-level domain version of Google Maps
//  v0.2 to 0.6 - Updates to match various minor changes in Google Maps' page structure.
//    - No changes in functionality.

(function () {
  'use strict';
  var menuItem = '<a class="gbmt" title="List geocaches around the map centre" onclick="document.location=\'http://www.geocaching.com/seek/nearest.aspx?origin_lat=\'+gApplication.getMap().getCenter().lat()+\'&origin_long=\'+gApplication.getMap().getCenter().lng();" id="gb_jri_listgeocaches">List geocaches</a>',
  geoMenu = document.getElementById("gb_jri_geomenu"),
  css, newGeoMenu, newMenuItem, targets, menuTarget;
  if( geoMenu ) {
    // Menu already added by another script, so just add an entry
    newMenuItem = document.createElement('li');
    newMenuItem.className = 'gbmtc';
    newMenuItem.innerHTML = menuItem;
    geoMenu.appendChild(newMenuItem);
  } else {
    // Set up the menu from scratch
    targets = document.evaluate("//div[@id='gbz']/ol", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (targets.snapshotLength > 0) {
      menuTarget = targets.snapshotItem(0);
      newGeoMenu = document.createElement('li');
      newGeoMenu.className = 'gbt';
      newGeoMenu.innerHTML = [
        '<a class="gbgt" id="gbztm_jri" href="http://www.google.com/intl/en/options/" onclick="gbar.tg(event,this)" aria-haspopup="true" aria-owns="gb_jri">\
          <span class="gbtb2"></span>\
          <span id="gbztms_jri" class="gbts gbtsa">\
            <span id="gbztms_jri1">Geo</span>\
            <span class="gbma"></span>\
          </span>\
        </a>\
        <div aria-owner="gbztm_jri" id="gb_jri" class="gbm" style="visibility: hidden;">\
          <div class="gbmc gbsb gbsbis">\
            <ol class="gbmcc gbsbic" id="gb_jri_geomenu">\
              <li class="gbmtc">',
              menuItem,
              '</li>\
            </ol>\
            <div class="gbsbt" style="opacity: 0;"></div>\
            <div class="gbsbb" style="opacity: 1;"></div>\
          </div>\
        </div>'
      ].join('');
      css = document.createElement('style');
      css.type = 'text/css';
      css.innerHTML = '#gb_jri.gbm{top:23px;} #gb_jri .gbmt{color:#000 !important;font-weight:bold;}';
      document.documentElement.firstChild.appendChild(css);
      menuTarget.appendChild(newGeoMenu);
    }
  }
}());