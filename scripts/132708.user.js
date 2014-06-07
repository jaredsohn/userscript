// AutoReload
// Copyright (c) 2012, Cesar Fuentes Oreamuno
// Script personalizado para el filtrado de averias usando la intranet ICE
// Released under the GPL license http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// Este es un script para utilizar con Greasemonkey
// Para instalar Greasemonkey en su Firefox visite: http://greasemonkey.mozdev.org/
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Reload Calidad Intranet
// @description     Las paginas 'include' son recargadas cadas 5 minutos
// @include         http://prd2.infocom.ice/calidadservweb/averiasPendientesZonaFiltrado.do*
// @include			http://prd2.infocom.ice/calidadservweb/averiasPendientesZona.do*
// @include			http://prd2.infocom.ice/calidadservweb/averiasPendientesTecnico.do*
// ==/UserScript==

(function()
{
    setTimeout("document.location.reload();", 300000);
})();