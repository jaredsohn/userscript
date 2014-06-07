// ==UserScript==
// @name           MCE Forum Tab in Toolbar
// @version        1.0.0
// @namespace      chris465glb
// @description    This will take you straight to the MCE forum
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=23">MCE</a>';
document.getElementById('toolbar').appendChild(myDiv);

