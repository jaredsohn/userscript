// ==UserScript==
// @name           Sort the Pirate Bay .se by seeders
// @namespace      Credit to http://InternetDuctTape.com for original upload.
// @description    Automatically sort by seeders instead of by date uploaded.
// @include        http://thepiratebay.se/search/*/99/0
// ==/UserScript==

(function() {
  document.location.pathname = document.location.pathname.replace('/99/0','/07/0');
})();
