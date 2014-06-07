// ==UserScript==
// @name           OGame Status
// @namespace      OGame Status
// @include        http://uni*.ogame.de/game/index.php?page=overview&session=*
// ==/UserScript==

/*
document.body.innerHTML = document.body.innerHTML.replace(
/\|Angriff\!/ig,
function(s){ u = 'angriff'; return s; })
*/

document.body.innerHTML = document.body.innerHTML.replace(
/\|.* ungelesene Nachricht/ig,
function(s){ t = s.replace('|','').replace('ungelesene Nachricht',''); return s; })

document.body.innerHTML = document.body.innerHTML.replace(
/Feindliche Aufträge\: .*/ig,
function(s){ alert(s); return s; })



/*
if (u == 'angriff') {
window.setTimeout('document.title = "Feindliche Flotte!"',1);
} else
*/

if (t > 0) {
window.setTimeout('document.title = "Neue Nachrichten!"',1);
}


alert('funzt');