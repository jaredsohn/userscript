// ==UserScript==
// @name           bilibili ad terminator
// @namespace      http://bilibili.us/video/*
// @description    no more ads on bilibili.us!
// @include        http://bilibili.us/video/*
// @author         wecing
// @version        0.1
// ==/UserScript==

var sf = document.getElementById("contgg1").parentNode;
if(sf)
{
    sf.parentNode.removeChild(sf);
}
