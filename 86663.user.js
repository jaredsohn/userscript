// ==UserScript==
// @name           Combine Tab in GLB Toolbar
// @version        1.0.0
// @namespace      ErDrRon
// @description    This places a Combine tab in the GLB Toolbar that takes you directly to the Combine Network Forum when pressed.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=2274">Combine</a>';
document.getElementById('toolbar').appendChild(myDiv);
