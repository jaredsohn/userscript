// ==UserScript==
// @name Compartiendo Peleas
// @namespace Compartir peleas
// @include http://*.faveladogame.com.br/fight/
// @include http://*.faveladogame.com.br/fight/#*
// @include http://*.faveladogame.com.br/fight/?to=*
// @include http://*.faveladogame.com.br/fight/fightlog/*
// @include http://*.faveladogame.com.br/fight/overview/*
// @include http://*.faveladogame.com.br/fight/?status*
// @version 1.0.0
// ==/UserScript==

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = "1.1.1";
var THISSCRIPTNAME = "Fightinfo";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/63528'; // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/63528.user.js'; // Skript-URL bei userscripts.org

var SubmitButtonHTML = '<form name="Formular" action=""><input type="button" value="Ver todas las peleas" id="kaempfeanzeigen"></form>';
// Basis-URL für Kampfincons
var FIGHTICONS_URL = "http://static.faveladogame.com.br/img/pv4/dots/"

// URLs Warn-Icon
var ICON_WARNING = 'warning.gif';

// URLs für Icons
var INFO_ICON = 'http://i47.tinypic.com/1072mv5.jpg';
var ICON_LASTFIGHT_NOCOMMENT = 'http://i49.tinypic.com/6jhymv.jpg';
var ICON_LASTFIGHT_COMMENT = 'http://i47.tinypic.com/n2igc4.jpg';
var ICON_FIGHTCOMMENT = 'http://i46.tinypic.com/imnpsj.jpg';
var ICON_NOFIGHTCOMMENT = 'http://i50.tinypic.com/4uuflx.jpg';
var ICON_SENDTOSB = 'http://i47.tinypic.com/sqk2ee.jpg';

var ICON_0_0 = 'http://i50.tinypic.com/5ck1lg.jpg';
var ICON_0_1 = 'http://i47.tinypic.com/fvjj7s.jpg';
var ICON_1_0 = 'http://i46.tinypic.com/2r5fa06.jpg';
var ICON_1_1 = 'http://i45.tinypic.com/23tqfdh.jpg';
var ICON_2_0 = 'http://i49.tinypic.com/2z5qfeg.jpg';
var ICON_2_1 = 'http://i48.tinypic.com/2l97imt.jpg';
var ICON_EVADE = 'http://i50.tinypic.com/2vtnr6h.jpg';


var BASE_URL = 'http://www.faveladogame.com.br';
var API_URL = 'http://www.faveladogame.com.br/dev/api/user.';
var FIGHTSEARCH_URL = 'http://www.faveladogame.com.br/fight/fightlog/?q=';
var FIGHLOG_URL = "http://www.faveladogame.com.br/fight/fightlog/";
var PENNERZONEUSER_URL = 'http://hamburg.pennerzone.de/highscore/u';
var PENNERZONESEARCH_URL1 = 'http://hamburg.pennerzone.de/highscore/?page=1&points_min=';
var PENNERZONESEARCH_URL2 = '&points_max=&gang=egal&action=Suchen.&city=0&name_type=contains&name_text=&sDay=&sMonth=&sYear=&eDay=&eMonth=&eYear=';
var SBADD_URL = 'http://www.faveladogame.com.br/gang/chat/add/';
var TOWNEXTENSION = "HH";


// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
var year = "";
var month = "";
var day = "";

year = DateToFormat.getFullYear();
month = DateToFormat.getMonth() + 1;
month = "0" + month;
if (month.length == 3) {
month = month.substr(1,2);
}
day = "0" + DateToFormat.getDate();
if (day.length == 3) {
day = day.substr(1,2);
}

return year + "-" + month + "-" + day;
}


// **********************************************************************************
// **********************************************************************************
// Funktion extrahiert die eigene UserID
// **********************************************************************************
// **********************************************************************************
function getOwnUserID() {
// getOwnUserID() + TOWNEXTENSION
try {
// Eigene UserID ermitteln
var ownuserid = document.getElementsByTagName('html')[0].innerHTML.split('<a href="/profil/id:')[1];
ownuserid = ownuserid.split('/"')[0];
return ownuserid;
} catch(err) {
GM_log("Fehler beim Ermitteln der eigenen UserID: " + err);
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Array nach Zeit sortieren
// ***********************************************************************************************
// ***********************************************************************************************
function sortByTime(a, b) {
var jetzt = new Date();
var hour1 = a[0].substr(0, 2);
var hour2 = b[0].substr(0, 2);

if (jetzt.getHours() > 21) {
}

var x = hour1 + a[0].substr(3, 2) + a[0].substr(6, 2);
var y = hour2 + b[0].substr(3, 2) + b[0].substr(6, 2);

return ((x < y) ? (-1) : ((x > y) ? 1 : 0));
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ersetzt das Kampf-Icon
// ***********************************************************************************************
// ***********************************************************************************************
function ChangeFightIcon(currenttr) {
var fightimage = currenttr.getElementsByTagName("td")[0].getElementsByTagName("img")[0];
var imagename = fightimage.src.split(FIGHTICONS_URL)[1];

// **********************************************************************************
// In Abhängigkeit der Spalte
// **********************************************************************************
switch (imagename) {
case '0_0.gif': {
fightimage.src = ICON_0_0;
fightimage.alt = "AUS";
break;
}
case '0_1.gif': {
fightimage.src = ICON_0_1;
fightimage.alt = "EIN";
break;
}
case '1_0.gif': {
fightimage.src = ICON_1_0;
fightimage.alt = "AUS";
break;
}
case '1_1.gif': {
fightimage.src = ICON_1_1;
fightimage.alt = "EIN";
break;
}
case '2_0.gif': {
fightimage.src = ICON_2_0;
fightimage.alt = "AUS";
break;
}
case '2_1.gif': {
fightimage.src = ICON_2_1;
fightimage.alt = "EIN";
break;
}
case 'evade.gif': {
fightimage.src = ICON_EVADE;
fightimage.alt = "";
break;
}
}

fightimage.width = "12";
fightimage.height = "12";
fightimage.style.paddingLeft = "1px";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Erste Tabelle (abgeschlossene Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFirstTable(table) {
// Tabellenbreite neu festlegen
table.width = "570";

// Referenz auf die Zeilen der Tabelle speichern
var trs = table.getElementsByTagName("tr");

var ROW_HEIGHT = "17px";

// Für alle Zeilen
for (var x = 0; x <= trs.length - 1; x++) {
// Zellen neu formatieren
trs[x].getElementsByTagName("td")[0].setAttribute('style', 'vertical-align:middle; width: 15px; height:' + ROW_HEIGHT + ';');

// Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
if (x > 0 && x <= trs.length - 2) {
// Kampf-Icon austauschen
ChangeFightIcon(trs[x]);
}

trs[x].getElementsByTagName("td")[1].setAttribute('style', 'vertical-align:middle; width: 70px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[2].setAttribute('style', 'vertical-align:middle; width:260px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[3].setAttribute('style', 'vertical-align:middle; width: 85px; text-align:right; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[4].setAttribute('style', 'vertical-align:middle; width: 75px; text-align:right; height:' + ROW_HEIGHT + ';');

// neue Zelle erzeugen und einfügen
newtd = document.createElement("td");
newtd.setAttribute('style', 'vertical-align:middle; width: 55px; height:' + ROW_HEIGHT + ';');
trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
}
// erste Zeile dunkel färben
trs[0].bgColor = "#232323";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Zweite Tabelle (eintreffende Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatSecondTable(table) {
// Tabellenbreite neu festlegen
table.width = "550";
table.setAttribute('style', table.getAttribute('style') + '; table-layout:fixed');

// Referenz auf die Zeilen der Tabelle speichern
var trs = table.getElementsByTagName("tr");

var ROW_HEIGHT = "25px";

// Wenn es mindestens einen eintreffenden Kampf gibt
if (trs.length > 1) {
// Für alle Zeilen
for (var x = 0; x <= trs.length - 1; x++) {
// Zellen neu formatieren
trs[x].getElementsByTagName("td")[0].setAttribute('style', 'vertical-align:middle; width:15px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[1].setAttribute('style', 'vertical-align:middle; width:50px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[2].setAttribute('style', 'vertical-align:middle; width:180px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[3].setAttribute('style', 'vertical-align:middle; width:150px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[4].setAttribute('style', 'vertical-align:middle; width:120px; height:' + ROW_HEIGHT + ';');

// neue Zelle erzeugen und einfügen
newtd = document.createElement("td");
newtd.setAttribute('style', 'vertical-align:middle; width:35px; height:' + ROW_HEIGHT + ';');
trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
}
// erste Zeile dunkel färben
trs[0].bgColor = "#232323";
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Liest die Daten aus der Tabelle table für eintreffende Kämpfe aus und speichert sie im Array
// IncomingFights
// ***********************************************************************************************
// ***********************************************************************************************
function ReadFightData(table, IncomingFights) {
// Referenz auf die Zeilen der Tabelle speichern
var trs = table.getElementsByTagName("tr");

// **********************************************************************************
// AUSLESEN DER KAMPFDATEN
// **********************************************************************************
// Für alle Zeilen mit Kämpfen
for (var x = 1; x <= trs.length - 1; x++) {
// Referenz auf die Zellen der aktuellen Zeile speichern
var tds = trs[x].getElementsByTagName("td");

// Wenn mindestens ein Kampf existiert
if (tds.length > 1) {
// Array um Element für den aktuellen Kampf erweitern
IncomingFights[x - 1] = new Array(4);

// Kampfdaten in das Array einlesen
IncomingFights[x - 1][0] = tds[1].innerHTML; // Zeit
IncomingFights[x - 1][1] = tds[3].innerHTML; // Name
IncomingFights[x - 1][2] = tds[4].innerHTML; // Bande
IncomingFights[x - 1][3] = tds[5].innerHTML; // Ausweichen
}
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Schreibt die Daten aus dem Array IncomingFights in die Tabelle table
// ***********************************************************************************************
// ***********************************************************************************************
function WriteFightData(table, IncomingFights) {
// Referenz auf die Zeilen der Tabelle speichern
var trs = table.getElementsByTagName("tr");

// Für alle Zeilen mit eingehenden Kämpfen
for (var x = 0; x < IncomingFights.length; x++) {
// Referenz auf die Zellen der aktuellen Zeile speichern
var tds = trs[x + 1].getElementsByTagName("td");

// Kampfdaten aus dem Array den Zellen zuweisen
tds[1].innerHTML = IncomingFights[x][0]; // Zeit
tds[3].innerHTML = IncomingFights[x][1]; // Name

// Name und UserID des Kämpfers aus dem Link auslesen
var username = tds[3].getElementsByTagName("a")[0].innerHTML;
var userid = tds[3].innerHTML.split('/id:')[1].split('/"')[0];

tds[2].innerHTML = GetIconInsertHTML(userid, username, ""); // Info
tds[4].innerHTML = IncomingFights[x][2]; // Bande
tds[5].innerHTML = IncomingFights[x][3]; // Ausweichen
}
}

// **********************************************************************************
// Funktion extrahiert den Usernamen aus der fightinfo
// **********************************************************************************
function GetUsernameFromFightComment(fightinfo) {
return fightinfo.split("*")[0];
}

// **********************************************************************************
// Funktion extrahiert das Datum aus der fightinfo
// **********************************************************************************
function GetTimeFromFightComment(fightinfo) {
return fightinfo.split("*")[1];
}

// **********************************************************************************
// Funktion extrahiert den Kommentar aus der fightinfo
// **********************************************************************************
function GetCommentFromFightComment(fightinfo) {
return fightinfo.split("*")[2];
}

// **********************************************************************************
// Funktion ermittelt die Anzahl der Kampfkommentare
// **********************************************************************************
function GetNrOfFightCommentsInList(username) {
return GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").split("|").length - 1;
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function IsFightCommentInList(username, fighttime) {
if (GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").indexOf(fighttime) != -1) {
return true;
} else {
return false;
}
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function GetFightCommentFromList(username, fighttime) {
var fightcomments = GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").split("|");

for (var i = 0; i < GetNrOfFightCommentsInList(username); i++) {
// Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
if (fightcomments[i].indexOf(fighttime) != -1) {
return fightcomments[i].split("*")[1];
}
}

return "";
}

// **********************************************************************************
// Funktion aktualisiert einen bestehenden Kampfkommentar
// **********************************************************************************
function UpdateFightCommentToList(fightinfo) {
var username = GetUsernameFromFightComment(fightinfo);
var fighttime = GetTimeFromFightComment(fightinfo);
var fightcomments = GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "").split("|");
var NrOfFightComments = GetNrOfFightCommentsInList(username);
var updatedfightcomments = "";

for (var i = 0; i < NrOfFightComments; i++) {
// Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
if (fightcomments[i].indexOf(fighttime) != -1) {
// Wenn der Kommentar nicht leer ist
if (GetCommentFromFightComment(fightinfo) != "") {
updatedfightcomments = updatedfightcomments + GetTimeFromFightComment(fightinfo) + "*" + GetCommentFromFightComment(fightinfo) + "|";
}
// sonst: Die übergebene Kampfzeit wurde im aktuellen Eintrag nicht gefunden
} else {
updatedfightcomments = updatedfightcomments + fightcomments[i] + "|";
}
}

GM_setValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, updatedfightcomments);
}

// **********************************************************************************
// Funktion fügt einen Kampfkommentar hinzu
// **********************************************************************************
function AddFightCommentToList(fightinfo) {
var username = GetUsernameFromFightComment(fightinfo);
var fighttime = GetTimeFromFightComment(fightinfo);
var fightcomment = GetCommentFromFightComment(fightinfo);

GM_setValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, GM_getValue("FightComment" + getOwnUserID() + TOWNEXTENSION + username, "") + fighttime + "*" + fightcomment + "|");
}



// **********************************************************************************
// Handler für Posten eines Kampfes in die SB mit einer Grafik assoziieren
// **********************************************************************************
function PostToSBHandler(currentimg, activefight) {
// Click-Handler hinzufügen
currentimg.addEventListener("click", function(event) {
// ***********************************************************************************************
// Funktion konvertiert HTML-Userstring zu BBCode-Userstring
// ***********************************************************************************************
function ConvertUserToBB(htmlstring) {
var userlink = htmlstring.split('<a href="')[1].split('"')[0];
var username = htmlstring.split('">')[1].split('</a>')[0];
return '[url=' + BASE_URL + userlink + '][b][color=#FFFFFF]' + username + '[/color][/b][/url]';
}

// ***********************************************************************************************
// Funktion konvertiert HTML-Kampficonstring zu BBCode-Kampficonstring
// ***********************************************************************************************
function ConvertIconToBB(htmlstring) {
var iconlink = htmlstring.split('src="')[1].split('" ')[0];
return '[img]' + iconlink + '[/img]';
}

// ***********************************************************************************************
// Funktion ermittelt die UserID
// ***********************************************************************************************
function GetUserID(htmlstring) {
return htmlstring.split('href="/profil/id:')[1].split('/">')[0];
}

// ***********************************************************************************************
// addEventListener-Code
// ***********************************************************************************************
// Wenn der zu postende Kampf ein aktiver Kampf ist
if (activefight) {
// Inhalt der Box auslesen, in der die Infos über den ausgehenden Kampf stehen
var boxcontent = currentimg.parentNode.parentNode.parentNode.innerHTML;
// In die SB zu postende Nachricht zusammenstellen
var posttext = '[b]Angriff läuft bereits auf [/b]' + ConvertUserToBB(boxcontent.split('Angriff läuft bereits auf ')[1].split('&nbsp;')[0]);
posttext = posttext + ', ' + trimString(boxcontent.split('<br>')[1].split('<br>')[0]) + '.';

// Kampf in die SB posten
PostToSB(posttext, "La pelea ha sido reportada a la bandeja de gritos!");
// sonst: Ein Kampf aus dem Log soll gepostet werden
} else {
var tds = this.parentNode.parentNode.parentNode.getElementsByTagName("td");
var pointscol = tds.length - 1;
var fighticon = ConvertIconToBB(tds[0].innerHTML.split('/">')[1].split('</a>')[0]);
var fighttime = tds[1].innerHTML;
var fightuser = ConvertUserToBB(trimString(tds[3].innerHTML));
var fightuserid = GetUserID(trimString(tds[3].innerHTML));
var fightmoney = trimString(tds[pointscol - 1].innerHTML);
var fightpoints = trimString(tds[pointscol].innerHTML.split('&nbsp;<a ')[0]);

var att=document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].textContent.split('[?]')[0];
var def=document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[3].getElementsByTagName('td')[1].textContent.split('[?]')[0];
var figtstats='[color=yellow][big]#Level: '+(parseInt(att)+parseInt(def))+' ('+parseInt(parseInt(att)*1.1+parseInt(def))+')[/big][/color]\n[b]#ATT: '+att+' ('+parseInt(parseInt(att)*1.1)+')\n#DEF: '+def+'[/b]\n\n';



// **********************************************************************************
// Beziehen des eigenen XML-Datensatzes
// **********************************************************************************
GM_xmlhttpRequest({method: 'GET', url: API_URL + fightuserid + '.xml', onload: function(responseDetails) {
var parser = new DOMParser();
var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

// Bandenname auslesen
var gangname = dom.getElementsByTagName('name')[1].textContent;
// BandenID auslesen
var gangid = dom.getElementsByTagName('id')[1].textContent;

// Wenn der Penner in einer Bande ist
if (gangname != "False") {
var fightgang = ' [url=' + BASE_URL + '/profil/bande:' + gangid + '/]' + gangname + '[/url]';
// sonst: Der Penner ist in keiner Bande
} else {
var fightgang = " -keine Bande-";
}

// Wenn Punkte verloren wurden
if (Number(fightpoints) < 0) {
var colorstring = '#FF0000';
// sonst: Es wurden keine Punkte verloren
} else {
var colorstring = '#33CC00';
}

// Kampf in die SB posten
PostToSB(figtstats + fighticon + " " + fighttime + " " + fightuser + fightgang + " [color=" + colorstring + ']' + fightmoney + " " + fightpoints + '[/color]', "La lucha ha sido reportada a la bandeja de gritos!");
}
});
}
}, false);
}

// **********************************************************************************
// Handler für Hinzufügen oder Ändern eines Kampfkommentars mit Link assoziieren
// **********************************************************************************
function FightCommentHandler(currentlink) {
// Click-Handler hinzufügen
currentlink.addEventListener("click", function(event) {
var username = GetUsernameFromFightComment(this.id);
var fighttime = GetTimeFromFightComment(this.id);

var fightcomment = GetFightCommentFromList(username, fighttime);
var fightcomment = prompt("Cambie el comentario o introduzca uno nuevo:", fightcomment);
var newfightcomment = this.id + "*" + fightcomment;

if (fightcomment != null) {
// Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
if (IsFightCommentInList(username, fighttime)) {
UpdateFightCommentToList(newfightcomment);
// sonst: Es gibt zum aktuellen Kampf noch keinen Kommentar in der Liste
} else {
AddFightCommentToList(newfightcomment);
}

// Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
if (IsFightCommentInList(username, fighttime)) {
this.getElementsByTagName("img")[0].src = ICON_FIGHTCOMMENT;
} else {
this.getElementsByTagName("img")[0].src = ICON_NOFIGHTCOMMENT;
}

// Wenn es zum aktuellen Gegner einen Eintrag gibt
if (GetNrOfFightCommentsInList(username)) {
this.parentNode.getElementsByTagName("img")[1].src = ICON_LASTFIGHT_COMMENT;
} else {
this.parentNode.getElementsByTagName("img")[1].src = ICON_LASTFIGHT_NOCOMMENT;
}
}
}, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fügt die Info-Links in die erste Tabelle hinzu
// ***********************************************************************************************
// ***********************************************************************************************
function InsertInfoInFirstTable(table) {
// Referenz auf die Zeilen der Tabelle speichern
var trs = table.getElementsByTagName("tr");

// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
for (var x = 1; x <= trs.length - 2; x++) {
// Referenz auf die Zellen der aktuellen Zeile speichern
var tds = trs[x].getElementsByTagName("td");

// Name und UserID des Kämpfers aus dem Link auslesen
var username = tds[3].getElementsByTagName("a")[0].innerHTML;
var userid = tds[3].innerHTML.split('/id:')[1].split('/"')[0];
var fighttime = tds[1].innerHTML;

// ***********************************************************************************************
// Posten in die SB
// ***********************************************************************************************
// Letzte Spalte ist Punktespalte
var pointscol = tds.length - 1;
var pointstd = trs[x].getElementsByTagName("td")[pointscol];
// Grafik für Posten in SB einfügen
pointstd.innerHTML = pointstd.innerHTML + '&nbsp;<a href="#form1"><img border="0" src="' + ICON_SENDTOSB + '" title="Reportar lucha contra ' + username + ' en la bandeja de gritos." height="14" width="14"></a>';
// Handler für das Posten in SB mit Grafik assoziieren
PostToSBHandler(pointstd.getElementsByTagName("img")[0], false);

// ***********************************************************************************************
// Info-Icons
// ***********************************************************************************************
// Info-Icons in die neue Zelle einfügen
var iconstd = trs[x].getElementsByTagName("td")[2];
iconstd.innerHTML = GetIconInsertHTML(userid, username, fighttime);
// Handler für Fightkommentare mit Link assoziieren
FightCommentHandler(iconstd.getElementsByTagName("a")[2]);
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fightlog-Tabelle neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightlogTable(table) {
// Tabellenbreite neu festlegen
table.width = "660";

// Referenz auf die Zeilen der Tabelle speichern
var trs = table.getElementsByTagName("tr");

var ROW_HEIGHT = "17px";

// Wenn es mindestens einen Kampf gibt
if (trs.length > 1) {
// Für alle Zeilen
for (var x = 0; x <= trs.length - 1; x++) {
// Zellen neu formatieren
trs[x].getElementsByTagName("td")[0].setAttribute('style', 'vertical-align:middle; width:15px; height:' + ROW_HEIGHT + ';');

// Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
if (x > 0 && x <= trs.length - 2) {
// Kampf-Icon austauschen
ChangeFightIcon(trs[x]);
}

trs[x].getElementsByTagName("td")[1].setAttribute('style', 'vertical-align:middle; width:75px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[2].setAttribute('style', 'vertical-align:middle; width:200px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[3].setAttribute('style', 'vertical-align:middle; width:175px; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[4].setAttribute('style', 'vertical-align:middle; width:85px; text-align:right; height:' + ROW_HEIGHT + ';');
trs[x].getElementsByTagName("td")[5].setAttribute('style', 'vertical-align:middle; width:65px; text-align:right; height:' + ROW_HEIGHT + ';');

// neue Zelle erzeugen und einfügen
newtd = document.createElement("td");
newtd.setAttribute('style', 'vertical-align:middle; width:55px; height:' + ROW_HEIGHT + ';');
trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
}
// erste Zeile dunkel färben
trs[0].bgColor = "#232323";
}
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Anzahl eintreffender Kämpfe
// **********************************************************************************
// **********************************************************************************
function GetNumberOfFights(content) {
try {
// Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird;
// Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
return content.split(ICON_WARNING).length - 1;
} catch(err) {
GM_log("Fehler beim Ermitteln der Zahl eintreffender Kämpfe: " + err);
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion formatiert einen HTML-String mit den Info-Icons für den übergebenen Penner
// ***********************************************************************************************
// ***********************************************************************************************
function GetIconInsertHTML(userid, username, fighttime) {
// Icon für Zugriff auf Pennerzone-Statistik einfügen
var IconInsertHTML = '<a href="' + 'http://www.faveladogame.com.br/profil/id:'/*PENNERZONEUSER_URL*/ + userid + /*'/'*/ /*+ username*/ + '/" target="_blank"><img border="0" src="' + INFO_ICON + '" title="Pennerzone-Infos über ' + username + '" height="14" width="14" alt="O"></a>&nbsp;';

// Anzahl an Kommentaren zum aktuellen User ermitteln
var NrOfFightComments = GetNrOfFightCommentsInList(username);

// Wenn es bereits Kampfkommentare gibt
if (NrOfFightComments > 0) {
var lastfighticon = ICON_LASTFIGHT_COMMENT;
if (NrOfFightComments > 1) {
var lastfightadditionalinfo = ': Ya existen ' + NrOfFightComments + ' comentarios sobre este mendigo!';
} else {
var lastfightadditionalinfo = ': Ya existe un comentario sobre este mendigo!';
}
// sonst: Es gibt noch keine Kampfkommentare
} else {
var lastfighticon = ICON_LASTFIGHT_NOCOMMENT;
var lastfightadditionalinfo = "";
}
// Icon für letzte Kämpfe einfügen
IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTSEARCH_URL + username + '" target="_blank"><img border="0" src="' + lastfighticon + '" title="Información acerca de las batallas anteriores contra ' + username + lastfightadditionalinfo + '" height="14" width="14" alt="O"></a>&nbsp;';

// Wenn eine Kampfzeit angegeben wurde
if (fighttime != "") {
// Wenn zu diesem Kampf bereits ein Kommentar existiert
if (IsFightCommentInList(username, fighttime)) {
var fightcommenticon = ICON_FIGHTCOMMENT;
// sonst: Zu diesem Kampf existiert noch kein Kommentar
} else {
var fightcommenticon = ICON_NOFIGHTCOMMENT;
}
// Icon für Kampfkommentare einfügen
IconInsertHTML = IconInsertHTML + '<a href="#form1" id="' + username + "*" + fighttime + '"><img border="0" src="' + fightcommenticon + '" title="Crear o cambiar comentario sobre esta lucha" height="14" width="14" alt="O"></a>'
}

// Icon-HTML zurückgeben
return IconInsertHTML;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion entfernt White Space aus dem übergebenen String
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion schreibt die aktuelle Anzahl eintreffender Kämpfe in die Zeilenüberschrift
// ***********************************************************************************************
// ***********************************************************************************************
function WriteNrOfIncomingFights(content, table) {
// Anzahl einkommender Kämpfe ermitteln
var NrOfIncomingFights = GetNumberOfFights(content);

// Wenn es mindestens einen einkommenden Kampf gibt
if (NrOfIncomingFights > 0) {
// Referenz auf Tabellenzeilen in trs speichern
var trs = table.getElementsByTagName("tr");

// Für alle Tabellenzeilen
for (var i = 0; i < trs.length; i++) {
// Wenn in der aktuellen Tabellenzeile "Eintreffende Kämpfe" steht
if (trs[i].innerHTML.indexOf("Eintreffende Kämpfe") != -1) {
// Referenz auf erstes Span speichern
var span = trs[i].getElementsByTagName("span")[0];
// Wenn nur ein Kampf eintrifft
if (NrOfIncomingFights == 1) {
span.innerHTML = "1 eintreffender Kampf";
// sonst: Es treffen mehrere Kämpfe ein
} else {
span.innerHTML = NrOfIncomingFights + " eintreffende Kämpfe";
}
}
}
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ruft alle Kämpfe einer Logseite aus und iteriert ggf. auf die nächste bis zum Ende
// ***********************************************************************************************
// ***********************************************************************************************
function ProcessLogPage(table, ProgressTable, LogPageNr) {

// Wenn die letzte abzurufende Seite noch nicht erreicht ist
if (LogPageNr <= Number(document.getElementById("seitebis").value)) {

// Referenz auf Tabellenzeilen in trs speichern
var trs = table.getElementsByTagName("tr");

// **********************************************************************************
// Beziehen der Bandenseite
// **********************************************************************************
GM_xmlhttpRequest({method: 'GET', url: FIGHLOG_URL + LogPageNr + "/",onload: function(logresponseDetails) {
FillProgressTable(ProgressTable, LogPageNr);

// Content der Seite speichern
var logcontent = logresponseDetails.responseText;

var fighttable = logcontent.split('<table width="550" border="0" cellpadding="1" cellspacing="0" bgcolor="#363636" style="-moz-border-radius: 2px;">')[1];
fighttable = fighttable.split('</table>')[0];

var fighttrs = fighttable.split('<tr');

var Fights = new Array();

for (var i = 2; i <= fighttrs.length - 2; i++) {
var currenttr = fighttrs[i].split("</tr>")[0];
var fighttds = currenttr.split("<td>");

Fights[i - 2] = new Array(6);

Fights[i - 2][0] = trimString(fighttds[1].split("</td>")[0]); // Kampficon
Fights[i - 2][1] = trimString(fighttds[2].split("</td>")[0]); // Datum/Uhrzeit
Fights[i - 2][2] = trimString(fighttds[3].split("</td>")[0]); // Name
Fights[i - 2][3] = trimString(fighttds[4].split("</td>")[0]); // Bande
Fights[i - 2][4] = trimString(fighttds[5].split("</td>")[0]); // Geld
Fights[i - 2][5] = trimString(fighttds[6].split("</td>")[0]); // Punkte
}

var ROW_HEIGHT = "17px";

// Für alle Kämpfe
for (var i = 0; i < Fights.length - 1; i++) {
// Neue Zeile erzeugen
var newtr = document.createElement("tr");

// Neue Zellen einfügen
for (var j = 0; j < 7; j++) {
var newtd = document.createElement("td");
newtr.appendChild(newtd);
}

newtr.getElementsByTagName("td")[0].setAttribute('style', 'vertical-align:middle; width:15px; height:' + ROW_HEIGHT + ';');
newtr.getElementsByTagName("td")[0].innerHTML = Fights[i][0];

// Kampf-Icon austauschen
ChangeFightIcon(newtr);

newtr.getElementsByTagName("td")[1].setAttribute('style', 'vertical-align:middle; width:75px; height:' + ROW_HEIGHT + ';');
newtr.getElementsByTagName("td")[1].innerHTML = Fights[i][1];

newtr.getElementsByTagName("td")[2].setAttribute('style', 'vertical-align:middle; width:35px; height:' + ROW_HEIGHT + ';');

newtr.getElementsByTagName("td")[3].setAttribute('style', 'vertical-align:middle; width:170px; height:' + ROW_HEIGHT + ';');
newtr.getElementsByTagName("td")[3].innerHTML = Fights[i][2];

newtr.getElementsByTagName("td")[4].setAttribute('style', 'vertical-align:middle; width:175px; height:' + ROW_HEIGHT + ';');
newtr.getElementsByTagName("td")[4].innerHTML = Fights[i][3];

newtr.getElementsByTagName("td")[5].setAttribute('style', 'vertical-align:middle; width:85px; text-align:right; height:' + ROW_HEIGHT + ';');
newtr.getElementsByTagName("td")[5].innerHTML = Fights[i][4];

newtr.getElementsByTagName("td")[6].setAttribute('style', 'vertical-align:middle; width:65px; text-align:right; height:' + ROW_HEIGHT + ';');
newtr.getElementsByTagName("td")[6].innerHTML = Fights[i][5];

// Name und UserID des Kämpfers aus dem Link auslesen
var username = newtr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML;
var userid = newtr.getElementsByTagName("td")[3].innerHTML.split('/id:')[1].split('/"')[0];
var fighttime = Fights[i][1];

// Info-Icons in die neue Zelle einfügen
newtr.getElementsByTagName("td")[2].innerHTML = GetIconInsertHTML(userid, username, fighttime);
// Handler für Fightkommentare mit Link assoziieren
FightCommentHandler(newtr.getElementsByTagName("td")[2].getElementsByTagName("a")[2]);

// ***********************************************************************************************
// Posten in die SB
// ***********************************************************************************************
// Letzte Spalte ist Punktespalte
var pointscol = 6;
var pointstd = newtr.getElementsByTagName("td")[pointscol];
// Grafik für Posten in SB einfügen
pointstd.innerHTML = pointstd.innerHTML + '&nbsp;<a href="#form1"><img border="0" src="' + ICON_SENDTOSB + '" title="Daten des Kampfes gegen ' + username + ' in die Shoutbox posten." height="14" width="14"></a>';
// Handler für das Posten in SB mit Grafik assoziieren
PostToSBHandler(pointstd.getElementsByTagName("img")[0], false);

// Neue Zeile einfügen
trs[trs.length - 1].parentNode.insertBefore(newtr, trs[trs.length - 1]);

}

// Letzte Zeile in den sichtbaren Bereich bringen/anzeigen
//trs[trs.length - 1].scrollIntoView(false);

// Nächste Fightlogseite abrufen
ProcessLogPage(table, ProgressTable, LogPageNr + 1)
}
});
// sonst: Die letzte abzurufende Seite wurde erreicht
} else {
// Button disablen
document.getElementById("kaempfeanzeigen").disabled = true;
// Letzte Seite speichern, damit sie bei der nächsten Anzeige wiederhergestellt werden kann
GM_setValue("SeiteBis", Number(document.getElementById("seitebis").value));
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt einen Fortschrittsbalken und liefert ihn als Tabelle zurück
// ***********************************************************************************************
// ***********************************************************************************************
function CreateProgressTable(columnr) {
var newtable = document.createElement("table");
newtable.style.width = "300px";
newtable.style.border = "#000000 1px solid";
var newtr = document.createElement("tr");

newtable.appendChild(newtr);

for (var i = 1; i <= columnr; i++) {
var newtd = document.createElement("td");
newtd.innerHTML = '&nbsp;';
newtr.appendChild(newtd);
}

return newtable;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion füllt den Fortschrittsbalken bis zur Spalte columnnr
// ***********************************************************************************************
// ***********************************************************************************************
function FillProgressTable(currenttable, columnnr) {
for (var i = 0; i < columnnr; i++) {
var currenttd = currenttable.getElementsByTagName("td")[i];
currenttd.style.backgroundColor = "#33cc00 ";
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt die Controls zur vollständigen Kampfanzeige ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertSubmitButton(content, table) {

// Referenz auf Tabellenzeilen in trs speichern
var trs = table.getElementsByTagName("tr");

var rownr = 1;

// ***********************************************************************************************
// Neue Zeile mit Button einfügen
// ***********************************************************************************************
var newtr = document.createElement("tr");
var newtd = document.createElement("td");
newtd.setAttribute("colspan", "2");
newtd.innerHTML = '<table><tr><td style="vertical-align:text-top">' + SubmitButtonHTML + '</td><td style="vertical-align:middle">&nbsp;desde la página&nbsp;</td><td style="vertical-align:middle"><input name="seite" type="1" size="2" maxlength="3" id="seitebis"></td></tr></table>
';
newtr.appendChild(newtd);
trs[rownr].parentNode.insertBefore(newtr, trs[rownr]);
document.getElementById("seitebis").value = GM_getValue("SeiteBis", 2);

var NrOfPages = table.innerHTML.split('href="/fight/fightlog/').length - 1;

// ***********************************************************************************************
// Click-Event Punktedifferenz-Button
// ***********************************************************************************************
table.parentNode.getElementsByTagName("input")[2].addEventListener("click", function(event)
{
// ***********************************************************************************************
// Leerzeile einfügen
// ***********************************************************************************************
newtr = document.createElement("tr");
newtd = document.createElement("td");
newtd.setAttribute("colspan", "2");
newtd.innerHTML = '&nbsp;';
newtr.appendChild(newtd);
trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

// ***********************************************************************************************
// Fortschrittsbalken einfügen
// ***********************************************************************************************
newtr = document.createElement("tr");
newtd = document.createElement("td");
newtd.setAttribute("colspan", "2");
newtd.innerHTML = 'El listado se está formando, espera unos instantes...';
newtr.appendChild(newtd);

var ProgressTable = CreateProgressTable(Number(document.getElementById("seitebis").value));
newtd.appendChild(ProgressTable);
trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

// // Aktuelle Tabelle löschen
// var fighttable = document.getElementsByTagName("table")[0];
//
// GM_log("fighttable.childNodes = " + fighttable.childNodes.length + ", trs = " + fighttable.getElementsByTagName("tr").length);
//
// for (var i = 8; i <= fighttable.getElementsByTagName("tr").length - 2; i++) {
// GM_log(fighttable.getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML);
// var knoten = fighttable.getElementsByTagName("tr")[i].firstChild;
// // fighttable.removeChild(knoten);
// }

// Folgeseite(n) abrufen
ProcessLogPage(table, ProgressTable, 2);
}, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion postet den übergebenen Text in die SB
// ***********************************************************************************************
// ***********************************************************************************************
function PostToSB(sbtext, successmessage) {
// ***********************************************************************************************
// Posten des Textes in die SB
// ***********************************************************************************************
GM_xmlhttpRequest({
method: 'POST',
url: SBADD_URL,
headers: {'Content-type': 'application/x-www-form-urlencoded'},
data: encodeURI('f_text=' + sbtext + '&Submit=Abschicken'),
onload: function(responseDetails)
{
alert(successmessage);
}
});
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt für jeden Kampfkommentar eine neue Zeile und fügt ihn ein
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightSearchTable(trs) {
var NrOfCols = trs.length - 2;

// Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
for (var x = 1; x <= NrOfCols; x++) {
// Referenz auf die Zellen der aktuellen Zeile speichern
var tds = trs[x].getElementsByTagName("td");

// Wenn es in der aktuellen Zeile einen Kommentar gibt
if (tds[2].innerHTML.indexOf(ICON_FIGHTCOMMENT) != -1) {
// Fightkommenar aus der id auslesen
var fightcomment = tds[2].getElementsByTagName("a")[2].id;
// Neue Zeile erzeugen
var newtr = document.createElement("tr");
// Neue Zeile nach der aktuellen einhängen
trs[x].parentNode.insertBefore(newtr, trs[x].nextSibling);

// Zahl der Spalten und Zeiger um 1 erhöhen
NrOfCols = NrOfCols + 1;
x = x + 1;

// Neue Zelle erzeugen
var newtd = newtr.appendChild(document.createElement("td"));
newtd.innerHTML = "&nbsp;";
newtd.setAttribute("colspan", "3");
// Neue Zelle erzeugen
newtd = newtr.appendChild(document.createElement("td"));
// Kampfkommentar eintragen
newtd.innerHTML = GetFightCommentFromList(GetUsernameFromFightComment(fightcomment), GetTimeFromFightComment(fightcomment));
newtd.style.color = "orange";
newtd.style.paddingTop = "2px";
newtd.style.paddingBottom = "2px";
newtd.setAttribute("colspan", "4");
}
}
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion liefert vom String str die rechtesten n Zeichen zurück
// ***********************************************************************************************
// ***********************************************************************************************
function Right$(str, n){
if (n <= 0)
return "";
else if (n > String(str).length)
return str;
else {
var iLen = String(str).length;
return String(str).substring(iLen, iLen - n);
}
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM *
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

var content = document.getElementsByTagName("body")[0].innerHTML;

// ***********************************************************************************************
// Auf eine neue Version des Skriptes prüfen
// ***********************************************************************************************
//CheckForUpdate();

// Wenn eine Kampfkraftsteigerung vorliegt
if (content.indexOf("Deine Kampfkraft ist") != -1 ) {
var divnumber = 1;
// sonst: Keine Kampfkraftsteigerung
} else {
var divnumber = 0;
}

// ***********************************************************************************************
// Wenn die aktive Kampfseite angezeigt wird
// ***********************************************************************************************
if (content.indexOf("Dein Ziel muss") != -1 ) {
var attacktable = document.getElementsByTagName("table")[0];
var attackdiv = attacktable.getElementsByTagName("div")[divnumber];
var attacklink = attackdiv.getElementsByTagName("a")[0];
var attackspan = attackdiv.getElementsByTagName("span")[0];

var NrOfTRs = attacktable.getElementsByTagName("tr").length;
var OldHTML = attacktable.getElementsByTagName("tr")[NrOfTRs - 1].innerHTML;
var MinPoints = OldHTML.split("Dein Ziel muss ")[1];
MinPoints = MinPoints.split(" bis ")[0];

// Link zu Pennerzone abgestimmt auf die Punkte zusammenbauen
var PennerzoneLink = '<a href="' + PENNERZONESEARCH_URL1 + MinPoints + PENNERZONESEARCH_URL2 + '" target="_blank" title="Gegnersuche bei pennerzone.de"><b><font color="#FFFFFF">' + MinPoints + '</font></b></a>';
// Link in bisheriges HTML einbetten
NewHTML = OldHTML.split(MinPoints)[0] + PennerzoneLink + OldHTML.split(MinPoints)[1];
// HTML einfügen
attacktable.getElementsByTagName("tr")[NrOfTRs - 1].innerHTML = NewHTML;

// Wenn aktuell ein Angriff läuft
if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Angriff läuft bereits auf") != -1) {
// Name und UserID des Penners auslesen
var username = attacklink.innerHTML;
var userid = attackspan.innerHTML.split('/id:')[1].split('/"')[0];

// Info-Icons einfügen
attackspan.innerHTML = attackspan.innerHTML + '&nbsp' + GetIconInsertHTML(userid, username, "");

// Grafik für Posten in SB einfügen
attackspan.innerHTML = attackspan.innerHTML + '&nbsp;<a href="#form1"><img border="0" src="' + ICON_SENDTOSB + '" title="Daten des Kampfes gegen ' + username + ' in die Shoutbox posten." height="14" width="14"></a>';
// Handler für das Posten in SB mit Grafik assoziieren
PostToSBHandler(attackspan.getElementsByTagName("img")[2], true);
}
}

// ***********************************************************************************************
// Wenn die aktuelle Seite die Fightlog-Seite oder die Kampf-Sucheseite ist
// ***********************************************************************************************
if (location.toString().indexOf("/fightlog/") != -1) {
// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
var firsttable = document.getElementsByTagName("table")[1];
// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
ReformatFightlogTable(firsttable);

// "Info"-Icon und -Link in die Tabelle schreiben
InsertInfoInFirstTable(firsttable);

// ***********************************************************************************************
// Wenn die aktuelle Seite die Kampf-Suchseite ist
// ***********************************************************************************************
if (location.toString().indexOf("?q=") != -1) {
// Referenz auf die Zeilen der Tabelle speichern
var trs = firsttable.getElementsByTagName("tr");

// Kampfkommentare eintragen
ReformatFightSearchTable(trs);
// ***********************************************************************************************
// Wenn die aktuelle Seite die Fightlog-Seite ist
// ***********************************************************************************************
} else {
// Wenn die aktuelle Seite die erste Fightlog-Seite ist
if (Right$(location.toString(), 10) == '/fightlog/' || Right$(location.toString(), 12) == '/fightlog/1/') {
// Submit-Button für Daten einfügen
InsertSubmitButton(content, document.getElementsByTagName("table")[0]);
}
}
// ***********************************************************************************************
// sonst: die aktuelle Seite ist NICHT die Fightlog-Seite
// ***********************************************************************************************
} else {
// Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
var firsttable = document.getElementsByTagName("table")[1];
// Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
ReformatFirstTable(firsttable);
// "Info"-Icon und -Link in die Tabelle schreiben
InsertInfoInFirstTable(firsttable);

// Referenz auf die Tabelle mit den eintreffenden Kämpfen speichern
var secondtable = document.getElementsByTagName("table")[2];
// Tabelle mit den eintreffenden Kämpfen neu formatieren und eine neue Spalte einfügen
ReformatSecondTable(secondtable);

// Array für Kampf-Infos initialisieren
var IncomingFights = new Array();

// Auslesen der Daten der einkommenden Kämpfe
ReadFightData(secondtable, IncomingFights);

// Eintreffende Kämpfe chronologisch sortieren (aufsteigend)
IncomingFights.sort(sortByTime);

// Zurückschreiben der sortierten eintreffenden Kämpfe in die Tabelle
WriteFightData(secondtable, IncomingFights);

// Schreiben der Anzahl eintreffender Kämpfe in die Zeilenüberschrift
WriteNrOfIncomingFights(content, document.getElementsByTagName("table")[0]);

}