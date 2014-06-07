// ==UserScript==
// @name           Black STEEL Tab in GLB Toolbar
// @version        v1.0
// @namespace      ErDrRon updated for BSS by chefs
// @description    Puts Black Sea Society tab in the GLB Toolbar
// @include        http://goallineblitz.com/game/*
// @date           10/2/2012
// ==/UserScript==

var myDiv = document.createElement("div");
myDiv.innerHTML = '<a class="toolbar_item" href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=1776&team_id=0">Black STEEL</a>';
document.getElementById('toolbar').appendChild(myDiv);