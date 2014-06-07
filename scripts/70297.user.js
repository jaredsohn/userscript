// ==UserScript==
// @name           Laufzeiten
// @namespace      sdgsdgserg
// @include        *.die-staemme.*game.php*screen=info_command*
// ==/UserScript==

var url = this.location.href;
var url2 = this.location.href;
url = url.split("//");
url = url[1].split(".");



var herkunft = document.getElementsByClassName("vis")[0].innerHTML;
if(herkunft.search(/umbenennen/) != -1 && url2.search(/other/) != -1)
{
document.getElementsByClassName("vis")[0].getElementsByTagName("td")[16].getElementsByTagName("a")[1].style.display="none";
}

herkunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
var her = /\((\d+)\|(\d+)\)/;
var Ergebnis = her.exec(herkunft);
var ax = Ergebnis[1];
var ay = Ergebnis[2];

herkunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML;
her = /\((\d+)\|(\d+)\)/;
Ergebnis = her.exec(herkunft);
var vx = Ergebnis[1];
var vy = Ergebnis[2];
document.getElementsByClassName("vis")[0].innerHTML += "<tr><td colspan=3><a href='#' onclick='javascript:document.getElementById(\"laufzeitentd\").style.display=\"\";document.getElementById(\"laufzeiten\").src=\"http://david97.kilu.de/laufzeiten.php?url="+url[0]+"&ax="+ax+"&ay="+ay+"&vx="+vx+"&vy="+vy+"\";'>"+String.fromCharCode(187)+" Laufzeiten anzeigen</a></td></tr><tr><td colspan=3><a href='#' onclick='javascript:document.getElementById(\"laufzeitentd\").style.display=\"none\";'>"+String.fromCharCode(187)+" Laufzeiten nicht anzeigen</a></td></tr><tr><td colspan=3 id='laufzeitentd' style='display:none;'><img src='' id='laufzeiten' alt='Bild wird geladen - Bitte warten'></td></tr>";