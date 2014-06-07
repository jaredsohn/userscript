// ==UserScript==
// @name           DH.monkey
// @namespace      dhmonkey
// @description    Show torrent descriptions by default
// @include        http*://*digitalhive.org/details.php*
// ==/UserScript==

(function() {
   var desc = document.getElementById('desc');
   desc.style.display = 'block';
})();