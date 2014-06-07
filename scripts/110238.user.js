// ==UserScript==
// @author         Vladan88
// @name           Автообновлениe комментариев на Football.ua
// @include        http://football.ua/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
document.getElementsByClassName('glink tbutright')[0].innerHTML+='<div></div><a onclick="javascript:this.innerHTML=\'обновляется\';setInterval(function() { $(\'.wbcc:eq(1)\').load(jQuery(location).attr(\'href\')+\' .wbcc:eq(1)\')},20000);">Вкл. Автообнов.</a>';

