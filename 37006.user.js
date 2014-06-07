// ==UserScript==
// @name                Wikipedia AD remover
// @namespace           http://blog.gslin.org/plugins/hide-wikipedia-ad
// @description         Remove Wikipedia Advertisement
// @include             *://*.wikipedia.org/*
// @include             *://*.wikimedia.org/*
// @version             2011.0123.1
// ==/UserScript==

(function(){
    var n = document.getElementById('siteNotice');
    if (n) {
        n.style.display = 'none';
    }
})();
