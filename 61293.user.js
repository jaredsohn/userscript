// ==UserScript==
// @name           Hide Ow.ly Social Bar
// @namespace      http://www.machu.jp/
// @description    Hide Ow.ly Social Bar automatically
// @include        http://ow.ly/*
// ==/UserScript==
(function() {
  location.replace(document.getElementById('hootFrame').src);
})();
