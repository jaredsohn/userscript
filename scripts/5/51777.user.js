// ==UserScript==
// @name           Pennergame serverzeit in allen richtungen einstellbar
// @namespace      copiright by basti
// @description    zeigt die aktuelle serverzeit an man kann sie in farbe groesse psitsion einstellen
// @include        *pennergame.de*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// ==/UserScript==`


var aaa = "<b id='Uhrzeit'></b><br />";



if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var gew = 'Gewonnen:';

var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var gew = 'Gewonnen:';

var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var gew = 'wygrane:';

var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var gew = 'Won:';

var pgurl = 'http://dossergame.co.uk/';
};

var zbig = "40";             // groesse der uhr ( zb 1-1000)
var hinterfarbe ="blue";       // Hintergrundsfarbe wenn keine erwunscht einfach leer lassen
var zahlfarbe ="black";        // Farbe der Zahlen ( black,blue,red usw)  oder hex codes
var bordera ="10";            // border breite (1,2,3,4,5,6,7,8,9,usw )
var borrad ="1";            // oval bis eckig ( 0-100 )
var borderf = 'red';        // border farbe (green,black,red usw)
var VonOben ="15";           // abstand von oben  ( 0 -??)
var vonseite ="250";          // abstand von der seite ( von rechts oder links was gerade ausgewehlt wurde)
var fest = "absolute";        // festehende uhr oder mit laufende  (absolute oder fixed )
var rightleft = "right";      // Rechts oder Links die uhr ( right oder left) 
var sichtbar = "0.5";         // transparent von 0.4 - 2.0 niee unter 0.4 gehen sonst uhr weg
//####################################################################################################
//################# STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP #####################
//################### hier fengt copyright by basti1012 an #######################################
//#################AB HIER NIX MEHR ENDERN #########################################################
//####################################################################################################
var time_box = document.createElement("div");
time_box.setAttribute('style', 'position:'+fest+';top:'+VonOben+'px;'+rightleft+':'+vonseite+'px; background:'+hinterfarbe+'; -moz-border-radius:'+borrad+'px;-moz-opacity:'+sichtbar+';opacity:'+sichtbar+';border:'+bordera+'px solid '+borderf+';  font:'+zbig+'px arial; z-index:99999;');
//time_box.setAttribute('style', 'position:absolute;top:'+VonOben+'px;'+rightleft+':'+vonseite+'px;');
document.body.insertBefore(time_box, document.body.firstChild);
var navigation = document.getElementById("header");
navigation.appendChild(time_box);
time_box.innerHTML='<span style=\"color:'+zahlfarbe+'; font-size:2000\">'+aaa+'</span>';

//copiright by basti by Napol?on by unbekannt
//var aaa = div.innerHTML += "Serverzeit: <b id='Uhrzeit'></b><br />";
//status.appendChild(div);