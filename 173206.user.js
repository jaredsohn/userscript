// ==UserScript==
// @name           The Cartel Agents Tab in GLB Toolbar
// @version        v1.0
// @namespace      TheBuck
// @description    Puts Cartel Agents tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=12871">Cartel Agents</a>';
document.getElementById('toolbar').appendChild(myDiv);