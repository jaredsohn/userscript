// ==UserScript==
// @name           The VDA Brass Tab in GLB Toolbar
// @version        v1.0
// @namespace      .spider.
// @description    Puts VDA Brass tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=5351">Brass</a>';
document.getElementById('toolbar').appendChild(myDiv);