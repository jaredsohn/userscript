// ==UserScript==
// @name           Autolink Subreddits
// @namespace      http://blog.dp.cx/tag/userscripts
// @include        http://www.reddit.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;

$("p:contains('/r/')").each(function() {

    var existing_html = $(this).html();
    existing_html = existing_html.replace(/(\W)\/r\/(.*?)(\W)/, '$1<a href="/r/$2">/r/$2</a>$3');
    
    $(this).html(existing_html);
});
