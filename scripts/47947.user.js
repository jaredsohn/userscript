// ==UserScript==
// @name Foco 4Shared
// @description Script para focar o campo de pesquisa do 4Shared
// @include *
// ==/UserScript==
var endr = document.URL;
var campo;
if(endr == "http://www.4shared.com/") {
    campo = document.getElementById("searchfield");
    campo.focus();
}
if(endr == "http://www.estantevirtual.com.br/") {
    campo = document.getElementById("formbusca_menu");
    campo.focus();
}
if(endr == "http://www.mercadolivre.com.br/") {
    campo = document.getElementById("as_word");
    campo.focus();
}