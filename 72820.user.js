// ==UserScript==
// @name 	Pennergame News alle pennergames 4.0 by basti1012 hamburg berlin münchen
// @namespace  	basti1012 @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @description Zeigt die aktuellen News links oben in der Ecke an. alle pennergames
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @include        http://*dossergame.co.uk*
// @include        http://*menelgame.pl*
// @include        http://*bumrise.com*
// @include        http://*pennergame.de*
// @license	Creative Commons by-nc-sa
// @exclude 	*/news/*
// ==/UserScript==

var gg = "0";
var zbig = "15";             // groesse der uhr ( zb 1-1000)
var hinterfarbe ="black";       // Hintergrundsfarbe wenn keine erwunscht einfach leer lassen
var zahlfarbe ="red";        // Farbe der Zahlen ( black,blue,red usw)  oder hex codes
var bordera ="0";            // border breite (1,2,3,4,5,6,7,8,9,usw )
var borrad ="0";            // oval bis eckig ( 0-100 )
var borderf = 'red';        // border farbe (green,black,red usw)

var VonOben ="10";           // abstand von oben  ( 0 -??)
var vonseite ="1";          // abstand von der seite ( von rechts oder links was gerade ausgewehlt wurde)

var fest = "absolute";        // festehende uhr oder mit laufende  (absolute oder fixed )
var rightleft = "left";      // Rechts oder Links die uhr ( right oder left) 
var sichtbar = "1.0";         // transparent von 0.4 - 2.0 niee unter 0.4 gehen sonst uhr weg

GM_xmlhttpRequest({
   method:"GET",

   url: 'http://'+window.location.hostname+'/news/',

   onload:function(responseDetails) {

   news = responseDetails.responseText.match(/<span class="news_head">(.*)<\/span>/)[0];
    
   var newspan = document.createElement("span");
   newspan.setAttribute('id', 'news_info');
   newspan.setAttribute('name', 'news__info');
   newspan.setAttribute('style', 'position:'+fest+';top:'+VonOben+'px;'+rightleft+':'+vonseite+'px; background:'+hinterfarbe+'; -moz-border-radius:'+borrad+'px;-moz-opacity:'+sichtbar+';opacity:'+sichtbar+';border:'+bordera+'px solid '+borderf+';  font:'+zbig+'px arial; z-index:99999;');
   var navigation = document.getElementById("notificationscreen");
   navigation.appendChild(newspan);

   document.getElementById("news_info").innerHTML = '<div align="top"><b><center><span style=\"color:orange\">Pennergame News:</b></center></span></div><font size=2><span style=\"color:white\"><div align="top">'+news+'</div></span></font></a>';

}});

// Copyright (c) by basti1012 @ Pennerhack ( visit: http://www.pennerhack.de.tc )
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.