// ==UserScript==
// @name           Automatisch heilen
// @namespace      Herzfinsternis
// @include        http://koeln.pennergame.de/*
// ==/UserScript==

function klick(){
   GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://koeln.pennergame.de/stock/newplunder/execboost/',
      data: "plunder=68",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
   });
}

setInterval(function() { klick(); }, 2000); // alle 2 Sekunden heilen