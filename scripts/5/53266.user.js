// ==UserScript==
// @name           Pennergame Gefundener Plunder anzeigen(speichern)
// @author         basti1012 http://pennerhack.foren-city.de
// @namespace      basti1012
// @description    Speichert den zuletzt gefundenen Plunder so wird man nie ein plunder uebersehen wenn meiner gefunden wurde
// @include        *pennergame*
// @include        *berlin.pennergame*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// @exclude        *pennergame.de/gang*
// ==/UserScript==

// ################ einstellungen der schrift  
var OBEN = '40'; 
var SEITE ='250';
var big1 = '120';
var farbe1 = 'yellow';

// ################# Ab Hier nix mehr endern ab hier copyright by basti1012 ######################

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var siglink = 'http://imgberlin.pennergame.de/cache/bl_DE/signaturen/';
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var siglink = 'http://img.pennergame.de/cache/de_DE/signaturen/';
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var siglink = 'http://img.menelgame/cache/pl_PL/signaturen/';
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var siglink = 'http://img.dossergame.co.uk/cache/en_EN/signaturen/';
var pgurl = 'http://dossergame.co.uk/';
};

var wasgef1 = GM_getValue("wasgef1");
if (wasgef1 == null){
wasgef1 = "noch kein plunder geladen";
GM_setValue("wasgef1" , wasgef1);
};

 GM_xmlhttpRequest({
	method:"GET",
	 url: ''+pgurl+'activities/',
   	  onload:function(responseDetails) {
     	   content = responseDetails.responseText;
try{

      	    wasgef = content.split('Du hast zuletzt <strong><a href="/stock/plunder/">')[1];
       	     wasgef1 = wasgef.split('</a></strong> gefunden')[0];
}catch(e){

             var wasgef1 = GM_setValue("wasgef1" , wasgef1);
  	     var news = document.createElement("div");
  	    news.setAttribute('id', 'angreifer');
  	   news.setAttribute('href', 'http://pennerhack.foren-city.de/');
          news.setAttribute('name', 'angreifer');
         news.setAttribute('align', 'left');
        news.setAttribute('title', 'Bastis erster test Angrifswarner');
       news.setAttribute('style', 'position:absolute;top:'+OBEN+'px;right:'+SEITE+'px;');
      var navigation = document.getElementById("navigation");
     navigation.appendChild(news);
    document.getElementById("angreifer").innerHTML = '<span style=\"color:'+farbe1+'; font-size: '+big1+'%;"><b>Zuletzt gefunden:<br>'+GM_getValue("wasgef1")+'</b></span>';
}


}});

             var wasgef1 = GM_setValue("wasgef1" , wasgef1);
  	     var news = document.createElement("div");
  	    news.setAttribute('id', 'angreifer');
  	   news.setAttribute('href', 'http://pennerhack.foren-city.de/');
          news.setAttribute('name', 'angreifer');
         news.setAttribute('align', 'left');
        news.setAttribute('title', 'Bastis erster test Angrifswarner');
       news.setAttribute('style', 'position:absolute;top:'+OBEN+'px;right:'+SEITE+'px;');
      var navigation = document.getElementById("navigation");
     navigation.appendChild(news);
    document.getElementById("angreifer").innerHTML = '<span style=\"color:'+farbe1+'; font-size: '+big1+'%;"><b>Zuletzt gefunden:<br>'+GM_getValue("wasgef1")+'</b></span>';
//copyright by bsti1012