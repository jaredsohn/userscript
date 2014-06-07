// ==UserScript==
// @name          Perfil Estrela
// @namespace     http://sitedosergio.sitesled.com/greasemonkey/
// @description   Exiba uma condecoração do Orkut no Nome no seu perfil
// @include 	http://www.orkut.com.br/Profile.aspx*
// ==/UserScript==

/*
 *
 * Autor: Sergio Abreu
 * http://sitedosergio.sitesbr.net/
 *
 * Data da Criação: 23/12/2005
 *
 * Atualizado em 23/05/2009 10:35h
 *
 * Confira o "changelog" no final do arquivo.
 * 
 * Donuts Soccer e Brazil idéia de usuários do script. Valeu!
 */


// -------------------------- INÍCIO DO SCRIPT : CUIDADO SE FOR MEXER ! ------------------------------------------ //
	
	/*
	
	    Caso não queira alguns desses símbolos, comente a linha adicionando duas barras (//) antes do +.
	    
		Assim mostra:          + "<img
		Assim não mostra:   // + "<img
	
	*/


  if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += ""

	/* Carta Rei: */

	      +  "<img src='/img/i_donut_king.gif'>"


	/* Carta Az: */

		+ "<img src='/img/i_donut_ace.gif'>"


	/* Bandeira do Brasil: */

		+ "<img src='img/i_donut_brazil.gif'>"


	/* Bola de futebol: */

		+ "<img src='/img/i_donut_soccer.gif'>"
		

	/* Morango */

		+ "<img src='/img/i_donut_strawberry.gif'>"
		

  }

				
// ---------------------------------------- FIM DO SCRIPT -------------------------------------------------------- //



/* ------------------------------ Changelog (Mudanças mais recentes) --------------------------------------------- //
 *
 * Bola de futebol, Cartas de Baralho, Bandeira do Brasil!
 * Estrela extra só no seu.
 * Adicionado duas cartas de status do Orkut.
 * by Sergio Abreu ®
 *
 */