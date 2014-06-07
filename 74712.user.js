// ==UserScript==
// @name        YoutubeProtectionRemover
// @include     http://www.youtube.com/*
// @description Removes lame protection on YouTube
// @copyright 2010, Snap
// ==/UserScript==

window.opera.addEventListener(
'BeforeScript',
function (ev){
ev.element.text = ev.element.text.replace("yt.flash.update(swfConfig, forceUpdate);","");
},

false);
//end