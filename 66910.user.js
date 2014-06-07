// ==UserScript==
// @name           Allow Snopes Text Selection
// @namespace      http://www.shaungrady.com
// @author         Shaun Grady
// @description    Quite simply clips the wings of Snopes' anti-text-selection script
// @include        http://www.snopes.com/*
// @include        http://snopes.com/*
// ==/UserScript==

(function(){
  unsafeWindow.document.onmousedown = undefined;
  unsafeWindow.document.onmouseup   = undefined;
})();