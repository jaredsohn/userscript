// ==UserScript==
// @name        Aftenposten - Remove related article links
// @namespace   http://fjaer.com/grease/aftenposten-remove-related-article-links
// @include     http://www.aftenposten.no/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

$(document).ready(function () {
    $(".relationArticle").hide();
    $(".widget.dateline.article").append('<a id="showRelatedArticles" href="javascript:" onclick="javascript:$(\'.relationArticle\').show(); $(\'#showRelatedArticles\').hide(); return false;">Vis relaterte artikler</a>');
});