// ==UserScript==
// @name          Only show large Google images
// @namespace     http://www.unixdaemon.net/gmscripts/
// @description   Makes your default google image view large images only
// @include       http://images.google.*/*
// ==/UserScript==

(function() {

  if (!(window.location.href.match(/imgsz=/))) {
    window.location.replace(window.location + "&imgsz=xxlarge");
  }

})();
