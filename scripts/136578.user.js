// ==UserScript==
// @name           BRChan - Alterações no modo normal - exibir link para catalogo
// @namespace      http://*brchan.org
// @include        http://*brchan.org/*/*
// @include        http://*brchan.org/*/
// ==/UserScript==
(function() {
// descobrindo a board atual
var coisas = document.getElementById("postform").childNodes;
var board;
for(var i = 0; i < coisas.length; i++) {
	if(coisas[i].name == "board") {
		board = coisas[i].value;
		break;
	}
}
var link = "<a href='http://www.brchan.org/"+board+"/catalog.html'>Catálogo</a>";
// Colocando o link de catalogo na barra de paginas
var tabela = document.getElementsByClassName('pages');
if(tabela[0] != undefined) {
	td = tabela[0].getElementsByTagName('td');
	td[1].innerHTML = td[1].innerHTML + "["+link+"]";
}
// Colocando o link de catalogo logo abaixo do nome da board
var logo = document.getElementsByClassName('logo');
if(logo[0] != undefined) {
	logo[0].innerHTML = logo[0].innerHTML + "<br/><div style='font-size:12pt;'>" + link + "</div>";
}
}).call(this);