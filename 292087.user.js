// ==UserScript==
// @name         autocomplete password always replace
// @namespace    https://userscripts.org/people/549076
// @description  Replace autocomplete from off to on
// @version      1.0
// @date         2013-03-19
// @creator      bugxxx
// ==/UserScript==

document.body.innerHTML= document.body.innerHTML.replace(/autocomplete=\"off\"/g,"autocomplete=\"on\"");