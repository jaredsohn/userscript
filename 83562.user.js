// ==UserScript==
// @name        Short Labels
// @namespace   http://fluidapp.com
// @description Shortens Gmail hierarchical labels to the last part of the path
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @author      Scott Whittaker
// ==/UserScript==

(function () {
  function shorten_labels() {
    // make sure we are targeting the canvas frame
    var canvas = document.getElementById('canvas_frame').contentDocument;
    // get the labels
    var labels = canvas.getElementsByClassName('av');
    for (var i in labels) {
      var label = labels[i];
      var shortLabel = label.innerHTML.split('/').pop();
      label.innerHTML = shortLabel;
    }
  }

  window.setInterval(shorten_labels, 5000);
})();