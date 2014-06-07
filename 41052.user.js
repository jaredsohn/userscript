// ==UserScript==
// @name           Hide Journal Box
// @namespace      hjb@kwierso.com
// @include        http://*.roosterteeth.com/members/
// @include        http://*.roosterteeth.com/members/index.php
// ==/UserScript==

(function() {
    var journalform = document.getElementsByName("post")[0];
    journalform.style.display = "none";
})();