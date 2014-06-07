// ==UserScript==
// @name           Aktuelle news aus aller welt in der uebersicht
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    Aktuelle schlagzeilen die es gibt andauern passiert was in deutschland alle 20 minuten ca steht in der anzeige was neues weil soviel los ist auf der welt also der beste nachrichten ticker den ich bauen konnte
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

   url: 'http://www.freiepresse.de/NACHRICHTEN/NEWSTICKER/?em_sid=63f65fe708e083b6ffa6727afc01a611',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
        var gesa = content.split('<h1>')[1];
        var newsa = gesa.split('</a>')[0];
GM_setValue("newsa", newsa);

}});
var newsa = GM_getValue("newsa");
var content = document.getElementById('newsticker');
content.innerHTML = '<marquee behavior="scroll">'+newsa+'</a></marquee>';