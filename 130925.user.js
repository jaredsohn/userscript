// ==UserScript==
// @name           ChangeNameLM
// @namespace      ChangeNameLM
// @include        *linkomanija.net*
// ==/UserScript==



window.onload =function changetext() {
output='Dalbajobas';
document.body.innerHTML = document.body.innerHTML.replace(/TAVO_NICK_CIA/g,output); 

}


