// ==UserScript==
// @name           Magma Pool [Es/Us]
// @namespace      k4zz
// @description    codigo para refrescar la piscina hasta que este dormido el tonu
// @include        http://www.neopets.com/magma/pool.phtml*
// ==/UserScript==

if (document.body.innerHTML.indexOf("el guardia está durmiendo.")>-1) {alert("Esta Dormido");}
else if (document.body.innerHTML.indexOf("Bienvenido a la")>-1) {alert("Puedes pintarlo");}
else if (document.body.innerHTML.indexOf("The guard is sleeping.")>-1) {alert("is sleeping");}
else if (document.body.innerHTML.indexOf("Welcome to Moltara's")>-1) {alert("You can paint");}
else
setTimeout(function(){location.reload();}, 2000 + Math.floor(2000 * Math.random()));