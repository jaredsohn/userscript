// ==UserScript==
// @name           Pfandkurs Fun-Script warner mit Blinketext
// @namespace      Origianl ist es nicht von mir(hersteller weiss ich nicht mehr) habe dieses Script zu 60 Prozent geandert by basti1012 
// @description    Bei steigenen Pfandkurs wird das Infobild immer mehr Blau unter den Pfandkurs kann man seinen eigenen Blinketext eingeben und auch die farbe aendern
// @include        *pennergame.de*
// @include        *berlin.pennergame.de*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// ==/UserScript==

var Blinktext = ' WERNER IST COOL';  // Hier dein Blink text eingeben
var Blinkfarbe= ' green ';           // Hier auf englisch die blinkfarbe angeben
var Fenster   = 'Ich bin der Werner und der Kurs steht bei 18 Cent';// Hier der Popup Text kommt bei 18 cent


//########################## ab hier nix mehr aendern #############################################

var blinkTimeout = 500;
var blinkIdx = 0;
function blink () {
if ( document.all && document.all.blink ) {
blinkIdx = (blinkIdx+=1) % 2 ;
var color = blinkColTbl [ blinkIdx ];
if ( document.all.blink.length ) {
for(i=0;i<document.all.blink.length;i++)
document.all.blink[i].style.color=color;
} else
document.all.blink.style.color=color;
setTimeout( "blink();" , blinkTimeout);
}}
var kurs = document.getElementById("pfandflaschen_kurs_ajax").innerHTML;
if(kurs > 11){document.getElementsByTagName("li")[1].style.backgroundColor = "blue";};
if(kurs > 12){document.getElementsByTagName("li")[2].style.backgroundColor = "blue";}
if(kurs > 13){document.getElementsByTagName("li")[3].style.backgroundColor = "blue";}
if(kurs > 14){document.getElementsByTagName("li")[4].style.backgroundColor = "blue";}
if(kurs > 15){document.getElementsByTagName("li")[5].style.backgroundColor = "blue";}
if(kurs > 16){document.getElementsByTagName("ul")[0].style.backgroundColor = "blue";}
if(kurs > 17){alert(""+Fenster+"");}
document.getElementsByTagName("li")[1].style.color = "white";
document.getElementsByTagName("li")[2].style.color = "white";
document.getElementsByTagName("li")[3].style.color = "white";
document.getElementsByTagName("li")[4].style.color = "white";
document.getElementsByTagName("li")[5].style.color = "white";
document.getElementsByTagName("li")[6].style.color = ""+Blinkfarbe+"";
var table = document.getElementsByTagName('form')[0];
var td = table.getElementsByTagName('li')[6];
td.innerHTML += '<b><blink><span id="blink">'+Blinktext+'</span></blink></b>';

// diese version wurde zu 60 prozent geendert von basti1012 dieses ist ein fun-script und entspricht nicht den original .Bei fehlern beschwerden an mich