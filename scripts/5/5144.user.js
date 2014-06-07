// ==UserScript==
// @name           Fix DaV5 full view
// @namespace      http://pile0nades.wordpress.com/
// @description    Makes the image full view when on pages with /view/ in the address
// @include        http://*.deviantart.com/view/*
// @include        http://deviantart.com/view/*

// ==/UserScript==

(function() {

  var deviation = get("//span[@id='zoomed-out']/a").snapshotItem(0);

  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  deviation.dispatchEvent(evt);


  // xpath function
  function get(query) {
    return document.evaluate(
      query,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
  }

})();