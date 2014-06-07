// ==UserScript==
// @name        RPG CP erweiterung
// @namespace   wolkenflitzer
// @description Eine kleine erweiterung des Control-Panels
// @include     *cp.rpg-city.de*
// @version     1
// @grant metadaten
// ==/UserScript==

//**********Menu Eintrag**********
var a = document.getElementsByTagName("a");
var ul = document.getElementsByTagName("ul")[0];
var li = document.createElement("li");
var ticketid = a[2].href;
ticketid.search(/ticket=(.*)/);
ticketid = RegExp.$1;

//**********Einzelne Einträge im Normalen Linken Menu**********
document.body.innerHTML = document.body.innerHTML.replace("anderen Spieler sehen oder erstellen.", "anderen Spieler sehen oder erstellen..<br><br>Deine abgesendeten <a href='http://cp.rpg-city.de/index.php?funktion=_bewerbungen&ticket=" + ticketid + "'>Bewerbungen</a>.<br>Eine <a href='http://cp.rpg-city.de/index.php?funktion=_beschwerden_erstellen&ticket=" + ticketid + "'>neue Beschwerde</a> erstellen.");

//**********KD Rate**********
var content = document.getElementsByClassName("infobox")[0].innerHTML;
content = content.replace(/<[^>]+>/g, "");
content.search(/Morde: (\d+)/);
var kills = parseInt(RegExp.$1);
content.search(/Gestorben: (\d+)/);
var deaths = parseInt(RegExp.$1);
document.getElementsByClassName("infobox")[0].innerHTML += "<br><br>********** Sonstiges **********<br><br><b><font color='black'>KD-Rate</font></b>: "+(Math.round(kills*10000/deaths)/10000)+" &Oslash;";

//**********Text-Replaces**********
document.body.innerHTML = document.body.innerHTML.replace(/Willkommen/, "Hey");
document.body.innerHTML = document.body.innerHTML.replace(/Job:/, "Beruf:");
document.body.innerHTML = document.body.innerHTML.replace(/10 Punkte/, "10 Strafpunkte");
document.body.innerHTML = document.body.innerHTML.replace(/Dein Account besitzt den Premium Rang./, "Du besitzt einen <font color='green'>Premium Account</font>");
document.body.innerHTML = document.body.innerHTML.replace(/Nicht vorhanden/g, "<img src='http://www.miriammeckel.de/wp-content/uploads/2010/03/Delete-icon-150x150.jpg' width='16' height='16'>");
document.body.innerHTML = document.body.innerHTML.replace(/Vorhanden/g, "<img src='http://www.lacigale-provence.de/media/wysiwyg/bilder/gruener-haken.png' width='16' height='16'>");

//**********Gesamtvermögen (Konto + Hand + Festgeld)**********
content.search(/Bargeld: ([^\$]+)/);
var bargeld = parseInt(RegExp.$1.replace(/\./g, ""));
content.search(/Konto: ([^\$]+)/);
var konto = parseInt(RegExp.$1.replace(/\./g, ""));
content.search(/Festgeld: ([^\$]+)/);
var festgeld = parseInt(RegExp.$1.replace(/\./g, ""));
//document.body.innerHTML = document.body.innerHTML.replace("<b>Festgeld:</b> 0$", "<b>Festgeld:</b> 0$<br><b><font color='black'>Gesamt:</font></b> "+formatNumber(bargeld+konto+festgeld)+"$");
document.body.innerHTML = document.body.innerHTML.replace("Ø", "Ø<br><b><font color='black'>Gesamtvermögen:</font></b> "+formatNumber(bargeld+konto+festgeld)+"$");

function formatNumber(number)
{
	number += "";
    number = number.split("");
    for(var i=number.length-3;i>0;i-=3)
    {
      number.splice(i, 0, ".");
    }
    return number.join("");
}

//**********Respektausrechner**********
content.search(/Respekt: (\d+) \/ (\d+)/);
var an1 = parseInt(RegExp.$1);
var an2 = parseInt(RegExp.$2);
document.body.innerHTML = document.body.innerHTML.replace("<b>Respekt:</b> "+an1+" / "+an2+"", "<b>Respekt:</b> "+an1+" / "+an2+" <b>("+formatNumber(an2-an1)+" Benötigt)</b>");