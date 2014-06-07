// ==UserScript==
// @name       fix_jalopnik.js
// @namespace  http://schock.net
// @version    1
// @description  Kills user interface annoyances on Jalopnik.com. Removes the trigger for annotations from all elements except the actual annotation (+) button.
// @include        http://jalopnik.com/*
// ==/UserScript==

(function() {
  'use strict';

  // Log a message to the console if it exists
  var log = function (msg) {
    if (console !== 'undefined') {
      console.log(msg);
    }
  };

  // Kills any clicks for the given annotatable element
  var killAnnotationsFor = function (annotatable) {
    if (!annotatable) { return; }

    // Keep any old click handlers
    var oldClickHandlers = annotatable.onclick || function () {};

    // Handle clicks
    annotatable.onclick = function(e) {

      // If the click target is anything but the annotation button, which we assume is
      // intentional, just die.
      if (e.target.className.search('annotateButton') === -1) {
        e.stopPropagation();
        log('Killed a click on ' + e.target);
      }

      // Fire old click handlers
      oldClickHandlers(e);

    }; // onclick

  }; // killAnnotationsFor


  // Attaches to windo
  var fixJalopnik = function () {

    // Keep any old click handlers
    var oldClickHandlers = window.onload || function () {};

    // We can kill image annotations right away
    var images = document.getElementsByClassName('js_annotatable-image')[0];
    killAnnotationsFor(images);

    // Seems like we have to wait before we can get the annotatable text
    window.onload = function () {
      // Kill the annoying annotations popup paragraph clicks
      var text = document.getElementsByClassName('js_text-annotatable')[0];
      killAnnotationsFor(text);

      oldClickHandlers();
    };

  };


  // Start 'er up
  fixJalopnik();

}());
