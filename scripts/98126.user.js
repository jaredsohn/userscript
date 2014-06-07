// ==UserScript==
// @name          365 control panel redirect
// @namespace     365
// @description   force control panel to redirect to bookmarks
// @include       http://forum.football365.com/ucp.php
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace('ucp.php', 'ucp.php?i=main&mode=bookmarks');
})();
