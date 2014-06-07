// ==UserScript==
// @name           gangcity berichten
// @namespace      gangcity berichten
// @include        http://www.gangcity.nl/info.php
// @copyright      Jordy Kroeze
// ==/UserScript==

// refresh info.php menu elke 5 minuten
setTimeout( function() {
window.location = 'http://www.gangcity.nl/info.php';
}, 300000 );

setTimeout( function() {
// pakt alle gegevens uit de body.
var str = document.body.innerHTML;
// komt in de gegevens "bericht" voor?
var pos=str.indexOf("bericht");
// resultaat gevonden!
if (pos>=0)
{
// popup zodat je weet dat er een bericht is!
window.open('http://www.jordykroeze.com/gangcitybericht.php?muziek=aan', 'Berichten','width=500,height=500');
// muziek=aan zet het geluid met het standaard geluid aan.
// muziek=uit zet alle muziek uit.
// muziek=http://www.youtube.com/watch?v=tCHprK7wups laat het geluid van een youtube filmpje horen, kan elke video zijn zolang deze maar vanzelf start!.
}

}, 1000 );