// ==UserScript==
// @name        FetLife direct link enchancement
// @namespace   https://fetlife.com
// @include     https://fetlife.com/users/*/pictures/*
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
    var url = $('span.fake_img').css('background-image');
    url = url.replace('url("','');
    url = url.replace('")','');
    
    var link = "<a href='"+url+"' target='_blank'>Direct Link</a>";
    $('section.back_and_forward.clearfix').append(link);
});