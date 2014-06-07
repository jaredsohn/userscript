// ==UserScript==
// @name           lolgm Trophy Whores Tab in GLB Toolbar
// @version        1.0.0
// @namespace      ErDrRon
// @description    This places a lolgm Trophy Whores tab in the GLB Toolbar that takes you directly to the lolgm Trophy Whores Forum when pressed.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=0&team_id=6144">Whores</a>';
document.getElementById('toolbar').appendChild(myDiv);
