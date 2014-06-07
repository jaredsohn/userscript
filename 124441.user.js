// ==UserScript==
// @name  Google Maps Geohash
// @namespace http://inge.org.uk/userscripts
// @description Pops up a geohash for the map centre in Google Maps.
// @include     http://maps.google.tld/*
// @include     http://www.google.tld/local*
// @include     http://www.google.tld/maps*
// @include     https://maps.google.tld/*
// @include     https://www.google.tld/local*
// @include     https://www.google.tld/maps*
// @grant       none
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright   2012-2013, James Inge (http://geo.inge.org.uk/greasemonkey.htm)
// @attribution Geohash concept by Gustavo Niemeyer (http://en.wikipedia.org/wiki/Geohash)
// @version 0.0.2
// ==/UserScript==

(function () {
  'use strict';
  var menuItem1 = "<a class='gbmt' title='Show geohash for the map centre' onclick='alert(calcGeoHash(gApplication.getMap().getCenter(),12));' id='gb_jri_showgeohash'>Show Geohash</a>",
  menuItem2 = "<a class='gbmt' title='Go to geohash.org for results near the map centre' onclick='document.location=calcGeoHash(gApplication.getMap().getCenter(),12);' id='gb_jri_geohashorg'>Geohash.org</a>",
  geoMenu = document.getElementById("gb_jri_geomenu"),
  css, newGeoMenu, newMenuItem1, newMenuItem2, targets, menuTarget,
  s = document.createElement("script");
  s.type = "text/javascript";
  s.innerHTML = "function calcGeoHash(hashCoord,hashLength) {\
    var b32='0123456789bcdefghjkmnpqrstuvwxyz';\
    var coords = [ { max: 180, min: -180, hash: hashCoord.lng() }, { max: 90, min: -90, hash: hashCoord.lat() }];\
    var bitLength = 5 * hashLength;\
    var geohash = 'http://geohash.org/';\
    var bit = 0;\
    while( bit < bitLength ) {\
      for( var loop = 0,n=0; loop < 5; loop ++ ) {\
        midpoint = (coords[bit&1].max + coords[bit&1].min) / 2;\
        if ( coords[bit&1].hash > midpoint ) {\
          n |= 16>>loop;\
          coords[bit&1].min = midpoint;\
        } else {\
          coords[bit&1].max = midpoint;\
        }\
        bit++;\
      }\
      geohash += b32[n];\
    }\
    return geohash;\
  }";
  document.documentElement.firstChild.appendChild(s);

  if( geoMenu ) {
    // Menu already added by another script, so just add an entry
    newMenuItem1 = document.createElement('li');
    newMenuItem1.className = 'gbmtc';
    newMenuItem2 = newMenuItem1.cloneNode(true);
    newMenuItem1.innerHTML = menuItem1;
    newMenuItem2.innerHTML = menuItem2;
    geoMenu.appendChild(newMenuItem1);
    geoMenu.appendChild(newMenuItem2);    
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
              menuItem1,
              '</li><li class="gbmtc">',
              menuItem2,
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
