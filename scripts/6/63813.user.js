// ==UserScript==
// @name           Gizmodo Fix Loader
// @description    This loader will always run the latest version of "Gizmodo Fix".
// @namespace      http://userscripts.org/users/120469
// @include        http://gizmodo.com/
// @include        http://gizmodo.com/?p=*
// ==/UserScript==


function init(){
    (function(){document.body.appendChild(document.createElement('script')).src='http://userscripts.org/scripts/source/63812.user.js';})();
}

init();