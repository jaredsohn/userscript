// ==UserScript==
// @name           dragLikeAdobeReader
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http*
// ==/UserScript==
(function() {
  document.documentElement.style.cursor = '-moz-grab';

  var grabbing = null;
  var x = null;
  var y = null;
  var rule = /input|textarea|button|select|a/i;
  var select = null;
  var sRange = window.getSelection();

  window.addEventListener('mousedown',
  function(e) {
    if (select && e.button == 0) {
      sRange.removeAllRanges();
      select = false;
    }
    if (rule.test(e.target.tagName) || e.altKey || e.button != 0){
      document.documentElement.style.cursor = 'auto';
      select = true;
    return;
    }
    grabbing = true;
    document.documentElement.style.cursor = '-moz-grabbing';
    x = e.clientX,
    y = e.clientY;
    e.preventDefault();
  },
  false);
  window.addEventListener('mouseup',
  function(e) {
    if (rule.test(e.target.tagName) || !grabbing || e.button != 0) return;
    grabbing = false;
    document.documentElement.style.cursor = '-moz-grab';
    x,
    y = null;
    e.preventDefault();
  },
  false);

  window.addEventListener('mousemove',
  function(e) {
    if (grabbing && e.button ==0) {
      scrollDocument(e);
      e.preventDefault();
    }
  },
  false);

  function scrollDocument(e) {
    window.scrollBy(x - (x = e.clientX), y - (y = e.clientY));
  }
})();

