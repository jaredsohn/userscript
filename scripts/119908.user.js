// ==UserScript==
// @name        Google Maps Spot Height
// @namespace   http://inge.org.uk/userscripts
// @description Adds an item to the menu in Google Maps to show the height in metres above sea level of the position at the map centre.
// @include     http://maps.google.tld/*
// @include     http://www.google.tld/local*
// @include     http://www.google.tld/maps*
// @include     https://maps.google.tld/*
// @include     https://www.google.tld/local*
// @include     https://www.google.tld/maps*
// @grant       GM_xmlhttpRequest
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright   2011-2013, James Inge (http://geo.inge.org.uk/greasemonkey.htm)
// @version     0.1.3
// ==/UserScript==

(function () {
  'use strict';
  function getHeight() {
    var coords, r = document.getElementById("link");
    if(r) {
      coords = r.href.match(/&ll=(-?\d{1,2}\.\d+,-?\d{1,3}\.\d+)&/);
      if(coords.length === 2) {
        GM_xmlhttpRequest({
          method: "GET",
          url: ["http://maps.googleapis.com/maps/api/elevation/json?sensor=false&locations=", coords[1]].join(""),
          onload: function(responseDetails) {
            var el, response = JSON.parse(responseDetails.responseText);
            if( response.status === "OK" ) {
              el = Math.round( response.results[0].elevation );
              alert( ["Height at map centre: ", el>0?"+":"",el,"m"].join(""));
            } else {
              alert( "Request to Google Elevation API failed" );
            }
          }
        });
        return;
      }
    }
    if( console && console.log ) { console.log("Couldnt figure out coordinates"); }
  }

  var menuItem = "<a class='gbmt' title='Height above sea leval at the map centre' id='gb_jri_height'>Spot height</a>",
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
  document.getElementById("gb_jri_height").addEventListener("click", getHeight, false);
}());
