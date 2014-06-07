// ==UserScript==
// @name           No YouTube Autoplay Next
// @namespace      http://userscripts.org/scripts/show/71191
// @description    Turns Autoplay next OFF on all YouTube videos.
// @version        0.01
// @include        http://youtube.com/watch?*
// @include        http://www.youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        http://www.youtube.com/watch#*
// @include        http://*.youtube.com/watch#*
// ==/UserScript==
if (/.*&playnext=1.*/.test(document.URL))
  window.location.replace(document.URL.replace('&playnext=1','&playnext=0'));

