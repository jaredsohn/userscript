// ==UserScript==
// @name           Sort the Pirate Bay + alt links by seeders
// @namespace      http://userscripts.org/scripts/show/153402
// @description    Automatically sort by seeders instead of by date uploaded
// @include        http://thepiratebay.org/*/99/0
// @include        http://thepiratebay.se/*/99/0
// @include        http://labaia.ws/*/99/0
// @include        http://194.71.107.80/*/99/0
// @include        http://pirateshit.com/*/99/0
// @include        https://thepiratebay.sx/*/99/0
// @include        http://thepiratebay.sx/*/99/0
// ==/UserScript==

(function() {
  document.location.pathname = document.location.pathname.replace('/99/0','/07/0');
})();
