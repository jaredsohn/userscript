// ==UserScript==
// @name        Neopets Offline Reloader
// @namespace   http://userscripts.org/users/46514
// @description Reloads the screen if the "offline" message shows.
// @include     http://*neopets.com*
// ==/UserScript==

if (/_oops_\w+\.png/.test(document.body.innerHTML)) {
  window.location.reload();
}
