// ==UserScript==
// @name           The Cartel Team Management Tab in GLB Toolbar
// @version        v1.0
// @namespace      TheBuck
// @description    Puts Cartel Team Management tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=12901">CTM</a>';
document.getElementById('toolbar').appendChild(myDiv);