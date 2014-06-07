// ==UserScript==
// @name           ex.ua no ads
// @namespace      by Koss
// @description    Просмотр видео без рекламы на сайте http://ex.ua
// @include        http://www.ex.ua/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
    var watch_online_link = $(".r_button a");
    var watch_link = $(".r_button_small a");
    var state = GM_getValue("ex_ua_no_ads", 0);
    
    if ($("#ad_block").length > 0) $("#ad_block").remove();
    
    if (state == 1) {
        GM_setValue("ex_ua_no_ads", 0);
        window.setTimeout("play_online()", 500);
    }
    
    watch_online_link.click(function() {
        if (state == 0) {
            window.setTimeout(function() { 
                if ($("#player_tick").length > 0) {  
                    GM_setValue("ex_ua_no_ads", 1);
                    window.location.reload();
                }  
            }, 3000);
        }
    });
    
    watch_link.click(function() {
        if (state == 0) {
            window.setTimeout(function() { 
                if ($("#player_tick").length > 0) {  
                    GM_setValue("ex_ua_no_ads", 1);
                    window.location.reload();
                }  
            }, 3000);
        }
    });
});