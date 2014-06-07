// ==UserScript==
// @name       Twitch NL
// @namespace  http://chooseneye.de
// @version    0.1
// @description  Redicted you to Twitch NL
// @copyright  2014+ , ChoosenEye
// @include			http://www.twitch.tv/*
// ==/UserScript==


window.setTimeout (function(){
path = window.location.href;
    path = path.replace(/h.+v/g, "http://nl.twitch.tv");

 document.location = path;
}, 1000);
