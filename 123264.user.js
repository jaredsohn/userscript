// ==UserScript==
// @name           Google+: Remove What's Hot
// @namespace      google+_remove_whats_hot
// @description    Removes What's Hot content from the Google+ stream and menu
// @include        https://plus.google.com/*
// ==/UserScript==

var menu_item = document.getElementsByClassName('dfrbjb');
var item = document.getElementsByClassName('zhMuaf');

menu_item[0].style.visibility = 'hidden';
menu_item[0].style.height = '0';

item[0].style.visibility = 'hidden';
item[0].style.height = '0';
item[0].style.overflow = 'hidden';