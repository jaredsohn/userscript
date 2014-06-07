// ==UserScript==
// @name       Youtube in-sync button
// @version    1.1
// @namespace  http://sync-video.com/
// @include      http://youtube.com/*
// @include      http://www.youtube.com/*
// @include      https://www.youtube.com/*
// @include 	 https://youtube.com/*
// @homepageURL http://userscripts.org/scripts/show/174670
// @updateURL  http://userscripts.org/scripts/source/174670.meta.js
// @downloadURL    http://userscripts.org/scripts/source/174670.user.js
// @description  Adds button to watch youtube videos in sync with friends
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @copyright  2013+, Digifist - Bugari
// ==/UserScript==


$(function(){
 var button = $('<span id="sync-button" style="text-align: right;float: right;"><button type="button" onclick=";return false;" class="share-email-send yt-uix-button yt-uix-button-primary yt-uix-button-size-default">Watch in-sync</button></span>');
    button.click(function(){
        var goodProp = $("meta[itemprop='videoId']").first()
        if(goodProp.length > 0){
            window.open("http://sync-video.com/watch?v="+goodProp.get(0).content)
        }
    });
 
 $("h1#watch-headline-title").append(button);
});