// ==UserScript==
// @name        låtmigläsa
// @namespace   loading.se
// @include     http://*.sydsvenskan.se/
// @include     http://*.sydsvenskan.se/*
// @version     .1
// @grant       none
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
// contact: yelo@yaoi.se

var $ = unsafeWindow.jQuery;

$(document).ready(function(){
    if($(".gloom")) {
        $(".meteredlimit").css({"max-height": "100%"});
        $(".gloom").css({"display": "none"});
    };
});