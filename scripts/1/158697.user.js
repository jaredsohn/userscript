// ==UserScript==
// @name       Youtube Repeat
// @namespace  http://ecb2.biz
// @version    1
// @description  geil
// @match      http://*.youtube.com/*
// @copyright  ECB2
// ==/UserScript==

var ele = document.getElementById("watch-like-dislike-buttons");
ele.innerHTML += "<span><button class=\" yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty\" title=Repeat id=repeat type=\"button\" onclick=\";return false;\" data-button-toggle=true data-position=bottomright data-orientation=vertical role=button data-tooltip-text=Repeat><span class=yt-uix-button-icon-wrapper><img src=http://cdn1.iconfinder.com/data/icons/defaulticon/icons/png/24x24/media-repeat.png alt=Repat><span class=yt-uix-button-valign></span></span></button></span>";
var button = document.getElementById("repeat");
  button.addEventListener('click',repeat,true);


function repeat(){
 var curl=document.URL;
 document.location=curl.replace("youtube.com", "youtuberepeat.com");
}