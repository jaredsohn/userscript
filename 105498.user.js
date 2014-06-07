// ==UserScript==
// @name           Commission Forum Tab in GLB Toolbar
// @version        1.0.0
// @namespace      ErDrRon edited by JLevesque
// @description    This places a Commission tab in the GLB Toolbar that takes you directly to the Commission Forum when pressed.  You must be a member of the Commission and have access to the forum or you will receive an error.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=7524&team_id=0">Commission</a>';
document.getElementById('toolbar').appendChild(myDiv);
