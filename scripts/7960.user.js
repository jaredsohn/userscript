// ==UserScript==
// @name          Perfil Estrela
// @namespace     http://sitedosergio.sitesled.com/greasemonkey/
// @description   Exiba uma condecoração do Orkut no Nome no seu perfil
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==

/*
 *
 * Autor: Sergio Abreu
 * http://sitedosergio.sitesbr.net/
 *
 * Data da Criação: 23/12/2005
 *
 * Atualizado em 11/03/2007 12:40h
 *
 * Confira o "changelog" no final do arquivo.
 *
 */


// -------------------------- INÍCIO DO SCRIPT : CUIDADO SE FOR MEXER ! ----------------------------------------------------------- //


function perfilEstrela() {


  if( document.body.innerHTML.indexOf('EditGeneral.aspx') > -1) {
	var letra = document.getElementById("imgFirstLetter");
	var nome = letra.src;
	nome = nome.replace(/s\.gif/, 'a.gif');
	letra.src = nome;
	letra.parentNode.innerHTML += "<img src='/img/i_donut_king.gif'><img src='/img/i_donut_ace.gif'>";
  }
}
				
 perfilEstrela();

// ---------------------------------------- FIM DO SCRIPT -------------------------------------------------------- //



/* ------------------------------ Changelog (Mudanças mais recentes) --------------------------------------------- //
 *
 * Estrela extra só no seu.
 * Adicionado duas cartas de status do Orkut.
 * by Sergio Abreu ®
 *
 */
