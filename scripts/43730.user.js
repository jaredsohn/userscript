// ==UserScript==
// @name           Lepra_float_update_button
// @namespace      vnizzz_float_but
// @description    Кнопка "Обновить комментарии" в нижнем правом углу экрана
// @include        http://*leprosorium.ru/comments/*
// ==/UserScript==


var post_number=document.URL.match(/^http:\/\/([a-zA-Z0-9\.]+)?leprosorium\.ru\/comments\/(\d+)\#?.*$/)[2];
var button = document.createElement('div');
button.style.fontSize='0.8em'
button.style.color='#666'; 
button.style.backgroundColor ="#ffffff";
button.style.position='fixed !important';
button.style.bottom='5 !important';
button.style.right='5 !important';
button.style.margin='0 !important';
button.style.padding='5px !important';
button.style.zIndex=3434;
//button.style.border='#993333 solid 1px';
button.innerHTML='[<a href="#" onclick="commentsHandler.refreshAll('+post_number+', {button:this}); return false;">обновить комментарии</a>]';

var comments=document.getElementById('js-commentsHolder');
comments.appendChild(button);