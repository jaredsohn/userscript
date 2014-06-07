// ==UserScript==
// @name          AlkışlarlaYaşıyorum Anti-Reklam
// @author        http://userscripts.org/users/pskpt
// @description   AlkislarlaYasiyorum.com Sitesindeki Kendi Kendine Oynayan Videoları ve Reklamları Kaldırır.
// @icon          http://alkislarlayasiyorum.com/favicon.ico
// @date          2013/06/22
// @include       http://www.alkislarlayasiyorum.com/*
// @include       http://alkislarlayasiyorum.com/*
// @version       1.0
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @run-at        document-end
// @grant         GM_addStyle
// ==/UserScript==


jQuery.fn.exists = function(){return this.length>0;}
$(document).ready(function(){

if ($("div#etiketPlayer").exists()) {
    $("div#etiketPlayer").remove();
}

if ($("div#rek_display_1").exists()) {
    $("div#rek_display_1").remove();
}

if ($("div#rek_display_2").exists()) {
    $("div#rek_display_2").remove();
}

if ($("#rek_display_video").exists()) {
    $("#rek_display_video").remove();
}

if ($("div.side-most-watched").exists()) {
    $("div.side-most-watched").remove();
}

if ($("img[alt='Günün Popüleri']").exists()) {
    $("img[alt='Günün Popüleri']").remove();
}

if ($("div#zimbirti").exists()) {
    $("div#zimbirti").remove();
}

if ($("div#player_ad").exists()) {
    $("div#player_ad").remove();
}

if ($("div.side").find("#ay_player").exists()) {
    $("div.side").find("#ay_player").remove();
}


});