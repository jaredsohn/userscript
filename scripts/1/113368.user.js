// ==UserScript==
// @name           Navigators Tab in GLB Toolbar
// @version        v1.0
// @namespace      ErDrRon updated by supahfli, thefted by Butte Pirate
// @description    Puts Navigators tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=602">Navigators</a>';
document.getElementById('toolbar').appendChild(myDiv);