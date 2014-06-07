// ==UserScript==
// @name        Additional menu
// @namespace   zx.pk.ru
// @include     http://zx.pk.ru/*
// @include     http://zx-pk.ru/*
// @include     http://zx-pk.ru/*
// @include     http://www.zx-pk.ru.*
// @include     http://www.zx.pk.ru/.*
// @exclude     */newattachment.php*
// @exclude     */misc.php?do=getsmilies*
// @version     0.08
// @grant       none
// ==/UserScript==

var newMenu = document.createElement("div");

newMenu.innerHTML = '<div>' +
'<a href="/misc.php?do=cybstats&resultsnr=30">Последние сообщения<a> | ' +
'<a href="/forumdisplay.php?do=markread"><span style="color:red">Всё прочитано</span><a>' +
'</div>';

var oldMenu = document.getElementsByClassName("alt2")[0].lastChild;
oldMenu.parentNode.insertBefore(newMenu, oldMenu.nextSibling);