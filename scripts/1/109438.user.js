// ==UserScript==
// @name           Black Sea Society Tab in GLB Toolbar
// @version        v1.0
// @namespace      ErDrRon updated for BSS by chefsjg71
// @description    Puts Black Sea Society tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=10011&team_id=0">Black Sea Society</a>';
document.getElementById('toolbar').appendChild(myDiv);