// -*- js-indent-level: 2 -*-
// ==UserScript==
// @name           Google Maps Fullscreen
// @namespace      tag:brainonfire.net,2009-11-22:gmaps-fullscreen
// @description    Expand the Google Maps map view to fill the entire page vertically (for better screenshots, etc.) You'll have to collapse the left panel yourself, though! Also, I recommend fullscreening the browser (F11) *after* launching this script. Note that the script is to be launched using the Greasemonkey menu.
// @include        http://maps.google.com/*
// @include        https://maps.google.com/*
// @version        0.3
// @changelog      Since 0.2: Update for latest page layout, include https, re-indent to 2 spaces
// ==/UserScript==

/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context) {
  if(!context)
    context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(i = 0; item = xpr.snapshotItem(i); i++)
	  arr.push(item);
  return arr;
}

GM_addStyle(<><![CDATA[
  html.hideheader #header, html.hideheader #gb {
    display: none !important;
  }
]]></>.toString());

var isFullscreen = false;
var topel = document.getElementsByTagName('html')[0];
var findHideHeader = /(^| )hideheader( |$)/;

function toggleFullscreen() {
  if(isFullscreen) {
    topel.className = (topel.className || "").replace(findHideHeader, " ")
    isFullscreen = false;
  } else {
    topel.className = (topel.className || "") + " hideheader";
    isFullscreen = true;
  }
}

GM_registerMenuCommand("Toggle fullscreen", toggleFullscreen);
