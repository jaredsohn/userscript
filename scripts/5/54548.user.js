// ==UserScript==
// @name        t61 MediaKeysPlugin handler
// @namespace   http://www.media.mit.edu/~azinman
// @description Wraps the MediaKeys plugin handlers to the sixtyone functions.  Plugin available at http://code.google.com/p/mediakeysplugin
// @include     http://www.thesixtyone.com/*
// @author      Aaron Zinman
// ==/UserScript==

mediaKeysPlugin = {};

(function () {
  if (window.fluid) {
    mediaKeysPlugin.forward = t61.miniplayer.next;
    mediaKeysPlugin.backward = t61.miniplayer.prev;
    mediaKeysPlugin.play = function () {
      if (t61.current_song && t61.current_song.playing) {
        t61.miniplayer.pause();
      } else {
        t61.miniplayer.play();
      }
    }
  }
})();
