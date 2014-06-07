// ==UserScript==
// @name           skip_pub
// @namespace      script de Levi59
// @description    passe automatiquement la page de pub intermédiaire de lemondedembr
// @include        *.lemondedembr.com/pubs*/pubs*
// ==/UserScript==

    var link = document.getElementsByTagName("a")[0];
    location.href = link.href;