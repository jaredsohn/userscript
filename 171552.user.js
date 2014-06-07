// ==UserScript==
// @name          ItauLogin
// @description   Login Autofill
// @include       http://www.itau.com.br/personnalite*
// @include       http://www.itau.com.br/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// @history        1.0.1 Basta alterar seu_numero_da_agencia e seu_numero_da_conta
// ==/UserScript==

$(window).bind("load", function () {
	document.getElementById("campo_agencia").value = 'seu_numero_da_agencia';
	document.getElementById("campo_conta").value = 'seu_numero_da_conta';
});