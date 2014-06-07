// ==UserScript==
// @name           Pirate Assault
// @description    Sea Raid Timer mod
// @include        http://*.piratesassault.*/index.php?ac=raubzug
// ==/UserScript==

function PimpMyTime()
{
 var r = new Array();
 r = document.getElementByNames('jagdzeit');
 alert(r.length);
 setTimeout(PimpMyTime, 5000);
}

setTimeout(PimpMyTime, 1000);