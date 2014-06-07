// ==UserScript==
// @name           Free Agents in GLB Toolbar
// @version        v1.0
// @namespace      EvilVoodoo77
// @description    Puts PLFT tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6">PLFT</a>';
document.getElementById('toolbar').appendChild(myDiv);