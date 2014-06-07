// ==UserScript==
// @name          enkh
// @namespace     http://userscripts.org/scripts/show/71104
// @description	  Greets the world
// @include       http://www.travian.com/
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

window.addEventListener("load", function(e) {
  document.innerHTML = "Hello, world!";
}, false);