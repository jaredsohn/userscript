// ==UserScript==
// @name           PowerRefresh
// @namespace      www.solucioneslockerz.info
// @description    Refrescar (F5) Aleatorio Menor a 10 Segundos
// @include        *ptzplace.lockerz.com*
// ==/UserScript==

var oigres = Math.round(Math.random()*10);

function Refrescar()
   {
           window.location.reload();
   }

window.setTimeout(Refrescar, oigres+"000");
