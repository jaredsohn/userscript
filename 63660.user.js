// ==UserScript==
// @name           Engadget Fix Loader
// @description    This loader will always run the latest version of "Engadget Fix"
// @namespace      http://userscripts.org/users/120469
// @include        http://*.engadget.com/page/*/
// @include        http://*.engadget.com/
// ==/UserScript==


function init(){
    (function(){document.body.appendChild(document.createElement('script')).src='http://userscripts.org/scripts/source/63659.user.js';})();
}

init();