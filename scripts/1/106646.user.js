// ==UserScript==
// @name           Leenks: Frame buster
// @namespace      http://userscripts.org/users/aankhen
// @description    Automatically removes the frame around Leenks linked pages.
// @include        http://leenks.com/link*
// ==/UserScript==

var frames = document.getElementsByTagName('frame');
if (frames.length >= 2)
  window.location = frames[1].src;