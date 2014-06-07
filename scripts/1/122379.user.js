// ==UserScript==
// @name           The Commission Tab in GLB Toolbar
// @version        v1.0
// @namespace      ErDrRon updated by supahfli updated by fishdan
// @description    Puts Commission tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=7524">The Commission</a>';
document.getElementById('toolbar').appendChild(myDiv);