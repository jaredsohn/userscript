// ==UserScript==
// @name        Pandora redirect
// @namespace   http://userscripts.org/users/480044
// @description Redirector from restriction message.
// @include     http://www.pandora.com/restricted
// @version     1
// ==/UserScript==

setTimeout (function() {window.location.replace ("http://pandora.com");}, 5000);