// ==UserScript==
// @name            Grepolis city list extender
// @namespace       http://www.example.com
// @version         1.0
// @description     Make city list window larger.
// @include         http://*.grepolis.*/game/*
// @copyright       2013+, Alrekr
// ==/UserScript==

var w = typeof unsafeWindow == "object" ? unsafeWindow : window, $ = w.$;

$(function(){
    $('.btn_toggle_town_groups_menu').on('click',function(){
        w.setTimeout(function(){
            $('.group_towns').css({height:'640px'});
            $('.town_groups_list').css({height:'660px'});
        },350);
    });
});