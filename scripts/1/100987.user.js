// ==UserScript==
// @name           t3- Sacar Raidlist
// @namespace      t3- Sacar Raidlist
// @description    t3- Sacar Raidlist
// @include        http://*.travian.*/build.php?id=39*&editar_tropas*

// @include        http://*.travian.*/build.php?gid=16*&editar_tropas*
// ==/UserScript==


if (location.href.match('editar_tropas')){

document.getElementById('raidList').innerHTML = ''

}