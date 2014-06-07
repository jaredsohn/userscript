// ==UserScript==
// @name           Andrei A
// @namespace      AA
// @description    Hax.tor.hu Level 11 challenge solver
// @include        http://*hax.tor.hu*
// @version        1.0.0
// ==/UserScript==

var doc = document.body.innerHTML;
alert(doc.search(/"(a-z )+"/is));