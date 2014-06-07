// ==UserScript==
// @name           OGame Galaxy
// @namespace      OGame Galaxy
// @include        http://uni77.ogame.de/game/index.php?page=galaxy&*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(
/<a href="#" .* title="Phalanx">.*<\/a>/ig,
function(s){ return '<table width=100% height=100% style=background-color:green><td style=background-color:green align=center><font color=grey><b>&nbsp;'+s+'&nbsp;</td></table>'; });


