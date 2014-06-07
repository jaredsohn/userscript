// ==UserScript==
// @name           OGame NewUni
// @namespace      OGame NewUni
// @include        http://ogame.de/
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(
/uni108.ogame.de/ig,function(s){ alert('Uni Hydra laueft!'); return s; });