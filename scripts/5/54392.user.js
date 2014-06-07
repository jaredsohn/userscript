// ==UserScript==
// @name        t61 dock menu controllers
// @namespace   http://www.media.mit.edu/~azinman
// @description Adds play/pause, next, & previous buttons to Fluid's dock menu for The Sixty One
// @include     http://www.thesixtyone.com/*
// @author      Aaron Zinman
// ==/UserScript==

// Easier to force remove everything because our play handler fires
// on the next song, not just when transitioning from play.  We
// also get to do whatever order we want this way

(function () {
  if (window.fluid) {
    // Fluid seems to have a bug when adding/removing menu items too fast... work with setTimeout.
    setTimeout(function() {window.fluid.removeDockMenuItem("Play/Pause");}, 10);
    setTimeout(function() {window.fluid.removeDockMenuItem("Next");}, 12);
    setTimeout(function() {window.fluid.removeDockMenuItem("Previous");}, 13);

    setTimeout(function () {
      window.fluid.addDockMenuItem("Play/Pause", t61.shortcut.toggle_play);
      setTimeout(function() {window.fluid.addDockMenuItem("Next", t61.playlist.play_next_song);}, 10);
      setTimeout(function() {window.fluid.addDockMenuItem("Previous", t61.playlist.play_previous_song);}, 11);
    }, 150);
  }
})();