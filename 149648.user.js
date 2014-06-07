// ==UserScript==
// @name           The VDA Agent Tab in GLB Toolbar
// @version        v1.0
// @namespace      .spider.
// @description    Puts VDA Agent tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=356">Agent</a>';
document.getElementById('toolbar').appendChild(myDiv);