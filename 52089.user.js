// ==UserScript==
// @name           Bastis erweiterung für Highscoresuchen berlin hamburg in menel und dosser gibt es noch anzeige schwierigkeiten
// @namespace      copyright by basti1012 zu finden auf http://pennerhack.foren-city.de
// @description    Fügt zu den Highscore liste Punkte stadtsuche und Spielersuche hinzu und Lets Fight umrechnung
// @include        *pennergame.de/highscore/*
// @exclude        *menelgame.pl/highscore/*
// @exclude        *dossergame.co.uk/highscore/*
// ==/UserScript==`


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var gew = 'imgberlin.pennergame.de/cache/bl_DE/';
var ziela ='Dein Ziel muss ';
var bis =' bis ';
var zielb =' Punkte haben';
var town = 'Alle Stadtteile';
var hslink1 = 'http://berlin.pennergame.de/highscore/';
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var gew = 'img.pennergame.de/cache/de_DE/';
var ziela ='Dein Ziel muss';
var bis ='bis';
var zielb ='Punkte haben';
var town = 'Alle Stadtteile';
var hslink1 = 'http://pennergame.de/highscore/';
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var gew = 'img.menelgame.pl/cache/pl_PL/';
var ziela ='Twój cel musi mieć od ';
var bis =' do ';
var zielb =' punktów';
var town = 'Alle Stadtteile';
var hslink1 = 'http://menelgame.pl/highscore/';
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var gew = 'img.dossergame.co.uk/cache/en_EN/';
var ziela ='Your target needs to have between ';
var bis =' and ';
var zielb ='points';
var town = 'Alle Stadtteile';
var hslink1 = 'http://dossergame.co.uk/highscore/';
var pgurl = 'http://dossergame.co.uk/';
};
var table = document.getElementsByTagName('table')[0];
var tr = table.getElementsByTagName('tr')[1];
var td = tr.getElementsByTagName('td')[0].getElementsByTagName('strong')[0].textContent;
var position = parseInt(td);
var page = Math.ceil(position/20)
// min-, max- Angriffspunkte ermitteln

GM_xmlhttpRequest({
   method:"GET",

   url: ''+pgurl+'/highscore/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;
   ista = content.split('<option value="0">'+town+'</option>')[1];
   istb = ista.split('</select>')[0];


GM_xmlhttpRequest({
   method:"GET",

   url: ''+pgurl+'/fight/overview/',

   onload:function(responseDetails) {
   content = responseDetails.responseText;
   ziea = content.split(''+ziela+'')[1];
   zieb = ziea.split(''+bis+'')[0];
   ziec = content.split(''+bis+'')[1];
   zied = ziec.split(''+zielb+'')[0];


var hslink = ""+hslink1+"highscore/range/?max_points="+zieb+"&min_points="+zied+"&serverload=low"

var CNews = "<br><font color=\"blue\"><h1>Bastis Erweiterung zu den Highscorsuchen</h1></font><span><br>";
var CHigh = "<font color=\"green\"><h1>Klicke auf die Grünen Zahlen um in deinen Punktebereich zu suchen</h1></font><span><a class=\"tooltip1\" href=\""+hslink+"/\"><font color=\"red\">Let´s Fight </font><span><u>Angriffsbreite</u><b>Du darfst deine Gegner mit <font color=\"green\">"+zieb+"</font> bis <font color=\"green\">"+zied+"</font> Punkt angreifen</b></span></a></li><br>";
var CSuchen = "<font color=\"green\"><h1>Hier kannst du nach einzelnen Spieler suchen</h1></font><br><form method=\"GET\" action=\""+pgurl+"/highscore/search/\"><font color=\"#262626\">.</color><img src=\"http://media.pennergame.de/img/buddy/buddy_on.png\" alt=\"user\" title=\"Spielersuche\"><font color=\"#262626\">.</color><input name=\"name\" type=\"text\" size=\"2\">&nbsp;<input class=\"formbutton\" type=\"submit\" value=\"Suchen\"></form></li><br>";
var CMax = '<form method="GET" action="/highscore/range/"><input name="max_points" maxlength="10" value = "max" size="10" type="text" />';
var CMin = '<font color=\"green\"><h1>Min und Max eingeben für Punkte Direktsuche</h1></font><font color=\"red\"><h1>Nach eingabe von Min und Max kannst du noch nach Stadtteile Filtern</h1></font><span><form method="GET" action="/highscore/range/"><input name="min_points" maxlength="10" value = "min" size="10" type="text" />&nbsp;';
var Cpsuche = '<form method="GET" action="/highscore/range/">&nbsp;<input class="formbutton" type="submit" value=" Punkte Suche Starten" /><br>';
var Crechne = '<form method="GET" action="/highscore/"><br><font color=\"green\"><h1>Um nach der Punkte Suche mehrere Seiten zu erhalten hier Klicken(beginnt bei Highscoreseite '+page+')</h1></font><font color=\"red\"><h1>Nachdem die Suche beendet ist hier klicken für</h1><form method="GET" action="/highscore/'+page+'/"><input name="rechne" type="button" value=" Punkte umrechnen damit es weiter geht "<br>';
var Cstadt = '<br><font color=\"green\"><h1>Hier kannst du Spieler nach Stadtteile suchen</h1><font color=\"red\"><h1>Erst Min und Max eingeben damit der Stadtfilter Funktioniert</h1></font>'
+'<form method="GET" action="/highscore/search/"><select name="city_filter" style="width: 50%;"><option value="0">Alle Stadtteile</option>'+istb+'</select><td width="100">&nbsp;<input class="formbutton" align="center" type="submit" value="Anzeigen" style="width: 10%;"></td><br>';
var Seitego = '<font color=\"green\"><h1>Hier kannst du deine Highscore Seiten Direktwahl eingeben<br>Sonst musstet ihr immer die Browser Seite bearbeiten jetzt einfach die Zahl eingeben</h1><font color=\"red\"><h1>So sieht die seite dan aus '+pgurl+'highscore/'+page+' <br>Einfach Zahl eingeben die letze Zahl wird in Browser dann Automatisch eingegeben</h1><input name="go" type="text" id="go" value ="'+page+'" size="10"/>&nbsp;<input name="gogo" type="button" id="gogo" value="Direktwahl" />';


var Linkkette = ""+ CNews + CHigh + CSuchen + CMin + CMax + Cpsuche + Crechne + Cstadt + Seitego +""
//var content = document.getElementById('content');
//content.innerHTML =''+Linkkette+'';
var table = document.getElementsByTagName('table')[1];
table.innerHTML ='';
var table = document.getElementsByTagName('table')[2];
table.innerHTML ='';

var table = document.getElementById('content');
table.innerHTML +=''+Linkkette+'';


document.getElementsByName('gogo')[0].addEventListener('click', function start() {

var Text = document.getElementById('go').value;
window.location.href = 'http://'+window.location.hostname+'/highscore/'+Text+'/';

},false);

document.getElementsByName('rechne')[0].addEventListener('click', function rechne() {
window.location.href = 'http://'+window.location.hostname+'/highscore/'+page+'/';

},false);




}});
}});







// copyright by basti1012
// dieses ist eine erweiterung für alles aktuellen highscoresuchen Berlin und hamburg wurde getestet und geht

