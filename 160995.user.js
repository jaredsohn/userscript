// ==UserScript==
// @name       Libera inputs CBLC
// @namespace  http://filipegiusti.com
// @version    0.1
// @description  Retira limitação de colar e de usar o teclado virtual
// @match      https://*.cblc.com.br/*
// @match      https://cblc.com.br/*
// @copyright  2012+, Filipe Giusti
// ==/UserScript==

var inputs = document.getElementsByTagName('input');

for(var i = 0; i < inputs.length; i++) {
    inputs[i].onpaste = undefined;
    inputs[i].onkeypress = undefined;
}
