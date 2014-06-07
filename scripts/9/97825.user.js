// ==UserScript==
// @name           spiegel.de Panorama blocker
// @namespace      http://userscripts.org/users/298573
// @description    Hides the "Panorama"-Category previews on the spiegel.de main page
// @include        http://www.spiegel.de/
// ==/UserScript==
document.getElementsByClassName("spRessortTeaserBox panorama")[0].style.display ="none";