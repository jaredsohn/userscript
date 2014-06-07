// ==UserScript==
// @name          zdf_disable_noscript_warning
// @namespace     http://sptools
// @description   removes no javascript warning in zdf mediathek
// @include       http://www.zdf.de/*
// ==/UserScript==

(function() {
    var js_disclaimer = document.getElementById('javascriptHinweis');
    var breadcrumb = document.getElementById('breadcrumbContainer');

    js_disclaimer.style.visibility = 'hidden';
    js_disclaimer.style.display    = 'none';
    breadcrumb.style.display       = 'none';

})();

