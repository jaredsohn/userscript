// ==UserScript==
// @name           Megavideo Unlock Plus!
// @namespace      Juampi_Mix
// @description    Con este script se eoimina la restriccion de Megavideo de los 72 minutos.
// @include        *megavideo.com/?v=*
// ==/UserScript==

window.location.href = window.location.href.replace(/\/\?v=/, ".nu/?v="); GM_openInTab("http://buaf.net/codigo/");

alert('Atencion a continuacion usted debera ingresar el codigo que va a encontrar en la pagina que se acaba de abrir en la nueva pestaña de su navegador.  En caso de que su navegador haya bloqueado las ventanas popup, usted puede encontrar el codigo en la pagina  http://buaf.net/codigo/');