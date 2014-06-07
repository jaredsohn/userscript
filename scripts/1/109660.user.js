// ==UserScript==
// @name           Mail...
// @namespace       B
// @description		Recharge automatiquement la page de mail yahoo toutes les 5 secondes
// @include        http://au.mg5.mail.yahoo.com/dc/launch
// ==/UserScript==

var time = 5000
window.setTimeout(function() {location.reload();}, time);