// ==UserScript==
// @name        Rename Tab
// @namespace   http://.userscripts.org/
// @include http://www.netvibes.com/*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener ("load", Greasemonkey_main, false);

function Greasemonkey_main () {

        (function() {document.title="Home";})();
        
}