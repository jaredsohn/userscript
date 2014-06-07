// ==UserScript==
// @name           Piscina de Magma [BR]
// @namespace      http://twitter.com/thurow182
// @description    Código que avisa quando o guardião está dormindo, assim, você poderá pintar seu pet!
// @include        *.neopets.*/magma/pool.phtml*
// ==/UserScript==

if (document.body.innerHTML.indexOf("Bem vindo à")>-1) {alert("Você pode Pintar!");}
else if (document.body.innerHTML.indexOf("Talvez você queira")>-1) {alert("Você pode Pintar!");}
else
setTimeout(function(){location.reload();}, 60000 + Math.floor(2000 * Math.random()));