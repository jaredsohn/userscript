// Licenced 2010 under MIT-Licence.
// ==UserScript==
// @name           Jamendo track-link To mp3-stream converter
// @namespace      Jamendo
// @description    Rewrites Jamendo's track download links to stream URLs
// @include        http://www.jamendo.com/*/album/*
// @include        http://www.jamendo.com/*/track/*
// @include        http://www.jamendo.com/*/playlist/*
// ==/UserScript==

var links = document.getElementsByTagName('a');
for (i = 0; i < links.length; i++) {
   if ( (links[i].href) && (/\/download\/track\/\d+$/i.test(links[i].href)) ) {
      var trackID = links[i].href.match(/\d+/);
      links[i].setAttribute('href', 'http://api.jamendo.com/get2/stream/track/redirect/?track_id=' + trackID);
      links[i].setAttribute('onclick', null);
   }
}