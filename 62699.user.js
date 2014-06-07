// ==UserScript==
// @name           loaded
// @namespace      my
// @description    indicate if a page is loded
// @include        http://www.cnn.com
// ==/UserScript==


window.addEventListener(
  'load',
  function (e) {
    document.title += " deki";
 }, false);