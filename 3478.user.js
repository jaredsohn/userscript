// ==UserScript==
// @name          remove top sponsored ads from google
// @namespace     http://spig.net/
// @description   Remove top Google sponsored ads
// @include       http://google.*
// @include       http://www.google.*
// @date          2005-09-26
// @version       0.1
// @GM_version    0.5.4
// ==/UserScript==

(function() {
    // get the top 3 divs that have tpa in their id
    if (div = document.getElementById('tpa1')) { div.style.display = 'none'; }
    if (div = document.getElementById('tpa2')) { div.style.display = 'none'; }
    if (div = document.getElementById('tpa3')) { div.style.display = 'none'; }
})();
