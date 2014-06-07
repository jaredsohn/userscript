// ==UserScript==
// @name       Osimulate senza ADS
// @namespace  
// @version    0.0
// @description  Rimuove gli ADS presenti nel simulatore
// @match      http://*.osimulate.com/*
// @match      http://osimulate.com/*
// @copyright  2014+, Bio80
// ==/UserScript==

var idTB = document.getElementsByTagName('table')[0];
document.body.removeChild(idTB);
document.body.appendChild(idTB);