// ==UserScript==
// @name           Detroit Reservoir Dogs Tab in GLB Toolbar
// @version        v1.0
// @namespace      chefsjg71
// @description    Puts Detroit Reservoir Dogs tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=6438&team_id=0">Reservoir Dogs</a>';
document.getElementById('toolbar').appendChild(myDiv);