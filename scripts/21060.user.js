// ==UserScript==
// @name          Perfil Estrela
// @namespace     http://sitedosergio.sitesled.com/greasemonkey/
// @description   Exiba uma condecoraï¿½ï¿½o do Orkut no Nome no seu perfil
// @include 	http://www.orkut.com/Profile.aspx*
// ==/UserScript==

/*
 *
 * Autor: Sergio Abreu
 * http://sitedosergio.sitesbr.net/
 *
 * Data da Criaï¿½ï¿½o: 23/12/2005
 *
 * Atualizado em 23/12/2005 20:45h
 *
 * Confira o "changelog" no final do arquivo.
 *
 */


// -------------------------- INï¿½CIO DO SCRIPT : CUIDADO SE FOR MEXER ! ----------------------------------------------------------- //


function perfilEstrela() {


  if( document.body.innerHTML.indexOf('EditGeneral.aspx') > -1) {
	var nome = document.getElementById("imgFirstLetter").src;
	nome = nome.replace(/s\.gif/, 'a.gif');
	document.getElementById("imgFirstLetter").src = nome;
  }
}
				
 perfilEstrela();

// ---------------------------------------- FIM DO SCRIPT -------------------------------------------------------- //



/* ------------------------------ Changelog (Mudanï¿½as mais recentes) --------------------------------------------- //
 *
 * Estrela extra sï¿½ no seu.
 * by Sergio Abreu ï¿½
 *
 */
