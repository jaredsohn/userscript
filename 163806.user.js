// ==UserScript==
// @name        Redirect userscripts HTTP to HTTPS
// @namespace   http://userscripts.org/users/SystemDisc
// @grant       none
// @include     /^http:\/\/([a-z0-9]+\.)?userscripts(\.[a-z]+)+\//
// @downloadURL	https://userscripts.org/scripts/source/163806.user.js
// @updateURL	https://userscripts.org/scripts/source/163806.meta.js
// @version     0.02
// ==/UserScript==

var new_location = location.href.replace(/^http\:/, 'https:');
location.href = new_location;