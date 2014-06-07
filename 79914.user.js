// ==UserScript==
// @name           FLV Player for Wrzuta.pl
// @namespace      http://userscripts.org/users/105735
// @include        http://*wrzuta.pl/film/*
// ==/UserScript==
var rrr = document.getElementById('file_info_media');
linkbs = document.location.href.replace(/film/, 'sr/v');

rrr.innerHTML = '<object type="application/x-shockwave-flash" data="http://dl.dropbox.com/u/663319/player_flv_maxi.swf" width="500" height="400"><param name="movie" value="http://dl.dropbox.com/u/663319/player_flv_maxi.swf" /><param name="FlashVars" value="flv='+linkbs+'&showvolume=1&showtime=1" /></object><h2 style="margin:50px;">Odwiedź <a href="http://blog.piklus.pl">http://blog.piklus.pl</a></h2>';

