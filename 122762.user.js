// ==UserScript==
// @name           STEEL Faction Tab in GLB Toolbar
// @version        v1.0a
// @namespace      ErDrRon updated for Faction by Sedator
// @description    Puts STEEL Faction tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=11890&team_id=0">STEEL Faction</a>';
document.getElementById('toolbar').appendChild(myDiv);