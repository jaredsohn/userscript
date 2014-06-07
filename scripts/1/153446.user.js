// ==UserScript==
// @name        Force SSL Elegantly
// @namespace   gekkou_userscripts
// @description Force the browser to load the page using HTTPS. Occurs before the page is loaded, so it's both time and bandwith efficient, and it adds a potential layer of privacy as well. Extremely simple yet efficient design; it's just one line! Add sites that support SSL to the inclusion list. =)
// @include     http://*.wikimedia.org/*
// @include     http://wikimediafoundation.org/*
// @include     http://*.wikipedia.org/*
// @include     http://*.wiktionary.org/*
// @include     http://*.wikiquote.org/*
// @include     http://*.wikibooks.org/*
// @include     http://*.wikisource.org/*
// @include     http://*.wikinews.org/*
// @include     http://*.wikiversity.org/*
// @include     http://*.mediawiki.org/*
// @include     http://*.4shared.org/*
// @include     http://*.4chan.org/*
// @grant       none
// @run-at      document-start
// @version     1.0
// ==/UserScript==

location.protocol = "https";
