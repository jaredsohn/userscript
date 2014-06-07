// ==UserScript==
// @name          365 board index redirect 2
// @namespace     365
// @description   force board index to redirect to forum
// @include       http://forum.football365.com/index.php
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace('index.php', 'viewforum.php?f=4');
})();
