// ==UserScript==
// @name           Googlenobackground
// @namespace      ayr.userscript
// @description    Removes the nasty google background!
// @include        http://www.google.co.uk/*
// @include        http://www.google.com/*
// ==/UserScript==

(function(){
  window.location.href = "https://www.google.com/"; //there is no https for .co.uk
})();

