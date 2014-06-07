// ==UserScript==
// @name           NicoVideo Quality Config
// @namespace      http://endflow.net/
// @description    Configures quality of flash player on NicoVideo.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==
(function(){
var cfg = {quality: 'low'};
var cont = document.getElementById('flvplayer_container');
cont.innerHTML = cont.innerHTML.replace(/quality="high"/i, 'quality="'+cfg.quality+'"');
})();