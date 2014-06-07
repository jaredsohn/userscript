// ==UserScript==
// @name          Related Communities Hack
// @namespace     http://www.orkut.com/Community.aspx?cmm=25000000
// @description   Possibilita relacionar comunidades que não aparecem na busca do orkut.
// @include       http://www.orkut.com/CommunitySearch.aspx*
// @include       http://images.orkut.com/CommunitySearch.aspx*
// @include       http://sandbox.orkut.com/CommunitySearch.aspx*
// ==/UserScript==

/************************************************************************************************
 *
 *   Autor: Asrail (http://www.orkut.com/Profile.aspx?uid=12063090882071243011)
 *   Nome: Related Communities Hack
 *   Versão: 0.0.1
 *   Última atualização: 19-01-2008, 13:30h (GMT -3)
 *   Tamanho: 1 Kb
 *   Tipo de Licença: GNU GPL
 *
 *   Agradecimentos: Sérgio (uid=18169310566226668758).
 *
 *   Instrução de uso: Basta efetuar a busca por qualquer termo, após isso digite o número da 
 *                     comunidade no campo de texto que aparecerá ao lado do botão adicionar.
 *                     Feito isso clique em adicionar. :-)
 *
 ************************************************************************************************/

if ( document.getElementById('relatedId') != undefined ) {
  document.getElementById('relatedId').type = "text";
}