// ==UserScript==
// @name        Automatyczny Podpis
// @namespace   http://zapytaj.onet.pl
// @description Automatyczny podpis do twoich postów na Zapytaj.
// @include     http://zapytaj.onet.pl/*
// @version     1
// ==/UserScript==

var hr    = "____________________________________________"
var signature = "Automatyczny podpis dla Zapytaj dostępny: http://userscripts.org/scripts/show/139832.";
var textarea = document.getElementById('questionContents');

textarea.innerHTML = "\n" + hr + "\n" + signature;
