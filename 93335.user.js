// ==UserScript==
// @name           Adblock for iGoogle
// @namespace      http://polygonpla.net/
// @description    Block Ads for iGoogle automatically
// @include        http://www.google.co.jp/ig*
// @version        1.10
// @author         polygon planet <http://twitter.com/polygon_planet>
// @updateURL      https://userscripts.org/scripts/source/93335.meta.js
// ==/UserScript==

(function(){

// -------------------- Settings --------------------

// whether to block Ads on Google Reader.
var ENABLE_READER = true;

// the times (ms) of execution interval
var DELAY   = 2000;

// the regex pattern for Ads
var PATTERN = /^[\s\u3000]*(?:(?:AD|PR)[\s\u3000]*[:\uFF1A]|[\[\uFF3B][\u3000]*(?:AD|PR)[\s\u3000]*[\]\uFF3D])/i;

// -------------------- /Settings --------------------

// Google reader Gadget
var GoogleReader = {
  doc: null,
  found: false,
  registered: false,
  inited: false,
  init: function(){
    var i, j, doc, iframe;
    var iframes = document.getElementsByTagName("iframe");
    if (!GoogleReader.inited) {
      GoogleReader.inited = true;
      window.addEventListener('DOMContentLoaded', function() {
        blockGadgetAds();
      }, false);
    }
    for (i = 0; i < iframes.length; i++) {
      try {
        iframe = iframes[i];
        doc = iframe.contentDocument;
        if (/\bremote_iframe_\d+/i.test(iframe.id)) {
          if (doc.querySelectorAll("ul li a").length) {
            GoogleReader.found = GoogleReader.bind(doc);
          }
        }
      } catch (e) {}
    }
    if (!GoogleReader.found) {
      setTimeout(GoogleReader.init, DELAY);
    }
  },
  block: function(child, parent){
    var bubble, close;
    if (PATTERN.test(child.textContent)) {
      parent.style.visibility = "hidden";
      /*
      emitSupClick(child);
      bubble = document.querySelector(".bubble");
      close = document.querySelector(".bubble .close");
      if (bubble) {
        bubble.style.display = "none";
        bubble.style.visibility = "hidden";
        if (close) {
          emitSupClick(close);
        }
      }
      */
    }
  },
  bind: function(doc){
    var i, a, li, lis, ul, blocked;
    if (GoogleReader.doc) {
      blocked = true;
    } else {
      GoogleReader.doc = doc;
      ul = GoogleReader.doc.getElementsByTagName("ul")[0];
      if (ul) {
        if (!GoogleReader.registered) {
          ul.parentNode.addEventListener("DOMNodeInserted", function(ev){
            var a, element = ev.target;
            if (element.nodeName.toLowerCase() === "li") {
              a = element.getElementsByTagName("a")[0];
              GoogleReader.block(a, element);
            }
          }, false);
          GoogleReader.registered = true;
        }
        lis = ul.getElementsByTagName("li");
        for (i = 0; i < lis.length; i++) {
          li = lis[i];
          a = li.getElementsByTagName("a")[0];
          GoogleReader.block(a, li);
        }
        blocked = true;
      }
    }
    return blocked;
  }
};

var execute = function(){
  blockGadgetAds();
  if (ENABLE_READER) {
    GoogleReader.init();
  }
  setTimeout(execute, 300000);
};

setTimeout(execute, DELAY);


// Click Event
function emitSupClick(element){
  var event = element.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent(
    "click", true, true,
    element.ownerDocument.defaultView,
    1, 0, 0, 0, 0,
    false, false, false, false,
    0, element
  );
  element.dispatchEvent(event);
}

// Basic Gadget
function blockGadgetAds(){
  var i, j, a, az, div, divs = document.getElementsByTagName("div");
  for (i = 0; i < divs.length; i++) {
    div = divs[i];
    if (isGadgetItem(div)) {
      az = div.getElementsByTagName("a");
      for (j = 0; j < az.length; j++) {
        a = az[j];
        if (PATTERN.test(a.textContent)) {
          div.style.height = 0;
          div.style.overflow = "hidden";
          //emitSupClick(a);
        }
      }
    }
  }
}

function isGadgetItem(element){
  return /^ftl_\d{0,}_\d{0,}/.test(element.id);
}

})();
