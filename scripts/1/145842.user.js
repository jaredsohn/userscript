// ==UserScript==
// @name           bilibili profile block
// @namespace  mx147536982.blogspot.com/
// @description  隐藏bilibili视频TAG及简介，点击展开查看。
// @include        http://www.bilibili.tv/video/*
// @include        http://bilibili.kankanews.com/video/*
// @version        1.22
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


GM_addStyle("div.intro{display:none;}"+
                          "div.quote{display:none;}"+
                          "ul.tag{display:none;}"+
                          "#open-profile { font-size: 14px; line-height: 40px !important; margin-left: 6%; }"+
                          "#open-profile:hover{ cursor: pointer !important;}" );

$(function() {
    $('div.s_center').append('<a id="open-profile" class="jfk-button-standard">点此展开查看TAG及简介</a>');
    $('#open-profile').click(function() {
        $('div.intro').slideToggle();
        $('ul.tag').slideToggle();
        return false;
    });
}); 