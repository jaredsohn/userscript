// ==UserScript==
// @name           Remove Google Instant click tracking
// @namespace      jaymac407@gmail.com
// @description    Removes Google's sly click tracking onmousedown()
// @include        http://*google*/*
// ==/UserScript==

//V1.1 - move blocking code from unsafeWindow into sandbox

var debug = false;

function _no_track() {
    unsafeWindow.rwt = function() {
      if(debug) alert('Blocked Google tracking function!');
      return true;
    }
}
setInterval(_no_track, 1000);