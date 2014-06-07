// ==UserScript==
// @name       Ilbe S3 Accesser
// @namespace  eazy
// @version    0.6
// @description  Simple Ilbe Connecter
// @match      http://s7.ilbe.com/*
// @include    http://s7.ilbe.com/*
// @require    http://code.jquery.com/jquery-latest.js
// @copyright  2013+, ez
// ==/UserScript==
$("a").each(function(idx, html_obj) {
    var obj = $(html_obj);
    var href = obj.attr("href");
    
    if (typeof href !== 'undefined' && href !== false)
    	obj.attr("href", href.replace("www.ilbe.com", "s7.ilbe.com"));
});
$("img").each(function(idx, html_obj) {
    var obj = $(html_obj);
    var src = obj.attr("src");
    
    if (typeof src !== 'undefined' && src !== false)
    	obj.attr("src", src.replace("www.ilbe.com", "s7.ilbe.com"));
});