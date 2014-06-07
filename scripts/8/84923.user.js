// ==UserScript==
// @name           Hootsuite Dashboard Lager Font
// @namespace      http://www.doitian.com
// @description    Set a lager font size for hootsuite dashboard
// @include        http://hootsuite.com/dashboard*
// @include        https://hootsuite.com/dashboard*
// @homepage       http://userscripts.org/scripts/show/84923
// ==/UserScript==

(function() {
GM_addStyle(".messageContent {font-size:160% !important;} .commentContent {font-size:140% !important;}");
})();
