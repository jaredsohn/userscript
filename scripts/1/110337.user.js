// ==UserScript==
// @name           Aвтообновление комментариев на Championat.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace      http://userscripts.org/users/386336
// @include        http://www.ua.championat.com/*
// @include        http://www.championat.com/*
// @include        http://ua.championat.com/*
// @include        http://championat.com/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
$('.b-comments').append('<br><div align="center"><b><a onclick="javascript:this.innerHTML=\'обновляется\';setInterval(function() { $(\'#commentsList\').load(jQuery(location).attr(\'href\')+\' #commentsList\')},20000);">Вкл. Автообновление</a></div>');
$('.b-comments').append( $('#commentForm'));
$('.b-comments').append( $('#commentAction'));