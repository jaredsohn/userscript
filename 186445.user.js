// ==UserScript==
// @name          v2ex-kill-yiqihao-ads
// @namespace     v2ex
// @include       http://*.v2ex.com/*
// @include       http://v2ex.com/*
// @include       https://*.v2ex.com/*
// @include       https://v2ex.com/*
// ==/UserScript==

(function (window, document, undefined) {
  Array.prototype.slice.call(document.querySelectorAll('#Rightbar .box'), 0).forEach(function (box) {
    var target = box.querySelector('a[href^="http://www.yiqihao.com"]');
    if (target) {
      var sibling = box.nextElementSibling;
      if (sibling) sibling.remove();
      box.remove();
    }
  });
}(window, document, undefined));
