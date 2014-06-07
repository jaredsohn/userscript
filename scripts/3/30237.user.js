// ==UserScript==
// @name           nicovideo Synchronized Fullscreen
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    When window becomes fullscreen, set movie player fullsize.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

var flvplayer = document.getElementById('flvplayer');
if(!flvplayer)
    return;
flvplayer = flvplayer.wrappedJSObject;

window.addEventListener('resize', function(e) {
    if(window.fullScreen)
        flvplayer.ext_setVideoSize('fit');
    else
        flvplayer.ext_setVideoSize('normal');
}, false);