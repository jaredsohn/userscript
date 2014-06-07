// ==UserScript==
// @name          Linkify UFG
// @namespace     http://www.historiainventada.com.br/
// @description   Transforma todos os links javascript em endereços reais para que possam ser copiados ou abertos em novas abas.
// @include       http://www.*.ufg.br/*
// @include       http://*.ufg.br/*
// ==/UserScript==

(function () {
var patterns = [
  [/pagina_inicial\(.*\)/gi, "page.php"],
  [/mostrar_link_externo\((\w+)\)/gi, "$1"],
  [/mostrar_item\((\w+)([,\w]+)?\)/gi, "?item_id=$1"],
  [/mostrar_menu\((\w+),(\w+)([,\w]+)?\)/gi, "?menu_id=$1&pos=$2"],
  [/mostrar_noticia\((\w+)([,\w]+)?\)/gi, "?noticia=$1"],
  [/mostrar_evento\((\w+)([,\w]+)?\)/gi, "?evento=$1"],
  [/mostrar_informativo\((\w+)\)/gi, "?inf=$1"],
  [/mostrar_data\((\w+)\)/gi, "?data=$1"],
  [/mostrar_pagina\((\w+)([,\w]+)?\)/gi, "?id_pagina=$1"],
  [/mostrar_informativo\((\w+)([,\w]+)?\)/gi, "?informativo=$1"],
  [/noticias_form_busca.*/gi, "?tipo=noticias_form_busca"],
  [/eventos_form_busca.*/gi, "?tipo=eventos_form_busca"],
  [/mostrar_fale_conosco.*/gi, "?tipo=fale_conosco_form"]
];
 
function sub(link) {
  link.setAttribute("target", "")
  var url;
  if (link.href.match(/javascript:/gi)) {
    url = link.href.substring(11).replace(/'|;/g, "");
    for (var i=0; i < patterns.length; i++)
      if (url.match(patterns[i][0]))
        link.href = url.replace(patterns[i][0],
                                patterns[i][1]);
  }
}
 
var links = document.getElementsByTagName("a");
for (var idx=0; idx < links.length; idx++)
  sub(links[idx]);
})();