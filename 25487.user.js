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
 * Atualizado em 03/09/2007 22:40h
 *
 * Confira o "changelog" no final do arquivo.
 * 
 * Donuts Soccer e Brazil idéia de usuários do script. Valeu!
 */


// -------------------------- INÍCIO DO SCRIPT : CUIDADO SE FOR MEXER ! ------------------------------------------ //


  if( document.body.innerHTML.indexOf('EditSummary.aspx') > -1) {
 	var p = document.getElementsByTagName('h1')[0];
	p.innerHTML += "<img src='/img/i_donut_king.gif'>"+
		"<img src='/img/i_donut_ace.gif'>"+
		"<img src='img/i_donut_brazil.gif'>"+
		"<img src='/img/i_donut_soccer.gif'>";
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