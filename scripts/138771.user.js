// ==UserScript==
// @name        إخفاء الإعلانات الجانبية وصور المعلقين في فيسبوك ويوتيوب
// @namespace   إخفاء الإعلانات الجانبية وصور المعلقين في فيسبوك ويوتيوب
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     3
// ==/UserScript==
var unsafeWindow = unsafeWindow || null;
var doc = (unsafeWindow || window).document;
var cs = doc.createElement("style");

cs.setAttribute("type", "text/css");
cs.innerHTML = "img.UFIActorImage,.ego_column,img.friendPhoto,.watch-sidebar-section{visibility:hidden}" +
               ".img,.yt-thumb-clip-inner{opacity:0.1} .img:hover,div:hover>.img,a:hover>.img,.yt-thumb-clip-inner:hover{opacity:1}";
doc.querySelector("head").appendChild(cs);