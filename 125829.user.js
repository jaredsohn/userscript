// ==UserScript==
// @name           The DWO Tab in GLB Toolbar
// @version        v1.0
// @namespace      EvilVoodoo77
// @description    Puts DWO tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=10050">DWO</a>';
document.getElementById('toolbar').appendChild(myDiv);