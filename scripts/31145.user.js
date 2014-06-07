// ==UserScript==
// @name           Lowercase Forcer
// @namespace      http://userscripts.org/users/23652
// @description    Forces lowercase in all text fields for included sites
// @include        *
// @copyright      JoeSimmons
// @version        1.0.1
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @downloadURL    http://userscripts.org/scripts/source/31145.user.js
// @updateURL      http://userscripts.org/scripts/source/31145.meta.js
// ==/UserScript==


/* CHANGELOG

1.0.1 (9/25/2013)
    - updated a little

1.0.0 (9/4/2008)
    - created

*/

window.addEventListener('keyup', function (event) {
    var element = event.target;

    if (element.tagName === 'INPUT' && ['text', 'search'].indexOf(element.type) !== -1) {
        element.value = element.value.toLowerCase();
    }
}, false);