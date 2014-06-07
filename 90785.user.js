// ==UserScript==
// @name           Volkskrant fotopagina scroll
// @namespace      volkskrant.nl
// @description    Scroll naar beneden op volkskrant.nl fotopagina's
// @include        http://www.volkskrant.nl/
// ==/UserScript==

var vknavinbeeld = document.getElementById("nav_in-beeld");

if (vknavinbeeld) {

window.scroll(0,235);

}
