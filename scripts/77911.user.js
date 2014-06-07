// ==UserScript==
// @name           halten
// @namespace      a
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

function a(){
    document.getElementsByName("sendForm")[0].elements[0].value= "0";

}
window.setTimeout(a,500);