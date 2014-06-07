// ==UserScript==
// @name           sg_transfer
// @namespace      sg
// @description    sg
// @include        http://*sguni.pl/pages/stargate_transfer.seam*
// ==/UserScript==

// USTAWIENIA
var value = 2000000;

var transfer = document.getElementById("transfer");
transfer.value = value;

