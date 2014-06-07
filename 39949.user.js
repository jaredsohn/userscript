// ==UserScript==
// @name           Fry off F off
// @namespace      http://www.lutralutra.co.uk
// @description    Removes all instances of 'off' after 'fry'
// @include        *
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/fry/,"fry");
document.body.innerHTML = document.body.innerHTML.replace(/Fry off/,"Fry");
document.body.innerHTML = document.body.innerHTML.replace(/Fry Off/,"Fry");
document.body.innerHTML = document.body.innerHTML.replace(/FRY/,"FRY");