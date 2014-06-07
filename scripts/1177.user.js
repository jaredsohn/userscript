// ==UserScript==
// @name            GeoFilter
// @namespace       http://espion.just-size.jp/archives/05/136155838.html
// @description     geobloggers filtering display user.
// @include         http://www.geobloggers.com/*
// ==/UserScript==
//
// $Id: Geofilter.user.js 623 2005-07-11 09:46:58Z takayama $

var yourname = 'yourname';

(function() {
   with(document.subLatLon) {
      username.options.length = 2;

      username.options[0].value = yourname;
      username.options[0].text  = yourname;

      username.options[1].value = '-23';
      username.options[1].text  = 'ALL users';
   }
})();

