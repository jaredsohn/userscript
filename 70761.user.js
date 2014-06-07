// ==UserScript==
// @name           ReSport
// @namespace      http://userscripts.org/scripts/review/70761
// @description    Basta pubblicità su ReSport
// @include        http://www.resport.it/*
// ==/UserScript==
// Lo so, camperanno di pubblicità... Ma una pagina di soli banner non è un incentivo a cliccare!

document.body.innerHTML=document.body.innerHTML.replace(/leggiarticolo.asp/g,'leggiarticolo2.asp');
