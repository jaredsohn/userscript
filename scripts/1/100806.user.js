// ==UserScript==
// @name           CRAN redirect
// @namespace      http://ftp.ctex.org/mirrors/CRAN/
// @description    Redirect CRAN website to its mirror in China.
// @include        http://cran.r-project.org/*
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace('cran.r-project.org/', 'ftp.ctex.org/mirrors/CRAN/');
})();
