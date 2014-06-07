// Este é um script para a seção de cinema do site Verdes Mares.
// Ele gera um link (a partir do título original do filme) para a entrada
// do mesmo no site IMDB (Internet Movie Database).
//
// Copyright (c) 2008, Ricardo Mendonca Ferreira (ric@mpcnet.com.br)
// sob licenca GPL - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Verdes Mares - IMDB
// @description   Gera links de filmes no site Verdes Mares para o IMDB
// @namespace     http://userscripts.org/scripts/show/33320
// @include       http://*verdesmares.globo.com/v3/canais/cinema_destaque.asp*
// @exclude       
// @version       2011.08.29
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Isto é um script Greasemonkey.
//
// Para usá-lo, voce precisa ter:
// - o navegador Firefox: http://br.mozdev.org/
// - o addon Greasemonkey: http://www.greasespot.net/  ou  https://addons.mozilla.org/pt-BR/firefox/search?q=greasemonkey&cat=1%2C4
// Após instalar o Greasemonkey, reinicie o Firefox
// e acesse este script novamente para instalá-lo.
//
// Para desinstalar, entre em Tools/Greasemonkey/Manage User Scripts
// (ou Ferramentas/Greasemonkey/Gerenciar Scripts), selecione este
// script e clique Uninstall (ou Desinstalar).
//
// --------------------------------------------------------------------
//
// Histórico:
// --------
// 2011.08.29  Realiza busca usando também o ano de produção (embora possa estar errado no Verdes Mares...)
// 2008.09.06  Primeira versão


(function() {


   var r = document.evaluate(
      "//span[@class='desPrTitulo']",
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   if (r) { s = r.snapshotItem(0); }
   //var s=document.getElementsByClassName('desPrTitulo');
   if (s) {
      var text = s.innerHTML;
      var m = text.match(/<pre>\((.+?)\)<\/pre>/);
      if (m && m[1]) {
         text = m[1];
         var search = text;
         var subst  = "";
         m = text.match(/(.+)\s*[,\-].+?[,\-]\s*(\d+)?/);
         if (m) {
            var name = m[1];
            var year = m[2];
            name = name.replace(/\s*$/, '');
            search = name + " ("+year+")";
         }
         subst = '<a href="http://www.imdb.com/find?s=tt&q=' + escape(search) + '">' + text + '</a>';
         s.innerHTML=s.innerHTML.replace(text, subst);
      }
   }

})()
