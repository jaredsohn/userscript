// ==UserScript==
// @name           Disable anonymous Wikipedia editing
// @namespace      http://userscripts.org/users/443901
// @include        http://*.wikipedia.org/*
// @include        https://*.wikipedia.org/*
// @include        http://*.wikimedia.org/*
// @include        https://*.wikimedia.org/*
// @include        http://*.wiktionary.org/*
// @include        https://*.wiktionary.org/*
// @include        http://*.wikinews.org/*
// @include        https://*.wikinews.org/*
// @include        http://*.wikiquote.org/*
// @include        https://*.wikiquote.org/*
// @include        http://wikisource.org/*
// @include        https://wikisource.org/*
// @include        http://*.wikisource.org/*
// @include        https://*.wikisource.org/*
// @include        http://*.wikiversity.org/*
// @include        https://*.wikiversity.org/*
// @include        http://*.wikibooks.org/*
// @include        https://*.wikibooks.org/*
// @include        http://*.wikidata.org/*
// @include        https://*.wikidata.org/*
// @include        http://*.wikivoyage.org/*
// @include        https://*.wikivoyage.org/*
// @include        http://*.mediawiki.org/*
// @include        https://*.mediawiki.org/*
// ==/UserScript==

if (document.getElementById("pt-login") !== null &&
	document.getElementById("ca-edit") !== null)
{
    document.getElementById("ca-edit").onclick = function() {
	    alert('Not currently logged in.');
	    return false;
    }
}
