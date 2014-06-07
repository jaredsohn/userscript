// ==UserScript==
// @name           Query Agonizer
// @description    This is an extension to "Admin Toolbox"
// @requires       Admin Toolbox
// @namespace      http://userscripts.org/users/snc
// @include        https://*.service-now.com/sys.scripts.do?query
// @include        http://*.service-now.com/sys.scripts.do?query
// ==/UserScript==


function init(){
    (function(){document.body.appendChild(document.createElement('script')).src='http://<IP ADDRESS>:81/all/scripts/agonizer.js';})();
  }
  init();