// ==UserScript==
// @name        Refresh forum
// @namespace   http://userscripts.org/users/509460
// @description Auto refresh forum index
// @include     http://www.gry-planszowe.pl/forum/index.php
// @include     http://www.gry-planszowe.pl/forum/
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    setInterval(function() { window.location = location.href }, 60000);
})();