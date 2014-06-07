// ==UserScript==
// @name           The VDA Tab in GLB Toolbar
// @version        v1.0
// @namespace      .spider.
// @description    Puts VDA tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=1875">VDA</a>';
document.getElementById('toolbar').appendChild(myDiv);