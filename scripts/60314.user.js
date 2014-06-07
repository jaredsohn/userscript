// ==UserScript==
// @name           FixFML
// @namespace      FML
// @description    Gets rid of those god awful links in the paragraphs
// @include        http://www.fmylife.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(".fmllink").each(function() {
    $(this).parent().append($(this).text());
    $(this).remove();
});
