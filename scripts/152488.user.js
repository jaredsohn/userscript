(function() {
// ==UserScript==
// @name           szamlazz.hu helper
// @namespace      http://localhost.localdomain
// @description    szamlazz.hu helper
// @include        https://www.szamlazz.hu/szamla/*
// @require https://secure.dune.net/usocheckup/13701.js?method=update&open=window&maxage=1&custom=yes&id=usoCheckup
// @require https://userscripts.org/scripts/source/61794.user.js
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading

alert("2");
//uj szamla ?

var partnername = document.getElementById("partnername");
if (qbar != null) {
	alert("3");
	var input = partnername;
	input[0].selectionStart = input[0].selectionEnd = input.val().length;
}


})();
