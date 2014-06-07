// ==UserScript==
// @name           indigocreate
// @description    auto battle
// @include        http://*.pokemonindigo.*/create_room.php*
// ==/UserScript==

function pklevel()
{
 document.getElementById('pokemonLevel').innerHTML = "<option value=\"100\">rez mode</option>";
 setTimeout(pklevel, 1000);
}

setTimeout(pklevel, 1000);