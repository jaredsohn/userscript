// ==UserScript==
// @name           wikipedia banner
// @description    removes the banner from wikimedia sites
// @version        1.1
// @include        http://*.wikipedia.org/*
// @include        https://*.wikipedia.org/*
// @include        http://*.wikimedia.org/*
// @include        https://*.wikimedia.org/*
// @include        http://*.wikibooks.org/*
// @include        https://*.wikibooks.org/*
// @include        http://*.wikinews.org/*
// @include        https://*.wikinews.org/*
// @include        http://*.wikiquote.org/*
// @include        https://*.wikiquote.org/*
// @include        http://*.wikisource.org/*
// @include        https://*.wikisource.org/*
// @include        http://*.wikiversity.org/*
// @include        https://*.wikiversity.org/*
// @include        http://*.wiktionary.org/*
// @include        https://*.wiktionary.org/*
// @include        http://www.mediawiki.org/*
// @include        https://www.mediawiki.org/*
// @include        http://wikimediafoundation.org/*
// @include        https://wikimediafoundation.org/*
// @include        http://www.wikimediafoundation.org/*
// @include        https://www.wikimediafoundation.org/*
// ==/UserScript==

(function(){
    var e = document.getElementById('siteNotice');
    if (e) e.parentNode.removeChild(e);
})();
