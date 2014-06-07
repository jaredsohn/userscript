// ==UserScript==
// @name           TW Fix
// @description    Some small fixes to TEH WARRiORS's website.
// @version        1.2.1
// @author         Ylar
// @include        http://tehwarriors.net/*
// @include        http://www.tehwarriors.net/*
// @include        http://forum.tehwarriors.net/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @update         http://userscripts.org/scripts/source/172702.user.js
// @grant          all
// ==/UserScript==

$(function(){
    $("#submenu_servrar").css({
        "border-left": "1px solid #FFF",
        "border-right": "1px solid #FFF",
        "border-bottom": "1px solid #FFF"
    });
    $("#submenu_foreningen").css({
        "border-left": "1px solid #FFF",
        "border-right": "1px solid #FFF",
        "border-bottom": "1px solid #FFF"
    });
    
    $("html,body").css("background", "#003D7C url('http://tehwarriors.net/images/watermark.png') center center no-repeat");
    $("#header").css("background", "url('http://tehwarriors.net/images/header.png') center top no-repeat");
    $('#header img').attr('src',function(i,e){
        return e.replace("/images/logo_halloween.png","/images/logo.png");
    });
    $('#header img').attr('src',function(i,e){
        return e.replace("http://forum.tehwarriors.net/Themes/tw2_halloween/images/logo.png","http://tehwarriors.net/images/logo.png");
    });
});
