// ==UserScript==
// @name           Addicts Tab in GLB Toolbar
// @version        1.0.0
// @namespace      CampPen33
// @description    This places an Addicts tab in the GLB Toolbar that takes you directly to the GLB Addicts Forum when pressed.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=358">Addicts</a>';
document.getElementById('toolbar').appendChild(myDiv);