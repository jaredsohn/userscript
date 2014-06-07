// ==UserScript==
// @name                [TS] Youtube Load More Channel Videos
// @namespace           TimidScript
// @description         Auto loads more videos in channel
// @include             http://www.youtube.*/user/*
// @include             https://www.youtube.*/user/*
// @include             http://www.youtube.*/channel/*
// @include             https://www.youtube.*/channel/*
// @version             1.0.2
// @require             http://userscripts.org/scripts/source/159301.user.js
// @resource  meta      http://userscripts.org/scripts/source/176454.meta.js
// @icon                data:image/gif;base64,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
// @versioninfo         Initial Release
// ==/UserScript==


/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/176454

----------------------------------------------
    Version History
----------------------------------------------
1.0.1 (2013/07/08)
 - Initial Release

********************************************************************************************/


var scrollOffset = 1000;
var intervalID = setInterval(ScrollPosition, 250)

function ScrollPosition() {
    if ((window.scrollMaxY - window.scrollY) < scrollOffset)
    {        
        LoadMoreVideos();
    }
}

function LoadMoreVideos() {
    var loadMore = document.getElementsByClassName("yt-uix-load-more load-more-button yt-uix-button yt-uix-button-default");
    if (loadMore.length == 0) loadMore = document.getElementsByClassName("more-videos yt-uix-button yt-uix-button-default");

    if (loadMore.length > 0) {
        loadMore = loadMore[0]
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        loadMore.dispatchEvent(evt);
    }
    else clearInterval(intervalID);
}