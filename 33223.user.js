// ==UserScript==
// @name           where is your mind?
// @namespace      http://userscripts.org/ironfroggy/wheremind
// @description    When you run out of reader feed items, go work!
// @include        http://www.google.com/reader/next?go=noitems
// ==/UserScript==

window.addEventListener(
    'load', function(){
        unsafeWindow.location = "http://www.merlinmann.com/rightnow/";
     }, true);