// ==UserScript==
// @name           Meneame -> Me lo tiro
// @namespace      http://userscripts.org/scripts/show/105634
// @description    Sustituto del botón de "menéalo" por "me lo tiro"
// @include        http://www.meneame.net/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(new RegExp('menéalo</a>', 'g') ,'me lo 

tiro</a>'); 

document.body.innerHTML = document.body.innerHTML.replace(new RegExp('¡chachi!</span>', 'g') ,'ou 

yeah!</span>'); 