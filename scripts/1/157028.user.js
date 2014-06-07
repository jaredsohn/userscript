// ==UserScript==
// @name        Load jQuery On Any Page
// @namespace   http://userscripts.org/users/SystemDisc
// @description Loads jQuery on any page
// @include     https://*/*
// @include     http://*/*
// @version     0.21
// ==/UserScript==

var script = unsafeWindow.document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
    script.type = 'text/javascript';
    unsafeWindow.document.getElementsByTagName("head")[0].appendChild(script);
    script.addEventListener('load', function(){ 
        jQuery = unsafeWindow['jQuery'];
        unsafeWindow['$_'] = jQuery.noConflict(true);
    }, false);