// ==UserScript==
// @name         Force Vertical Scrollbar
// @description  Force Vertical Scrollbar on all pages
// @copyright  2013+, Lev Kitsis
// @namespace  http://www.kitsis.ca/
// @version    0.1
// @updateURL  http://userscripts.org/scripts/source/178409.meta.js
// @installURL http://userscripts.org/scripts/source/178409.user.js
// @include        *
// ==/UserScript==


var body = document.getElementsByTagName('body')[0];

if(body) {
 body.style.overflowY = 'scroll';
}