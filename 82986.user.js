// -----------------------------------------------------------------
//
// 3dl.am - drei.to - Redirector
// V. 0.01
// Date: 2010-08-04
//
// -----------------------------------------------------------------
//
// This script redirects every 3dl.am url to it's according drei.to address
//
// -----------------------------------------------------------------
// ==UserScript==
// @name           3dl.am - drei.to - Redirector
// @description    redirects 3dl.am addresses to drei.to addresses
// @namespace      3dl.am - drei.to - Redirector
// @include        http://3dl.am/*
// @include        http://*.3dl.am/*
// ==/UserScript==

spec = /http:\/\/([^\/]+)?3dl.am\/(.*)/;
var result = spec.exec(document.location);
if(result != null) {
  document.location.href = 'http://' + result[1] + 'drei.to/' + result[2];
}