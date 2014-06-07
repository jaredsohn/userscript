// ==UserScript==
// @name           Battlelog Friends Request Auto-Fold
// @namespace      http://techexplored.com
// @version        0.1
// @description    Folds the friend requests list by default
// @include        http://battlelog.battlefield.com/bf3/*
// ==/UserScript==

var div = document.getElementById("comcenter-friendrequests-separator");

if(div.className == "comcenter-separator showing-friendrequests") {
	var arrow = div.getElementsByClassName("dropdownicon")[0];
    arrow.click();
}