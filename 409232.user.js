// ==UserScript==
// @name        Http.com: Weiterleitung auf die eigentliche Webseite
// @namespace   tfr
// @description Leider kann es vorkommen, dass auf die Seite Http.com weitergeleitet wird. Dieses Benutzerskript leitet auf die richtige Webseite weiter.
// @include     http://http.com/*
// @include     http://www.http.com/*
// @downloadURL https://userscripts.org/scripts/source/409232.user.js
// @updateURL   https://userscripts.org/scripts/source/409232.meta.js
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

/* Dieses Skript steht unter CC0 / This script is licensed under CC0:
 * http://creativecommons.org/publicdomain/zero/1.0/deed.de
 * http://creativecommons.org/publicdomain/zero/1.0/deed.en */

window.location.replace("http:" + window.location.pathname);