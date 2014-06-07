// ==UserScript==
// @name           GlobeDotters MGT Forum Tab in GLB Toolbar
// @version        1.0.0
// @namespace      ErDrRon edited by Supahfli
// @description    This places a GlobeDotters MGT tab in the GLB Toolbar that takes you directly to the GlobeDotters MGT Forum when pressed.  You must be a member of the GlobeDotters MGT and have access to the forum or you will receive an error.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=1572&team_id=0">GlobeDotters MGT</a>';
document.getElementById('toolbar').appendChild(myDiv);
