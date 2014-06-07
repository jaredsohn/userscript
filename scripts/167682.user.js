// ==UserScript==
// @name           CleanFightTips
// @description    Removes notices, don't have to scroll down every time.
// @author         jef
// @include        *.fighttips.com/*
// @version        1.0
// @grant	   none
// ==/UserScript==

var table = document.getElementById("notices");
if (table) {
    table.style.display = "none";
}

console.log('This script grants no special privileges, so it runs without security limitations.');