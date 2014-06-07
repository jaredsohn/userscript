// ==UserScript==
// @name           GLB Addicts HardCore Forum Tab in GLB Toolbar
// @version        1.0.0
// @namespace      ErDrRon edited by lizrdgizrd
// @description    This places an HardCore tab in the GLB Toolbar that takes you directly to the GLB Addicts HardCore Forum when pressed.  You must be a member of the GLB Addicts and have access to the forum or you will receive an error.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=11594&team_id=0">HardCore</a>';
document.getElementById('toolbar').appendChild(myDiv);
