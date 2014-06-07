// ==UserScript==
// @name           FTVO 2 PopStream
// @description    This script redirects the megavideo hosted videos on Project Free TV to PopStream thereby bypassing the 72minutes timelimit
// @author         Popeen
// @website         http://www.MrPopeen.com
// @include        *free-tv-video-online.me/player/megavideo.php?id=*
// @version        2.0
// ==/UserScript==

var get = top.location.href.split('id=');
var idwt = get[1].split('&');
var id=idwt[0];
window.location = 'http://www.popstream.tk/play.php?server=9&mvId='+id
