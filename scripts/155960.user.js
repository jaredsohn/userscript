// ==UserScript==
// @name        senselessTV Plugin hax0r
// @namespace   senseless
// @include     http://senseless.tv/*
// @version     2.0
// @grant       none
// @copyright  2013+, Michael Nowak
// ==/UserScript==
    
var $ = unsafeWindow.jQuery;
$(document).ready(function(){
    setTimeout(function(){
        $('.black_box').hide();
        $('#noplugin_ok').show();
    }, 3500);
});