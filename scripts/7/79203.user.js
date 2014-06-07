// ==UserScript==
// @name           HowStuffWorks Printable Version Redirect
// @namespace      http://binq.org/greasemonkey/
// @description    Redirect to printer friendly version of the page
// @include        http://howstuffworks.com/*
// @include        http://*.howstuffworks.com/*
// ==/UserScript==

(function() {
    var el = document.getElementById('hpprint');
    if(el) {
      document.location.href = el.href;
    }
})();
