// ==UserScript==
// @name        Rewrite url
// @namespace   d
// @description Rewrite url epubgratis
// @include     http://epubgratis.me/*
// @exclude     http://*
// @version     1
// @grant       url
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==



$(document).ready(function() {
    var href = $(".eBook_magnet").attr("href");
    var newHref = href.replace('http://m.zbigz.com/myfiles?url=', '');
    
    $(".eBook_magnet").attr("href",newHref);
    
});

