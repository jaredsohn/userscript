// ==UserScript==
// @name           [BinNews] Ajout d'un lien vers AlloCine
// @namespace      http://blog.kodono.info/
// @version        20111218
// @description    ajoute un lien vers Allociné lorsqu'on a lien vers jeuxactu.com/cinemotions.com pour le site binnews.in
// @include        http://www.binnews.in/*
// ==/UserScript==

// pour chaque lien, on remplace cinemotions
for (var i=0; i < document.getElementsByTagName('a').length; i++) {
  var link = document.getElementsByTagName('a')[i];
  var aUrl = link.href.split("/");
  for (var j=0; j < aUrl.length; j++) {
    if (aUrl[j] == "www.cinemotions.com") {
      // on ajoute le lien vers Allociné
      var str = "[<a style=\"color: #FFCE00; background-color: black\" target=\"_blank\" href=\"http://www.allocine.fr/recherche/?q="+(aUrl[aUrl.length-1].replace(".html","").replace(/-tt[0-9]+/,"").replace(/-/g,"+"))+"\">allocine</a>]";
      var str2 = document.getElementsByTagName('a')[i].parentNode.innerHTML;
      document.getElementsByTagName('a')[i].parentNode.innerHTML = str2 + " " + str;
    } else if (aUrl[j] == "cinema.jeuxactu.com") {
      var str = "[<a style=\"color: #FFCE00; background-color: black\" target=\"_blank\" href=\"http://www.allocine.fr/recherche/?q="+(link.innerHTML.replace(/ /g,"+").replace(/\([0-9]+\)/g,""))+"\">allocine</a>]";
      var str2 = document.getElementsByTagName('a')[i].parentNode.innerHTML;
      document.getElementsByTagName('a')[i].parentNode.innerHTML = str2 + " " + str;
    }
  }
}