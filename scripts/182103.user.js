// ==UserScript==
// @name        чат справа
// @namespace   aga
// @include     http://klavogonki.ru/*
// @version     1
// @grant       none
// ==/UserScript==

var $j=jQuery.noConflict();

var cc=$j('#chat-container');
cc.css("width", 700);
cc.css("right", 0);
cc.css("left", 'auto');

var chatheight=screen.height-500;


var mc=$j('.messages-content');
mc.css("height", chatheight);
mc.css("min-height", 500);


var userlist=$j('.userlist-content');
userlist.css("height", chatheight);