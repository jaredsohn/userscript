// ==UserScript==
// @name           OGame 10X COBALT
// @namespace      OGame 10X COBALT
// @include        http://electra.ogame.de/game/*
// ==/UserScript==




document.body.innerHTML = document.body.innerHTML.replace(
/ Metallmine.*/ig,
function(s){ alert(s); return s; });

