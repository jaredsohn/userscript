// ==UserScript==
// @name           Legendas.tv - no ads
// @description    Retira propagandas do Legendas.tv
// @namespace      https://github.com/saitodisse/legendas.tv.no.ads
// @author         L.TV Propaganda's Killer
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @homepage       https://raw.github.com/saitodisse/legendas.tv.no.ads/master/README.md
// @version        0.2a
// @include        http://legendas.tv/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @history        0.1a alfa, primeira versão, primeira vez
// @history        0.2a retira as propagandas e aumenta as fontes
// ==/UserScript==
(function(){
  // esconde as propagandas
  $("iframe").hide();
  $("#Table_01").hide();
  $(".bgesquerda").hide();

  // melhorias visuais
  $("table").attr("width", "100%");
  $(".brls , :nth-child(3), .mais, b, a").css("font-size", "16px");
  $(".filmresult tr:nth-child(3) td , .filmresult div").css("font-size", "16px");

  $("form:eq(0)").after("<p>Element was there</p>").appendTo("table table table:eq(20)");
  $("input:nth-child(2) , #int_idioma, #selTipo").hide();
  $("#Table_01 td").hide();
  $(".smembros").hide();
  $("form:first table:eq(0) tr:not(tr:eq(3))").hide();

  $("#txtLegenda").removeAttr("class");
  $("#txtLegenda").removeAttr("maxlength");
  $("#txtLegenda").css("width", "80%");
  $("#txtLegenda").css("font-size", "16px");
    
  //codigo do filme
  $(".buscaNDestaque, .buscaDestaque").each(function(i, val){
      var onclickCopy = $(val).attr('onclick');
      $(val).removeAttr('onclick');
      var caminhoDownload = onclickCopy.replace(/javascript:abredown\('(\w+?)'\);/, "http://legendas.tv/info.php?d=$1&c=1");
      $(val).find("td:eq(0)").append("<a href='"+ caminhoDownload +"'><img style='width:50px' src='http://www.a12.com/padroeira/wp-content/uploads/2012/08/icon-download.png'/></a>");
      $(val).find("td:eq(1)").attr("onclick", onclickCopy);
   });
})();