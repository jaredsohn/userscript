// ==UserScript==
// @name           Adblock for Netvibes
// @namespace      http://polygonpla.net/
// @description    Adblock for Netvibes
// @include        http://www.netvibes.com/privatepage/*
// @author         polygon planet
// @version        1.01
// @updateURL      https://userscripts.org/scripts/source/146288.meta.js
// @grant          GM_log
// ==/UserScript==
(function() {

// -------------------- Settings --------------------
var DELAY = 2000;

var PATTERN = /^[\s\u3000]*(?:(?:AD|PR)[\s\u3000]*[:\uFF1A]|[\[\uFF3B][\u3000]*(?:AD|PR)[\s\u3000]*[\]\uFF3D])/i;
// -------------------- /Settings --------------------

var Netvibes = {
  block: function() {
    var prev = null, isLi = /li/i;

    function remove(e) {
      try {
        var li = e.parentNode;
        li.parentNode.removeChild(li);
      } catch (ex) {}
    }

    Array.prototype.slice.call(document.querySelectorAll('.nv-feedList a.main-link')).forEach(function(elem) {
      if (!elem) {
        return;
      }

      var text = (elem.textContent || '').replace(/^\s+|\s+$/g, '');

      if (elem.href == prev) {
        remove(elem);
        prev = null;
        return;
      }

      if (PATTERN.test(text)) {
        var el = elem, i = 0;
        try {
          while ((el = el.parentNode)) {
            if (++i > 5) {
              throw i;
            }
            if (isLi.test(el.tagName)) {
              break;
            }
          }
          if (isLi.test(el.tagName)) {
            remove(elem);
            prev = null;
            return;
          }
        } catch (e) {}
      }
      prev = elem.href;
    });
  },
  observe: function observe() {
    setTimeout(function() {
      Netvibes.block();
      setTimeout(observe, DELAY);
    }, DELAY);
  }
};

setTimeout(function() {
  Netvibes.observe();
}, 1000);

}());
