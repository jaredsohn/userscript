// ==UserScript==
// @name           YouTube Confirmation Before Leaving Video Page
// @namespace      http://userscripts.org/users/23652
// @description    Pops up a confirmation box before you leave a page so you don't accidentally leave a video you're watching
// @include        http://*.youtube.com/watch*v=*
// @copyright      JoeSimmons
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

window.addEventListener('beforeunload', function(e) {
e.preventDefault();
}, false);