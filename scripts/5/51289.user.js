// ==UserScript==
// @name           Opaca dominios - Opacity domains v.1
// @namespace      Hu-Lee-Yo
// @description    Script para opacar tus sitios favoritos, sobre todo aquellos que son brillantes.
// @include        http://www.jarochos.net/*
// @include	   http://www.darkreloaded.com/*


//Para que este script funcione correctamente debemos tener instalado también http://userscripts.org/scripts/show/51288 y a su vez, editar este último para que obscurezca la página deseada. Misma que deberemos incluir en los includes de este script.

// ==/UserScript==

//Puedes variar el valor .4 de default para opacar mas o menos tus sitios.

document.body.style.opacity = .4;