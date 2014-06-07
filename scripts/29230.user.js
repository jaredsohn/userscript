// ==UserScript==
// @name           Better Habrahabr.Ru 1.0
// @namespace      http://userscripts.org
// @description    No right panel (Last comments & Tag Cloud)
// @include        http://*habrahabr.ru/*
// ==/UserScript==

document.getElementById("content").removeChild(document.getElementById("right"));
document.getElementById("left").style.marginRight = "0";