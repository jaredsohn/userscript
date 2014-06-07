// ==UserScript==
// @name        RPG CP Erweiterung für RPG-City
// @namespace   Original_wolkenflitzer_Edit_Rox97
// @description Eine kleine Erweiterung des Control-Panels
// @include     *cp.rpg-city.de*
// @version     2.1
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


//**********Text-Replaces**********
document.body.innerHTML = document.body.innerHTML.replace(/Willkommen/, "Hey");
document.body.innerHTML = document.body.innerHTML.replace(/Job:/, "Beruf:");
document.body.innerHTML = document.body.innerHTML.replace(/10 Punkte/, "10 Strafpunkte");
document.body.innerHTML = document.body.innerHTML.replace(/Dein Account besitzt den Premium Rang./, "Du besitzt einen <font color='red'>Premium Account </font>");
//document.body.innerHTML = document.body.innerHTML.replace(/Nicht vorhanden/g, "<img src='http://www.miriammeckel.de/wp-content/uploads/2010/03/Delete-icon-150x150.jpg' width='12' height='12'>");
//document.body.innerHTML = document.body.innerHTML.replace(/Vorhanden/g, "<img src='http://www.lacigale-provence.de/media/wysiwyg/bilder/gruener-haken.png' width='12' height='12'>");
document.body.innerHTML = document.body.innerHTML.replace(/Verwarnungen:/, "<font color='blue'>Verwarnungen:");
document.body.innerHTML = document.body.innerHTML.replace(/Respekt/g, "</font>Respekt");
document.body.innerHTML = document.body.innerHTML.replace(/Partner:/g, "<br>Partner:<br>");
document.body.innerHTML = document.body.innerHTML.replace(/dein Glück/g, "deine Kohle");
document.body.innerHTML = document.body.innerHTML.replace(/versuchen/g, "rauswerfen");
document.body.innerHTML = document.body.innerHTML.replace(/Scheidung/g, "<br>Scheidung<br>");
document.body.innerHTML = document.body.innerHTML.replace(/Hey, Rox97./g, "Hey,<font color='blue'> Roy</font>");
document.body.innerHTML = document.body.innerHTML.replace(/Bargeld:/g, "Bargeld: <font color='blue'>");
document.body.innerHTML = document.body.innerHTML.replace(/Konto:/g, "Konto:<font color='blue'> ");
document.body.innerHTML = document.body.innerHTML.replace(/Festgeld:/g, "Festgeld: ");
document.body.innerHTML = document.body.innerHTML.replace(/Steuerklasse:/g, "Steuerklasse:<font color='blue'><b>");
document.body.innerHTML = document.body.innerHTML.replace(/Bargeld:/g, "</b></font>Bargeld:");
document.body.innerHTML = document.body.innerHTML.replace(/Zuletzt Online im Spiel am/g, "Zuletzt Online im Spiel<font color='blue'><b>");
document.body.innerHTML = document.body.innerHTML.replace(/Uhr./g, "</b></font>Uhr.");
document.body.innerHTML = document.body.innerHTML.replace(/Führerschein:/g, "<br><br><font style='text-shadow: 1px 1px 1px grey;'><h1>Scheine</h1></font>&bull; Führerschein:");
document.body.innerHTML = document.body.innerHTML.replace(/\$/g, "</font>$");
document.body.innerHTML = document.body.innerHTML.replace(/Nicht vorhanden/g, "<font color='white'>Nicht vorhanden</font>");
document.body.innerHTML = document.body.innerHTML.replace(/Vorhanden/g, "<font color='green'>Vorhanden</font>");
document.body.innerHTML = document.body.innerHTML.replace(/Flugschein:/g, "&bull; Flugschein:");
document.body.innerHTML = document.body.innerHTML.replace(/Bootschein:/g, "&bull; Bootschein:");
document.body.innerHTML = document.body.innerHTML.replace(/Angelschein:/g, "&bull; Angelschein:");
document.body.innerHTML = document.body.innerHTML.replace(/Waffenschein:/g, "&bull; Waffenschein:");
document.body.innerHTML = document.body.innerHTML.replace(/Zollpass:/g, "&bull; Zollpass:");
document.body.innerHTML = document.body.innerHTML.replace(/ \(Member\)/g, " ");
document.body.innerHTML = document.body.innerHTML.replace("verwalten","verwalten<br>Du kannst hier zu <a href='http://New-generationdm.de/index.php'>New-Generation Deathmatch</a> weiter geleitet werden.<br>");
document.body.innerHTML = document.body.innerHTML.replace("geleitet werden.<br>","geleitet werden<br>Du kannst hier zu <a href='http://I-love-dm.de'>I-Love-Dm</a> weiter geleitet werden.<br>");
/*#4A4A4A*/

//**********Weblinks**********
document.getElementsByClassName("infobox")[0].innerHTML += "<br><br><br> ********** Weblinks ********** <br><br> Du kannst hier zu <a href='http://New-generationdm.de/index.php' onclick=\"return window.confirm('Willst du das Forum von New-Generation Deathmatch besuchen?')\">New-Generation Deathmatch</a> weiter geleitet werden.<br>Du kannst hier zu <a href='http://i-love-dm.de' onclick=\"return window.confirm('Willst du das Forum von I-Love-Dm besuchen?')\">I-Love-Dm</a> weiter geleitet werden.<br><br>";


