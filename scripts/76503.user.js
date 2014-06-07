// ==UserScript==
// @name           War of Legends Remove log out bar.
// @namespace      http://www.legendshq.com
// @description    Gets rid of the War of Legends log out bar.
// @include        http://services.jagex.com/m=wol-bridge/g=waroflegends/*
// ==/UserScript==


document.getElementById("header_bar").style.display = "none";
document.getElementById("wol_frame").style.height = "100%";
