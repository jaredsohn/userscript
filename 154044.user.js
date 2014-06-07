(function () {
// ==UserScript==
// @name          Iatkos Me
// @namespace     http://blog.krakenstein.net
// @author        daYOda (Krakenstein)
// @description   Auto redirect to new Iatkos official page
// @version       1.0
// @updateURL     https://userscripts.org/scripts/source/154044.meta.js
// @match         http://*.uphuck.ggrn.org/*
// @run-at        document-start
// ==/UserScript==

function doStuff() {
  document.location.hostname = "iatkos.me";
  document.reload();
}

document.title = "Redirect to iatkos.me";
document.addEventListener("DOMContentLoaded", doStuff, true);
})();