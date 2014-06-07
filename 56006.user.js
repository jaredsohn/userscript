// ==UserScript==
// @name  Bajar Video de Youtube
// @namespace  http://adrianvp.com.ar
// @description  User Script para Chrome / Youtube
// @include  http://www.youtube.com/watch*
// @match  http://www.youtube.com/watch*
// ==/UserScript==


var enlaces = document.getElementById("masthead-nav-user").innerHTML;
var VideoID = contentWindow.swfArgs['video_id'];
var vT = contentWindow.swfArgs['t'];
var f17 = '<a href="get_video?video_id='+VideoID+'&t='+vT+'&fmt=17">3gp&darr;</a>';
var f18 = '<a href="get_video?video_id='+VideoID+'&t='+vT+'&fmt=18">Mp4&darr;</a>';
var f22 = '<a href="get_video?video_id='+VideoID+'&t='+vT+'&fmt=22">HD&darr;</a>';
var links = f17 + f18 + f22;
document.getElementById("masthead-nav-user").innerHTML = links + enlaces;