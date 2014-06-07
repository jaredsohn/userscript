// ==UserScript==
// @name           The Cartel Leadership Tab in Toolbar
// @version        v1.0
// @namespace      TheBuck
// @description    Puts CL (Cartel Leadership) tab in the Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=793">CL</a>';
document.getElementById('toolbar').appendChild(myDiv);