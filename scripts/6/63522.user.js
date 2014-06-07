// ==UserScript==
// @name           Include comment imgs on Reddit
// @namespace      reddit
// @include        http:/*.reddit.com/*/comments/*
// @include        http://reddit.com/*/comments/*
// @include        https:/*.reddit.com/*/comments/*
// @include        https://reddit.com/*/comments/*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var x = $(".content").find("a").each(function() {
    var href = $(this).attr("href");
    if ((!$(this).hasClass("drowsapMorphed")) 
    && ($(this).next(".drowsapMorphed").length==0)
    && (!$(this).hasClass("reddit-link-title")) 
    && (!$(this).hasClass("thumbnail")) 
    && href
    && (href.indexOf('imgur.com/')>=0 || href.indexOf('jpeg')>=0 || href.indexOf('jpg')>=0 || href.indexOf('png')>=0)){
        var ext = (href.indexOf('imgur')>=0 && href.indexOf('jpg')<0 && href.indexOf('png')<0) ? '.jpg' : '';
        var img = $("<a class='drowsapMorphed' href='" + href + "' target='blank' style='display:block'><img style='display:block;max-width:780px;' src='" + href + ext + "' /></a>");
        $(this).after(img);
    }
});