// ==UserScript==
// @name				FireDesignGoogle
// @include			http://*.google.de/*
// ==/UserScript==

if(window.name != 67) {
   var conf = confirm("Entwicklungen am Script eingestellt.\nUm weiterhin Google ein neues Design zu geben, benutzen sie die Weiterentwicklung von HomerBond005 auf\nhttp://userscripts.org/scripts/show/83359\nSoll die Seite direkt aufgerufen werden?");
   window.name = 67;
   if(conf)
       location.href = "http://userscripts.org/scripts/show/83359";
}