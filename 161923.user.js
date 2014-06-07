// ==UserScript==
// @author      Milly
// @name        Google Maps Show Coords Link
// @namespace   http://d.hatena.ne.jp/MillyC/
// @description Creates a link on Google Maps to show the map centre lat/lon coordinates.
// @include     http://maps.google.tld/*
// @include     http://www.google.tld/local*
// @include     http://www.google.tld/maps*
// @include     https://maps.google.tld/*
// @include     https://www.google.tld/local*
// @include     https://www.google.tld/maps*
// @grant       none
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright   2013, Milly (http://d.hatena.ne.jp/MillyC/)
// @version     1.0
// ==/UserScript==

//  v1.0    Refactored.

// == Original ==
// @license     MIT License; http://www.opensource.org/licenses/mit-license.php
// @copyright   2011-2013, James Inge (http://geo.inge.org.uk/)
// @version     0.10.0
// == /Original ==

(function () {
  'use strict';

  // Set the decDegrees variable below to true for DD.ddd or false for DD MM.mmm
  var decDegrees = true;

  var css = [
    '#topbar-startcol .start-edge-links {',
    '  padding-left: 30px;',
    '}',
    '.kd-button {',
    '  padding: 0 2px;',
    '  margin-right: 3px;',
    '  vertical-align: middle;',
    '}',
    '#coordtxt {',
    '  line-height: 13px;',
    '  width: 60px;',
    '}'
  ].join('');

  function select(element) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function showDegrees(event) {
    event.preventDefault();
    function $d(deg) {
      if (decDegrees) return deg.toFixed(6);
      var s = (deg < 0) ? '-' : '', d = Math.abs(deg), fd = Math.floor(d), m = ((d - fd) * 60).toFixed(3);
      return s + fd + ' ' + m;
    }
    var gc = gApplication.getMap().getCenter(), txt = document.getElementById('coordtxt');
    txt.innerHTML = $d(+gc.lat()) + ',<br/>' + $d(+gc.lng());
    select(txt);
    return false;
  }

  var targets = document.evaluate("//div[@id='topbar-startcol']/div[@class='start-edge-links']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (targets.snapshotLength === 1) {
    var targetDiv = targets.snapshotItem(0);
    var mySpan = document.createElement("span");
    mySpan.innerHTML = '<a title="Click to show coordinates at map centre." class="kd-button small" id="coordtxt">Show coords</a>';
    var coordBtn = mySpan.firstChild;
    coordBtn.addEventListener('click', showDegrees, false);
    targetDiv.appendChild(mySpan);
    var myStyle = document.createElement('style');
    myStyle.type = 'text/css';
    myStyle.innerHTML = css;
    document.documentElement.firstChild.appendChild(myStyle);
  }
}());
