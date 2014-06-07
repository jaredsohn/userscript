// ==UserScript==
// @name        blur
// @namespace   http://www.vga.jp/
// @description Unfocus the focused element after the page loads.
// @include     *
// ==/UserScript==
  (function() {
    window.addEventListener(
      'load',
      function() {
        var element = document.querySelector(':focus');
        if(element) element.blur();
      },
      true);
  })();