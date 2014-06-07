// ==UserScript==
// @name           Aktuelle pennergame news in der uebersicht als laaufschrieft
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    Nie wieder ein Downtime verpassen? mit diesen scrript werden die aktuellen news auf der uebersichtseite angezeigt
// @include        http://*dossergame.co.uk/*
// @include        http://*menelgame.pl/*
// @include        http://*berlin.pennergame.de/*
// @include        http://*pennergame.de/*
// @exclude        http://newboard.pennergame.de
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var link = 'http://berlin.pennergame.de/';
 }
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var link = 'http://www.dossergame.co.uk/';
 }
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var link = 'http://www.pennergame.de/';
 }
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var link = 'http://www.menelgame.pl/';
 };
GM_xmlhttpRequest({
   method:"GET",

   url: 'http://'+window.location.hostname+'/news/',
   onload:function(responseDetails) {
   news = responseDetails.responseText.match(/<span class="news_head">(.*)<\/span>/)[0];
  GM_setValue("news", news);

}});
var news = GM_getValue("news");
var content = document.getElementById('newsticker');
content.innerHTML = '<marquee behavior="scroll"><ul><a href="http://pennergame.de/news/"><span style=\"color:green; font-size:100%;\">'+news+'</span></a></ul></marquee>';


