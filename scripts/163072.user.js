// ==UserScript==
// @name          Suppress Google+ Hot and Recommended
// @namespace     http://gamon.org/user-scripts/
// @description   Remove those annoying "Hot and Recommended" boxes from your Google+ feed.
// @match       https://plus.google.com/*
// @version       1.0
// ==/UserScript==

(function(){
  var sheet = document.styleSheets[0];
  sheet.insertRule('div.ZX { display: none; }', sheet.cssRules.length); // "Hot and Recommended" banner
  sheet.insertRule('div.ZX+div { display: none; }', sheet.cssRules.length); // "Hot and Recommended" content
})();
