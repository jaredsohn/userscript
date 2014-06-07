// ==UserScript==
// @name           Lepra_float_update_button
// @namespace      vnizzz_float_but / random2 patch ;)
// @description    Кнопка "Обновить комментарии" в нижнем правом углу экрана
// @include        http://*leprosorium.ru/comments/*
// ==/UserScript==


var post_number=document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/comments\/(\d+)\#?.*$/)[2];
var b = document.createElement('div');
b.setAttribute('id','refreshbutton');
b.setAttribute('style','border: 0 none; position: fixed; bottom: 5px; right: 5px; padding: 5px; z-index: 9000');
b.innerHTML='[<span style="cursor: pointer" onclick="commentsHandler.refreshAll('+post_number+', {button:this}); return false;">обновить комментарии</span>]';

var comments=document.getElementById('main');
comments.appendChild(b);