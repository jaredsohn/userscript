// ==UserScript==
// @name           YouTube HD Trapper
// @namespace      http://polygonpla.net/
// @description    Replace movie links for [HD] High-Definition in YouTube
// @include        http://*.youtube.com/
// @include        http://*.youtube.com/*
// @include        http://youtube.com/
// @include        http://youtube.com/*
// @version        1.01
// @author         polygon planet
// ==/UserScript==
//
// 全ての動画リンクに '&hd=1' ([HD] - High Definition) リンクを付ける
//
(function(undefined) {

const patterns = {
  watch: /(?::\/\/(?:\w+[.])*?youtube[.]\w+\/|[.]?\/|)watch(?:#!|[?])/,
  hd: /(?:[&?]|#!)hd=\w/
};


window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() { replaceToHDLinkAll() }, 500);
  document.body.addEventListener('DOMNodeInserted', function(event) {
    setTimeout(function() { replaceToHDLinkAll(event.target) }, 10);
  }, true);
}, false);


function replaceToHDLinkAll(context) {
  var elems, ctx;
  ctx = context || document;
  setTimeout(function() {
    try {
      elems = ctx.getElementsByTagName('a');
      Array.prototype.slice.call(elems).forEach(function(a) {
        setTimeout(function() { replaceToHDLink(a) }, 1);
      });
    } catch (e) {}
  }, 0);
}


function replaceToHDLink(a) {
  if (a && a.href &&
      patterns.watch.test(a.href) && !patterns.hd.test(a.href)) {
    a.href = a.href.replace(/&$/, '') + '&hd=1';
  }
}


})();

