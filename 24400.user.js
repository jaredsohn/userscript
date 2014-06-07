// ==UserScript==
// @name Binnews imdb rating !
// @namespace http://userscripts.org/scripts/show/16414
// @description Affiche le rating imdb (la note) quand il rencontre un lien allocine, cinemotion ou imdb
// @include http://www.binnews.in/*
// ==/UserScript==

// pour chaque lien, on remplace cinemotions
for (var i=0; i < document.getElementsByTagName('a').length; i++) {
var aUrl = document.getElementsByTagName('a')[i].href.split("/");
var aUrl2 = document.getElementsByTagName('a')[i].href.split("=");
for (var j=0; j < aUrl.length; j++) {
if (aUrl[j] == "www.imdb.com" && aUrl[j+1] == "title") {
// on ajoute le lien vers AllocinÃ©
var str = "<img src=\"http://thewebfuture.free.fr/trueimdbrating.php?id="+(aUrl[j+2].replace("tt",""))+"\">";
var str2 = document.getElementsByTagName('a')[i].parentNode.innerHTML;
document.getElementsByTagName('a')[i].parentNode.innerHTML = str2 + " " + str;
}
if (aUrl[j] == "www.allocine.fr" && aUrl2[0] == "http://www.allocine.fr/film/fichefilm_gen_cfilm") {
// on ajoute le lien vers Allociné
var str = "<img src=\"http://thewebfuture.free.fr/allocinerating.php?name="+(aUrl2[aUrl2.length-1].replace(".html","").replace(/-/g,"+"))+"\">";
var str2 = document.getElementsByTagName('a')[i].parentNode.innerHTML;
document.getElementsByTagName('a')[i].parentNode.innerHTML = str2 + " " + str;
}
if (aUrl[j] == "www.cinemotions.com") {
// on ajoute le lien vers AllocinÃ©
var str = "<img src=\"http://thewebfuture.free.fr/cinemotionrating.php?name="+(aUrl[aUrl.length-1].replace(".html",""))+"&id="+(aUrl[aUrl.length-2])+"\">";
var str2 = document.getElementsByTagName('a')[i].parentNode.innerHTML;
document.getElementsByTagName('a')[i].parentNode.innerHTML = str2 + " " + str;
}
}
}