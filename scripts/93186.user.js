// ==UserScript==
// @name           Fix oGame XMas-Footer
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


document.getElementsByClassName("fleft textLeft")[0].style.width = "360px";
document.getElementsByClassName("fright textRight")[0].style.width = "360px";