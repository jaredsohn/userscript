// ==UserScript==
// @name           TW Triedený Inventár
// @namespace      http://tw-db.info
// @description    Script na roztriedenie inventára do 9 sekcií. 1 Všetok inventár, 2 Duelové zbrane, 3 Zbrane do pevnosti, 4 Oblečenie, 5 Topánky, 6 Pokrývky hlavy, 7 Náhrdelníky, 8 Produkty, 9 Zvieratá.
// @author         Knight
// @include        http://*.the-west.*/*
// ==/UserScript==

/*
Copyright (c) by Knight
Preklad Johnny
Script na roztriedenie inventára do 9 sekcií. 
1 Všetok inventár, 
2 Duelové zbrane, 
3 Zbrane do pevnosti, 
4 Oblečenie, 5 Topánky, 
6 Pokrývky hlavy, 
7 Náhrdelníky, 
8 Produkty, 
9 Zvieratá.
*/

var TWSortInvent = document.createElement('script');
TWSortInvent.src = 'http://westnoviny.xf.cz/js/sort_invent.js';
TWSortInvent.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSortInvent);