// ==UserScript==
// @name           Play first audio 
// @description    Play first audio in vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==

first=document.getElementsByClassName('playimg');
if (first[0]) {
setTimeout(first[0].getAttribute('onclick').substring(7), 0);
}