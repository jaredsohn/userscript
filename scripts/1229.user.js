/*

 lawrence.com music helper

 modified from "Amazon Music Helper" by Jesse Andrews

http://overstimulate.com/userscripts/amazon_music.user.js
 many thanx!


 Licensed under the GPL v2 or later

// the script works on any of the pages
// where there is link to download a
// song.

*/

// ==UserScript==
// @name          lawrence.com Music Helper
// @namespace     http://www.chrysanthalbee.com/
// @description   Creates a direct link to the download from Music Downloads
// @include       http://lawrence.com*
// @include       http://www.lawrence.com*
// @include       http://www.ljworld.com*
// @include       http://ljworld.com*
// ==/UserScript==




(function() {
 links = document.getElementsByTagName('A')
 for (i=0; i<links.length; i++) {
   link = links[i];
   d = link.href.match('/songs/\([^/]*\)/\([^?]*\)?')
   if (link.href.match('/songs/')) {
     link.href= 'http://www.lawrence.com/mp3/' + d[1];
   }
 }

})();