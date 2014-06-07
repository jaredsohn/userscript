// ==UserScript==
// @name           Sort the Pirate Bay by seeders
// @namespace      http://InternetDuctTape.com
// @description    Automatically sort by seeders insetad of by date uploaded
// @include        http://thepiratebay.org/*/99/100
// ==/UserScript==

(function() {
  document.location.pathname = document.location.pathname.replace('/99/100','/07/100');
})();
