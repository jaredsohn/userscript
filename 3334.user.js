// ==UserScript==
// @namespace     http://www.nsaneproductions.com/
// @name          Angelfire Ad Remover
// @description   Hides the ads on Angelfire sites.
// @include       http://angelfire.*/*/*
// @include       http://*.angelfire.*/*/*
// ==/UserScript==

(function() {
  div = document.getElementsByTagName("div")[0];
  form = document.getElementsByTagName("form")[0];
  table = document.getElementsByTagName("table")[2];

  if (form.name == 'lycos_search') {
    div.innerHTML = '';
    form.innerHTML = '';
    table.innerHTML = '';
  }
})();

/*  CHANGELOG

   Version 0.2:
     - Changes the ads innerHTML to null, so they're not even loaded any more.

   Version 0.1:
     - Initial release.

*/