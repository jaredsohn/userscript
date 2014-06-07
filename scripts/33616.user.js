// ==UserScript==
// @name           TimesPeople bottomizer
// @namespace      http://phiffer.org/
// @description    Moves the TimesPeople widget to the bottom of the page
// @include        http://*.nytimes.com/*
// ==/UserScript==


GM_addStyle("#LTS_container_shadow { display: none; } ");

var interval = setInterval(function() {
  var div = document.getElementById('LTS_container');
  if (!div) {
    return;
  }
  div.style.bottom = 0;
  div.style.top = 'auto';
  div.style.marginBottom = 0;
  document.body.className = '';
  clearInterval(interval);
}, 15);