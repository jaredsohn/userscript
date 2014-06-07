// ==UserScript==
// @name           GMail Adblock
// @namespace      http://polygonpla.net/
// @description    Adblock for GMail
// @include        http*://mail.google.*/mail/*#inbox
// @author         polygon planet
// @version        1.03
// @updateURL      https://userscripts.org/scripts/source/121246.meta.js
// ==/UserScript==

window.addEventListener('load', function() {
  let doc, rr, limit = 10, done = false;
  
  function hideAds(target) {
    let elems = target.querySelectorAll('.mq');
    if (elems && elems.length) {
      Array.prototype.slice.call(elems).forEach(function(elem) {
        elem.style.display = 'none';
      });
    }
  }
  
  (function() {
    try {
      doc = document.getElementById('canvas_frame');
      if (doc) {
        doc = doc.contentDocument;
      }
      if (!doc) {
        throw 'continue';
      }
    } catch (e) {
      if (e == 'continue') {
        if (--limit >= 0) {
          setTimeout(arguments.callee, 1000);
        }
        return;
      }
      throw e;
    }
    if (!rr) {
      rr = doc.getElementById(':rr');
    }
    if (doc && rr && !done) {
      done = true;
      rr.addEventListener('DOMNodeInserted', function(ev) {
        setTimeout(function() {
          hideAds(ev.target);
        }, 500);
      }, false);
      setTimeout(function() {
        hideAds(rr);
        setTimeout(arguments.callee, 750);
      }, 250);
    } else {
      limit = 10;
      return setTimeout(arguments.callee, 1000);
    }
  }());
  
}, false);


