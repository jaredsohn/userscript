// ==UserScript==
// @name           HT and VOLS Forum Tabs in Toolbar
// @version        1.0.0
// @namespace      sab
// @description    This will take you straight to the Hostile Takeover and Vols Forums
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=1839">HT</a>';
document.getElementById('toolbar').appendChild(myDiv);

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=716">VOLS</a>';
document.getElementById('toolbar').appendChild(myDiv);