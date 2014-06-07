// ==UserScript==
// @name       Redirect Breaker
// @version    0.1
// @description  If you use AB+ or similar
// @copyright  2013+, Chippiewill and Common Sense
// @match http://www.habboxforum.com/*
// @require http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at document-start
// ==/UserScript==


$("document").ready( function() {
    $("script[src*='http://pagead2.googlesyndication.com/pagead/show_ads.js']").parent().remove();
});

$("script[src*='http://pagead2.googlesyndication.com/pagead/show_ads.js']").ready( function() {
    $("script[src*='http://pagead2.googlesyndication.com/pagead/show_ads.js']").parent().remove();
});