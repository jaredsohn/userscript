// ==UserScript==
// @name           The CA (Cartel Agents) Tab in GLB Toolbar
// @version        v1.0
// @namespace      TheBuck
// @description    Puts abbr CA (Cartel Agents) instead of fulling spelling it out tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=12871">CA</a>';
document.getElementById('toolbar').appendChild(myDiv);