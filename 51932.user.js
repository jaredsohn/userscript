// ==UserScript==
// @name      wi-wu-warner fuer pennergame dossergame und menelgame update von 19.6.2009
// @namespace basti1012   http://pennerhack.foren-city.de
// @description warnt euch sobal wirtschaft wunder an ist so kan man es nicht mehr verpassen und man kann sofort annfrangten zusammeln auf der minute genau
// @include http://*pennergame.de/*
// @include http://*berlin.pennergame.de*
// @include http://*menelgame.pl*
// @include http://*dossergame.co.uk*
// ==/UserScript==

var VonOben = "10"; //px
var VonRechts ="200"; //px


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
var sig = 'http://mediaberlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var sig = 'http://media.pennergame.de/';
var pgurl = 'http://www.pennergame.de/';
}

else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var sig = 'http://mediaberlin.pennergame.de/';
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var sig = 'http://media.dossergame.co.uk/';
var pgurl = 'http://dossergame.co.uk/';
};

GM_xmlhttpRequest({
   method:"GET",

   url: ''+pgurl+'/gang/upgrades/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;
   ista = content.split('noch bis')[1];
   istb = ista.split('</form></td>')[0];





GM_xmlhttpRequest({
   method:"GET",

   url: ''+pgurl+'/stock/bottle/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;
   ist1 = content.split('Wirtschaftswunder ')[1];
   ist = ist1.split(' aktiv')[0];


   var newspan = document.createElement("div");
   newspan.setAttribute('id', 'baste_info');
   newspan.setAttribute('href', '/fight/overview/');
   newspan.setAttribute('name', 'baste__info');
   newspan.setAttribute('style', 'position:absolute;top:'+VonOben+'px;right:'+VonRechts+'px;');
   var navigation = document.getElementById("navigation");
   navigation.appendChild(newspan);
   document.getElementById("baste_info").innerHTML = '<a class="tooltip"><font color=""></span><img src="http://www.fotos-hochladen.net/wiwu'+ist+'aktivistcs9rkepj.jpg" </font><span><small><b>Wi-wu geht noch bis '+istb+'</small></span>';
   //document.getElementById("baste_info").innerHTML = '<a href = "'+pgurl+'gang/fight/view/'+binfo1+'/">'+gegner1+'='+erge1+'<br>'+gegner3+'='+erge3+'<br>Anfangzeit<br>'+azeit1+'<br>Endzeit<br>'+ezeit1+'';
 }});                                                      //alert(""+gegner1+""+erge1+""+gegner3+""+erge3+""+binfo1+""+azeit1+""+ezeit1+"");
}});
//Copiright by basti1012