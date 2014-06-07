// ==UserScript==
// @name        RPG CP Erweiterung
// @namespace   wolkenflitzer edit by Rox
// @description Eine kleine erweiterung des Control-Panels like a Rox
// @include     *cp.rpg-city.de*
// @version     1.1
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

li.innerHTML = "<a href='http://cp.rpg-city.de/index.php?scheidung&ticket=" + ticketid + "'>Scheidung</a>";


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
document.body.innerHTML = document.body.innerHTML.replace(/Dein Account besitzt den Premium Rang./, "Du besitzt einen <font color='red'>Premium Account </font>");
document.body.innerHTML = document.body.innerHTML.replace(/Nicht vorhanden/g, "<img src='http://www.miriammeckel.de/wp-content/uploads/2010/03/Delete-icon-150x150.jpg' width='12' height='12'>");
document.body.innerHTML = document.body.innerHTML.replace(/Vorhanden/g, "<img src='http://www.lacigale-provence.de/media/wysiwyg/bilder/gruener-haken.png' width='12' height='12'>");
document.body.innerHTML = document.body.innerHTML.replace(/Verwarnungen:/, "<font color='blue'>Verwarnungen:");
document.body.innerHTML = document.body.innerHTML.replace(/Respekt/g, "</font>Respekt");
document.body.innerHTML = document.body.innerHTML.replace(/Arbeitslos/g, "Harz IV Sau");
document.body.innerHTML = document.body.innerHTML.replace(/Partner/g, "<br>Popoficker");
document.body.innerHTML = document.body.innerHTML.replace(/dein Glück/g, "deine Kohle");
document.body.innerHTML = document.body.innerHTML.replace(/versuchen/g, "rauswerfen");
document.body.innerHTML = document.body.innerHTML.replace(/Scheidung/g, "<br>Anal befruchten<br>");
document.body.innerHTML = document.body.innerHTML.replace(/123Maffin/g, "<br>Gay Butters ");
document.body.innerHTML = document.body.innerHTML.replace(/Auktion/g, "Hier wird Maffins Würde verkauft ");
document.body.innerHTML = document.body.innerHTML.replace(/Hey, Rox97./g, "Hey,<font color='blue'> Roy</font> ");
document.body.innerHTML = document.body.innerHTML.replace(/Bargeld:/g, "Bargeld: <font color='red'>");
document.body.innerHTML = document.body.innerHTML.replace(/Konto:/g, "</font>Konto:<font color='red'> ");
document.body.innerHTML = document.body.innerHTML.replace(/Festgeld:/g, "</font>Festgeld: ");
document.body.innerHTML = document.body.innerHTML.replace(/Yuso/g, "Rattenbiatch");
document.body.innerHTML = document.body.innerHTML.replace(/Toni_Jester./g, "Hey,<font color='blue'> Süßer :*</font> ");

//**********Gesamtvermögen (Konto + Hand + Festgeld)**********
content.search(/Bargeld: ([^\$]+)/);
var bargeld = parseInt(RegExp.$1.replace(/\./g, ""));
content.search(/Konto: ([^\$]+)/);
var konto = parseInt(RegExp.$1.replace(/\./g, ""));
content.search(/Festgeld: ([^\$]+)/);
var festgeld = parseInt(RegExp.$1.replace(/\./g, ""));
document.body.innerHTML = document.body.innerHTML.replace("<b>Festgeld:</b> 1.250.000$", "<b>Festgeld:</b> 0$<br><b><font color='black'>Gesamt:</font></b> "+formatNumber(bargeld+konto+festgeld)+"$");
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