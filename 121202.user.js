// ==UserScript==
// @name           Dotball Syndicate Tab in GLB Toolbar
// @version        v1.0
// @namespace      ErDrRon updated by supahfli
// @description    Puts DS tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=917">Dotball Syndicate</a>';
document.getElementById('toolbar').appendChild(myDiv);