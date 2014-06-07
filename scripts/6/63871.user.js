// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Centreon main page redirect
// @namespace      http://userscripts.org/users/7677
// @description    Force redirect of main Centeron page to the By Host Group > Details page
// @include        http://csglabnms.clients.am.health.ge.com/centreon/main.php
// ==/UserScript==

(function() {
    window.location.href = 'http://csglabnms.clients.am.health.ge.com/centreon/main.php?p=20209&o=svcOVHG';
})();
