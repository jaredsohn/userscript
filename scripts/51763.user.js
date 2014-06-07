// ==UserScript==
// @name Bandenkampfwarner version 1.0  by basti1012
// @namespace basti1012   http://pennerhack.foren-city.de
// @description Zeigt im game einen hinweis an wenn bandenkampf gestartet ist und informationen dazu
// @include http://*pennergame.de/*
// @include http://*berlin.pennergame.de*
// @include http://*menelgame.pl*
// @include http://*dossergame.co.uk*
// ==/UserScript==

var VonOben = 64; //px
var VonRechts =345; //px


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

   url: ''+pgurl+'/gang/fight/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;
   binfo = content.split('<a href="/gang/fight/view/')[1];
   binfo1 = binfo.split('/">Details</a>')[0];


GM_xmlhttpRequest({
   method:"GET",

   url: ''+pgurl+'/gang/fight/view/'+binfo1+'/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;
   azeit = content.split('<td bgcolor="#313131">&nbsp;')[1];// anfangs zeit kampf
   azeit1 = azeit.split('Uhr</td>')[0];
   ezeit = content.split('<td bgcolor="#313131">&nbsp;')[2];// endzeit kampf
   ezeit1 = ezeit.split('Uhr</td>')[0];
   gegner = content.split('style="vertical-align:middle;">')[1];// eigener bandenname
   gegner1 = gegner.split('</span></div></td>')[0];
   gegner2 = content.split('style="vertical-align:middle;">')[2];// gegner sein name
   gegner3 = gegner2.split('</span></div></td>')[0];
   erge = content.split('align="center"><span style="vertical-align:middle; font-size:16px">')[1];// eigene punkte von kampf
   erge1 = erge.split('</span></div></td>')[0];
   erge2 = content.split('align="center"><span style="vertical-align:middle;  font-size:16px">')[1];// generische punkte von kampf
   erge3 = erge2.split('</span></div></td>')[0];
		
   
   var newspan = document.createElement("div");
   newspan.setAttribute('id', 'basth_info');
   newspan.setAttribute('href', '/fight/overview/#form1');
   //newspan.setAttribute('title', 'Eingehender Angriff: TimeOfImpact');
   newspan.setAttribute('name', 'basth__info');
   newspan.setAttribute('style', 'position:absolute;top:'+VonOben+'px;right:'+VonRechts+'px;');
   var navigation = document.getElementById("navigation");
   navigation.appendChild(newspan);
   document.getElementById("basth_info").innerHTML = '<a class="tooltip"><font color=""></span><img src="http://www.fotos-hochladen.net/achtungbandenkampff2mr4qk60.jpg" </font><span><small><b>Das derzeitige Kampfergebnis liegt bei diesen Punkten</b><br>'+gegner1+': = '+erge1+'<br><b>Punkte von:</b><br>'+gegner3+' = '+erge3+'<br><b>Kampfbeginn ist</b><br>'+azeit1+'<br><b>Kampfende ist:</b><br>'+ezeit1+' </small></span>';
   //document.getElementById("basth_info").innerHTML = '<a href = "'+pgurl+'gang/fight/view/'+binfo1+'/">'+gegner1+'='+erge1+'<br>'+gegner3+'='+erge3+'<br>Anfangzeit<br>'+azeit1+'<br>Endzeit<br>'+ezeit1+'';
                                                       //alert(""+gegner1+""+erge1+""+gegner3+""+erge3+""+binfo1+""+azeit1+""+ezeit1+"");
}});
}});
//Copiright by basti1012