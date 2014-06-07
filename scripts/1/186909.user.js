// ==UserScript==
// @name        gude
// @namespace   gude
// @include     http://www.17gude.com/*
// @version     1
// @grant       none
// @author		jaywei
// @require       http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==    
$(function () {
    $("a[href^='tencent://message/?uin=']")
    .each(function(){ 
        var href = $(this).attr('href').replace('tencent://message/?uin=', 'http://wpa.qq.com/msgrd?v=3&uin=');
        $(this).attr("href", href);
    });
});
