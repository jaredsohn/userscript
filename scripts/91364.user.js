// ==UserScript==
// @name          Hide Wikipedia Site Notices
// @namespace     Morden - http://morden.blog.shinobi.jp
// @description   Hides banners on Wikipedia
// @include       http://mediawiki.org/*
// @include       https://mediawiki.org/*
// @include       http://*.mediawiki.org/*
// @include       https://*.mediawiki.org/*
// @include       http://wikibooks.org/*
// @include       https://wikibooks.org/*
// @include       http://*.wikibooks.org/*
// @include       https://*.wikibooks.org/*
// @include       http://wikimedia.org/*
// @include       https://wikimedia.org/*
// @include       http://*.wikimedia.org/*
// @include       https://*.wikimedia.org/*
// @include       http://wikimediafoundation.org/*
// @include       https://wikimediafoundation.org/*
// @include       http://*.wikimediafoundation.org/*
// @include       https://*.wikimediafoundation.org/*
// @include       http://wikinews.org/*
// @include       https://wikinews.org/*
// @include       http://*.wikinews.org/*
// @include       https://*.wikinews.org/*
// @include       http://wikipedia.org/*
// @include       https://wikipedia.org/*
// @include       http://*.wikipedia.org/*
// @include       https://*.wikipedia.org/*
// @include       http://wikiquote.org/*
// @include       https://wikiquote.org/*
// @include       http://*.wikiquote.org/*
// @include       https://*.wikiquote.org/*
// @include       http://wikisource.org/*
// @include       https://wikisource.org/*
// @include       http://*.wikisource.org/*
// @include       https://*.wikisource.org/*
// @include       http://wikiversity.org/*
// @include       https://wikiversity.org/*
// @include       http://*.wikiversity.org/*
// @include       https://*.wikiversity.org/*
// @include       http://wiktionary.org/*
// @include       https://wiktionary.org/*
// @include       http://*.wiktionary.org/*
// @include       https://*.wiktionary.org/*
// ==/UserScript==

document.getElementById("siteNotice").style.display = "none";