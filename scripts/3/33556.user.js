// ==UserScript==
// @name           GrabUp
// @namespace      http://userscripts.org/users/jameskoh
// @description    Go directly to GrabUp images
// @include        http://www.grabup.com/uploads/*.png
// @exclude        http://www.grabup.com/uploads/*.png?direct
// ==/UserScript==

window.location.href = window.location.href + '?direct';