// Original by: TheMagicN
// ==UserScript==
// @name          Youtube video in tab
// @namespace     http://www.youtube.com/user/TheMagicn
// @description   Instead of opening a video in the current tab it will open it in a new tab.
// @include       *://*.youtube.*/*
// @version       1.0.0 RC 
// ==/UserScript==
startScript();
function startScript()
{
    addAttb();
}
function addAttb()
{
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) 
    { 
        var check = links.item(i).getAttribute("class");
        if(check == "feed-video-title title yt-uix-contextlink  yt-uix-sessionlink" || check == "ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink " || check == "related-video yt-uix-contextlink  yt-uix-sessionlink" || check == "yt-uix-sessionlink")
        {
            links.item(i).setAttribute("target","_blank");
        }
    }
}