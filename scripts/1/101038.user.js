// ==UserScript==
// @name           VOLS Forum Tab in Toolbar
// @version        1.0.0
// @namespace      chris465glb
// @description    This will take you straight to the VOLS forum
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=1359">VOLS</a>';
document.getElementById('toolbar').appendChild(myDiv);

