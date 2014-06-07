// ==UserScript==
// @name           Cerrador
// @namespace      Basado en http://userscripts.org/scripts/show/63212
// @description    Cierra sitios automáticamente
// @include        */0.com/*
// ==/UserScript==

// Se edita a conveniencia "@include" y con about:config de Firefox se cambia el valor del parámetro "dom.allow_scripts_to_close_windows" a "true". ADVERTENCIA: Si hay sólo una pestaña abierta y ésta contiene un sitio a cerrar, también se cierra el navegador. Es ideal para sitios "indeseables".

window.close()