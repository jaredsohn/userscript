// ==UserScript==
// @name           DWO Forum Tab in GLB Toolbar
// @version        1.0.0
// @namespace      crohllf
// @description    This places an DWO tab in the GLB Toolbar that takes you directly to the DWO Forum when pressed.  You must be a member of the DWO and have access to the forum or you will receive an error.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread.pl?thread_id=4415664">DWO</a>';
document.getElementById('toolbar').appendChild(myDiv);
