// ==UserScript==
// @name           Dust Mode
// @namespace      http://userscripts.org/users/snc
// @description    Run MagicDust on form load if active. This is a private script. DO NOT install unless given permission by the author.
// @include        https://*.service-now.com/*
// ==/UserScript==

function init(){
    (function(){document.body.appendChild(document.createElement('script')).src='http://<IP ADDRESS>:81/all/scripts/dustmode.js';})();
  }
  init();