// File encoding: UTF-8
//{
// Este script funciona em listas de filmes no IMDb, no modo de visualização
// compacto, adicionando um link para buscar o filme no site da Netflix.
//
// Copyright (c) 2011, Ricardo Mendonça Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IMDb 2 Netflix
// @description   No IMDb, cria links para abrir os filmes na Netflix
// @namespace     http://userscripts.org/scripts/show/?
// @include       http://*.imdb.com/list/*
// @match         http://*.imdb.com/list/*
// @version       2011.10.25
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Para usar este script, é preciso usar o navegador Google Chrome, ou
// o navegador Firefox com o add-on Greasemonkey: http://www.greasespot.net/
// 
// --------------------------------------------------------------------
//
// Histórico:
// ----------
// 2011.10.25  1ª versão
// 2012.07.11  Agora também mostra link para episódios de séries
//}

(function() {

   function xpath(xpathExpression, contextNode) {
      if (contextNode == null)
         contextNode = document;
      namespaceResolver = null;
      resultType        = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
      result            = null;
      return document.evaluate(xpathExpression, contextNode,
                               namespaceResolver, resultType, result);
   }

   // http://www.greywyvern.com/code/php/binary2base64
   // http://www.motobit.com/util/base64-decoder-encoder.asp
   netflixIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAIAAAASSxgVAAAACXBIWXMAAAK/AAACvwH2v8A0AAAA3UlEQVR4nGP8X1PCQAgw/ucHUR38EpJ5xb9//XrYWP3LzUtMQ/PZpN52DgY2iCqgIiCqMND5DwZSUlJFRUWXL18GSpWxQ2WZkI398uWLgYEBnPvjP5SBoujEiRO2traYbkJRdOrUKRMTEwKKDh48aGRkREDRs2fPhISElJSU8Cl69erVkydPzMzM8CkCgjNnzpiamqIJskCo///+PX/+/M+fP2vWrPn58+fVq1eRFUFD/OhfhqzvDJf+MoSyMggxMpz/yyDMyBDFxhDDClEEi7s///79+vuXi5UV03cACeNZZbOa5ZYAAAAASUVORK5CYII=';
   
   function newLink(search)
      { return '<a href="http://movies.netflix.com/WiSearch?v1='+escape(search)+'"><img src="'+netflixIcon+'" title="Procurar na Netflix" border="0"></a>&nbsp;'; }

   rows = xpath("//td[@class='title']|//td[@class='title episode']");
	for (var i = 0; i < rows.snapshotLength; ++i) {
		row = rows.snapshotItem(i);
      row.innerHTML = newLink(row.textContent) + row.innerHTML
   }
})()