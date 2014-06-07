// ==UserScript==
// @name          iGoogle with no tabs
// @namespace     http://webspot.mx/grease/igoogle
// @description   Remove the tabs column
// @include       http://*google.com/*
// ==/UserScript==

document.getElementById("col1").style.display = "none";
document.getElementById("footerwrap").style.display = "none";