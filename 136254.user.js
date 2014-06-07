// ==UserScript==
// @name        16:9 GameOne-Player
// @namespace   gameone
// @description Gibt dem Player in TV & Playtube-Beiträgen die volle Breite
// @include     http://www.gameone.de/tv/*
// @include     http://www.gameone.de/playtube/*
// ==/UserScript==

var $ = unsafeWindow.$;
$('#show-video, #video_wrapper').css('float','none');
$('#show-video embed, #video_wrapper embed').attr('width','923px').attr('height', '520px');
$('#show-site, #playtube_video').css('width','923px');
