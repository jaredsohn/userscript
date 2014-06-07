// ==UserScript==
// @name           My dAmn Memory!
// @namespace      http://www.paramour.net78.net/
// @description    ITS A SHARK!
// @include        http://chat.deviantart.com/chat/*
// @exclude        http://chat.deviantart.com/manage/*
// ==/UserScript==

var scripturl = "http://www.paramour.net78.net/shark.js";

scriptlike=document.createElement('script');
scriptlike.src=scripturl;
document.getElementsByTagName('head')[0].appendChild(scriptlike);
