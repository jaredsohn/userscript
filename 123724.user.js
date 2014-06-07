// ==UserScript==
// @name Mylingual for Codecademy only (ja)
// @namespace http://ryolink.blogspot.com/
// @author Ryo Link
// @include http://*.codecademy.com/*
// @description Translates codecademy.com from English to Japanese.
// ==/UserScript==

(function () {
  var elem = document.createElement('script');
  elem.id = 'mylingual-core';
  elem.src = 'http://mylingual.net/userjs/mylingual-core.js?lang=ja';
  document.body.appendChild(elem);
})();