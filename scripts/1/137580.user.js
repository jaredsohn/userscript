// ==UserScript==
// @name        HOOD
// @namespace   Hood Boss
// @description Hood
// @include     http://goallineblitz.com/game/*
// @version     1
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=11664">HOOD</a>';
document.getElementById('toolbar').appendChild(myDiv);